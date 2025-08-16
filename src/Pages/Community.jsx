import React from "react";
import { Link } from "react-router";

const events = [
  { title: "Weekly Yoga on the Lawn", date: "Every Sat, 8:00 AM", where: "Central Courtyard", type: "Event" },
  { title: "Maintenance Window", date: "Aug 24, 10:00–12:00", where: "Building A (Water)", type: "Notice" },
  { title: "Book Club – August", date: "Aug 28, 7:30 PM", where: "Community Lounge", type: "Event" },
];

export default function Community() {
  return (
    <div className="w-full bg-base-200 min-h-screen">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">BuildNest Community</h1>
          <p className="text-lg text-base-content leading-relaxed mb-6">
            Explore events and notices and stay connected with neighbors.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            <Link to="/dashboard" className="btn btn-primary">Open Dashboard</Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="https://i.ibb.co.com/ZRMPXyvr/Community-Gathering.jpg?auto=format&fit=crop&w=900&q=80"
            alt="Community gathering"
            className="rounded-2xl shadow-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Highlights */}
      <div className="max-w-6xl mx-auto px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Events","Notices","Neighbors"].map((h,i)=>(
          <div key={i} className="card bg-base-100 highlight shadow">
            <div className="card-body">
              <h3 className="card-title text-secondary">{h}</h3>
              <p>{h === "Events"
                ? "Discover what’s happening this week and RSVP."
                : h === "Notices"
                ? "Maintenance updates, policy changes, important reminders."
                : "Help keep shared spaces friendly and welcoming."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Events & Notices */}
      <div className="max-w-6xl mx-auto px-6 py-8 mb-10">
        <div className="flex items-center justify-between mb-4 mission">
          <h2 className="text-2xl font-semibold text-secondary">Events & Notices</h2>
          {/* <div className="flex gap-2">
            <Link to="/community/post-notice" className="btn btn-sm btn-outline">Post Notice</Link>
            <Link to="/community/new-event" className="btn btn-sm btn-primary">Create Event</Link>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <div key={i} className="card bg-base-100 shadow highlight">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <span className="badge badge-outline">{e.type}</span>
                  <span className="text-xs opacity-70">{e.date}</span>
                </div>
                <h3 className="card-title mt-2">{e.title}</h3>
                <p className="text-sm">{e.where}</p>
                <div className="card-actions justify-end mt-3">
                  {/* <Link to={`/community`} className="btn btn-sm btn-primary">RSVP / Details</Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Community Guidelines</h2>
        <div className="space-y-3">
          {[
            ["Be Respectful","Keep discussions friendly; no harassment, spam, or hate speech."],
            ["Keep It Relevant","Announcements for official updates; Events for activities."],
            ["Shared Spaces","Respect quiet hours and keep common areas clean."]
          ].map(([t,c],idx)=>(
            <div key={idx} className="collapse collapse-arrow bg-base-100 shadow accordion">
              <input type="checkbox" defaultChecked={idx===0} />
              <div className="collapse-title text-lg font-medium">{t}</div>
              <div className="collapse-content"><p>{c}</p></div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/about" className="btn btn-primary">About BuildNest</Link>
          <Link to="/contact" className="btn btn-primary">Contact Team</Link>
        </div>
      </div>
    </div>
  );
}
