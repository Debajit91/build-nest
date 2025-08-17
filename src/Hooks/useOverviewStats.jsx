import { useQuery } from "@tanstack/react-query";
import axios from "../api/axiosInstance"; // <- your axiosInstance

const safeLength = (arr) => (Array.isArray(arr) ? arr.length : 0);
const isPending = (b) => b?.status?.toLowerCase?.() === "pending" || b?.isPending;

function aggregateFromCollections({ apts, users, bookings, announcements, payments }) {
  const totalApartments = safeLength(apts);
  const activeResidents = safeLength(users);
  const pendingBookings = Array.isArray(bookings) ? bookings.filter(isPending).length : 0;
  const totalAnnouncements = safeLength(announcements);

  // Occupancy (if apartment docs have a flag like occupied/available)
  const occupied = Array.isArray(apts)
    ? apts.filter((a) => a?.occupied || a?.status === "occupied").length
    : 0;
  const vacant = Math.max(totalApartments - occupied, 0);

  // Revenue trend (group payments by month if not pre-grouped)
  // Expect either [{month: 'Jan', total: 5000}, ...] or raw payments with date+amount
  let revenueByMonth = [];
  if (Array.isArray(payments) && payments.length && payments[0]?.month && payments[0]?.total != null) {
    revenueByMonth = payments.map((p) => ({ month: p.month, rent: Number(p.total) || 0 }));
  } else if (Array.isArray(payments)) {
    const map = new Map();
    for (const p of payments) {
      const d = new Date(p?.paidAt || p?.createdAt || Date.now());
      const key = d.toLocaleString("en-US", { month: "short" }); // Jan, Feb...
      const prev = map.get(key) || 0;
      map.set(key, prev + (Number(p?.amount) || 0));
    }
    revenueByMonth = Array.from(map, ([month, rent]) => ({ month, rent }));
  }

  return {
    counters: { totalApartments, activeResidents, pendingBookings, totalAnnouncements },
    occupancy: { occupied, vacant },
    revenueByMonth,
  };
}

export default function useOverviewStats() {
  return useQuery({
    queryKey: ["overview-stats"],
    queryFn: async () => {
      // 1) Try the aggregated endpoint
      try {
        const { data } = await axios.get("/stats/overview");
        // Expected shape example:
        // {
        //   counters: { totalApartments, activeResidents, pendingBookings, totalAnnouncements },
        //   occupancy: { occupied, vacant },
        //   revenueByMonth: [{ month:'Jan', rent: 1200 }, ...]
        // }
        if (data?.counters && data?.occupancy && data?.revenueByMonth) return data;
        // Some teams return flat props:
        if (data?.totalApartments != null) {
          return {
            counters: {
              totalApartments: data.totalApartments,
              activeResidents: data.activeResidents || 0,
              pendingBookings: data.pendingBookings || 0,
              totalAnnouncements: data.totalAnnouncements || 0,
            },
            occupancy: {
              occupied: data.occupied || 0,
              vacant: data.vacant || Math.max((data.totalApartments || 0) - (data.occupied || 0), 0),
            },
            revenueByMonth: data.revenueByMonth || [],
          };
        }
        // If it returns collections instead of aggregates:
        if (data?.apartments || data?.users || data?.bookings || data?.announcements || data?.payments) {
          return aggregateFromCollections({
            apts: data.apartments,
            users: data.users,
            bookings: data.bookings,
            announcements: data.announcements,
            payments: data.payments,
          });
        }
      } catch (e) {
        // Fall through to client aggregation
      }

      // 2) Fallback: parallel requests and aggregate client-side
      const [aptsRes, usersRes, bookingsRes, annsRes, paysRes] = await Promise.allSettled([
        axios.get("/apartments"),
        axios.get("/users"),
        axios.get("/bookings"),
        axios.get("/announcements"),
        axios.get("/payments?groupBy=month"), // if not supported, server can just return all payments
      ]);

      const apts = aptsRes.value?.data?.apartments ?? aptsRes.value?.data ?? [];
      const users = usersRes.value?.data?.users ?? usersRes.value?.data ?? [];
      const bookings = bookingsRes.value?.data?.bookings ?? bookingsRes.value?.data ?? [];
      const announcements = annsRes.value?.data?.announcements ?? annsRes.value?.data ?? [];
      // Try grouped first, else raw
      const paymentsData = paysRes.value?.data;
      const payments =
        (Array.isArray(paymentsData) ? paymentsData :
        paymentsData?.payments ?? paymentsData?.byMonth ?? []);

      return aggregateFromCollections({ apts, users, bookings, announcements, payments });
    },
  });
}
