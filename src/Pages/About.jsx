import React from "react";

const faqs = [
  {
    q: "How do I book an apartment?",
    a: "Browse Apartments, open a listing, then click Book/Request to submit your details. You’ll get a confirmation email and see the booking in your dashboard once approved.",
  },
  {
    q: "Where do I pay rent?",
    a: "Go to Dashboard → Payments. You can view invoices, pay securely online, and download receipts.",
  },
  {
    q: "Who can see Announcements?",
    a: "Announcements are available to logged-in residents. Find them under Dashboard → Announcements.",
  },
  {
    q: "How do I update my profile information?",
    a: "Open the avatar menu → Dashboard → My Profile. You can edit your name, photo, and contact details there.",
  },
  {
    q: "Need help or want to report an issue?",
    a: "Visit the Contact page to message management/support. For emergencies, use the phone/email listed there.",
  },
];

const About = () => {
  return (
    <div className="w-full bg-base-200 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            About BuildNest
          </h1>
          <p className="text-lg text-base-content leading-relaxed mb-6">
            Welcome to <span className="font-semibold">BuildNest</span> — your
            trusted community for modern apartment living. Explore apartments,
            manage bookings, stay updated with announcements, and connect with
            your community — all in one place.
          </p>
          <a href="/contact" className="btn btn-primary">
            Contact Us
          </a>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Modern apartment exterior"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Mission & Values */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Our Mission</h2>
        <p className="mb-8">
          BuildNest streamlines life for residents and management. From booking
          to payments and timely updates, we bring everything together with a
          simple, secure experience.
        </p>

        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Why Choose BuildNest?
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-8">
          <li>🏠 Simple apartment search and booking system</li>
          <li>📢 Timely resident announcements and updates</li>
          <li>💳 Secure, transparent online payments</li>
          <li>🤝 Community features to connect residents</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold text-secondary mb-6">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="collapse collapse-arrow bg-base-100 shadow">
              {/* Use a checkbox to make it an accordion-like toggle */}
              <input type="checkbox" defaultChecked={idx === 0} aria-label={`Toggle ${item.q}`} />
              <div className="collapse-title text-lg font-medium">{item.q}</div>
              <div className="collapse-content">
                <p className="leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Extra help */}
        <div className="mt-8 text-sm text-base-content/80">
          Didn’t find what you’re looking for? Visit our{" "}
          <a href="/contact" className="link link-secondary">
            Contact
          </a>{" "}
          page and we’ll help you out.
        </div>
      </div>
    </div>
  );
};

export default About;
