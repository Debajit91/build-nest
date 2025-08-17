// src/pages/dashboard/Overview.jsx
import React from "react";
import useOverviewStats from "../Hooks/useOverviewStats";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = ["#36d399", "#f87272"]; // DaisyUI-ish success/danger colors

export default function Overview() {
  const { data, isLoading, isError } = useOverviewStats();

  if (isLoading) {
    return (
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card bg-base-100 shadow animate-pulse">
              <div className="card-body">
                <div className="h-5 w-2/3 bg-base-200 rounded" />
                <div className="h-8 w-1/3 bg-base-200 rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow h-[320px] animate-pulse" />
          <div className="card bg-base-100 shadow h-[320px] animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6">
        <div className="alert alert-error">
          <span>Failed to load overview stats. Please try again.</span>
        </div>
      </div>
    );
  }

  const { counters, occupancy, revenueByMonth } = data;

  const stats = [
    { title: "Total Apartments Booked", value: counters?.totalApartments ?? "—" },
    { title: "Active Residents", value: counters?.activeResidents ?? "—" },
    { title: "Pending Bookings", value: counters?.pendingBookings ?? "—" },
    { title: "Announcements", value: counters?.totalAnnouncements ?? "—" },
  ];

  const occupancyData = [
    { name: "Occupied", value: Number(occupancy?.occupied || 0) },
    { name: "Vacant", value: Number(occupancy?.vacant || 0) },
  ];

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-4">Dashboard Overview</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="card bg-base-100 border-2 border-primary shadow">
            <div className="card-body">
              <h2 className="card-title">{s.title}</h2>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line chart: Monthly Rent Collection */}
        <div className="card bg-base-100 border-2 shadow">
          <div className="card-body">
            <h2 className="card-title">Monthly Rent Collection</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueByMonth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="rent"
                  stroke="#36d399"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart: Occupancy */}
        <div className="card bg-base-100 border-2 shadow">
          <div className="card-body">
            <h2 className="card-title">Occupancy Status</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {occupancyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
