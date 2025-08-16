import React from "react";

const Testimonials = () => {
  return (
    <section title="Resident Stories" className="py-16 my-10">
        <h2 className="text-3xl font-bold text-center mb-6">Residents Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Jasmine R.",
            text: "Booking and move‑in were seamless. The community is super friendly!",
          },
          {
            name: "Arjun D.",
            text: "Paying rent online is easy and transparent. Love the gym!",
          },
          {
            name: "Mona K.",
            text: "Announcements keep me updated about maintenance and events.",
          },
        ].map((t, i) => (
          <div key={i} className="card bg-base-200 shadow highlight">
            <div className="card-body">
              <p className="italic">“{t.text}”</p>
              <div className="mt-3 font-semibold">{t.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
