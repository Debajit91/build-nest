import React from "react";
import { Link } from "react-router";

const HowItWorks = () => {
  return (
    <section title="How It Works" className="py-16 my-10 bg-base-200 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 ">How It Works</h2>
      <div className="flex flex-col justify-center items-center ul">
        <ul className="steps steps-vertical lg:steps-horizontal">
          <li className="step step-info">Browse apartments</li>
          <li className="step step-info">Create account</li>
          <li className="step step-info">Book / Apply</li>
          <li className="step step-info">Move in & manage</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/apartments" className="btn btn-primary">
            Start browsing
          </Link>
          <Link to="/contact" className="btn btn-primary">
            Contact us
          </Link>
        </div>
      </div>
      {/* Optional: Email signup (EmailJS) */}
      {/* <form onSubmit={...} className="mt-6">
      <input className="input input-bordered w-full" placeholder="Your email" />
      <button className="btn btn-primary w-full mt-2">Subscribe</button>
    </form> */}
    </section>
  );
};

export default HowItWorks;
