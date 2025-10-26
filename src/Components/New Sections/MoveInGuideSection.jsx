import React from 'react';
import { Link } from 'react-router';

const MoveInGuideSection = () => {
    return (
        <section className="w-full bg-base-100 py-12">
      <div>
        <h2 className="text-3xl font-bold text-secondary mb-6 text-center">Move-In Guide & Policies</h2>

        {/* 1) Quick Steps */}
        <div className="mb-8 text-center">
          <ul className="steps steps-vertical lg:steps-horizontal ">
            <li className="step step-info">Browse listings</li>
            <li className="step step-info">Submit booking / application</li>
            <li className="step step-info">Verification & payment</li>
            <li className="step step-info">Keys & move-in</li>
          </ul>
        </div>

        {/* 2) Checklist + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card bg-base-200 highlight shadow">
            <div className="card-body">
              <h3 className="card-title text-secondary">Move-In Checklist</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li className='text-black/70'>Valid ID & basic documents</li>
                <li className='text-black/70'>Deposit & first month’s rent</li>
                <li className='text-black/70'>Utility setup (if applicable)</li>
                <li className='text-black/70'>Parking/Access passes</li>
              </ul>
              <div className="card-actions mt-4">
                <Link to="/apartments" className="btn btn-outline btn-sm">Find an apartment</Link>
                <Link to="/contact" className="btn btn-outline btn-sm">Ask a question</Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 highlight shadow">
            <div className="card-body">
              <h3 className="card-title text-secondary">What to Expect</h3>
              <p className="text-sm">
                Our team will confirm your booking, share payment instructions, and schedule key pickup. 
                You’ll also receive building access info and amenity guidelines.
              </p>
              <div className="card-actions mt-4">
                <Link to="/about" className="btn btn-outline btn-sm">About BuildNest</Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 highlight shadow">
            <div className="card-body">
              <h3 className="card-title text-secondary">Need Help Fast?</h3>
              <p className="text-sm">
                For urgent assistance or special accommodations, reach out and we’ll assist you.
              </p>
              <Link to="/contact" className="btn btn-outline btn-sm mt-2">Contact support</Link>
            </div>
          </div>
        </div>

        {/* 3) Policies (Accordion) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="collapse collapse-arrow bg-base-200 shadow accordion">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-lg font-medium text-secondary">Payments & Refunds</div>
              <div className="collapse-content text-sm">
                <p>Rent is due monthly. Deposits are refundable per agreement terms. 
                Late fees may apply after the grace period.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 shadow accordion">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-secondary">Pets & Parking</div>
              <div className="collapse-content text-sm">
                <p>Pet-friendly units may require a pet deposit. Parking allocations vary by building—ask the office.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="collapse collapse-arrow bg-base-200 shadow accordion">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-secondary">Maintenance & Access</div>
              <div className="collapse-content text-sm">
                <p>Report issues via the Contact page. For emergency access or lockouts, call the number listed in your welcome email.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 shadow accordion">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-secondary">Community Etiquette</div>
              <div className="collapse-content text-sm">
                <p>Please observe quiet hours and keep shared spaces clean. Follow posted rules for amenities.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/apartments" className="btn btn-primary">Start Browsing</Link>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    </section>
    );
};

export default MoveInGuideSection;