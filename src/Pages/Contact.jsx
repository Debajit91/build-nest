// src/pages/Contact.jsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });

      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full bg-base-200 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">Contact Us</h1>
        <p className="text-lg mb-10 text-base-content leading-relaxed text-center">
          Have questions, suggestions, or need assistance? Fill out the form and
          we’ll get back to you soon.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Contact Info */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-primary">BuildNest Apartment</h2>
            <p className="text-base-content">37 Raja Pukur Ln, <br /> Chittagong 4000, Bangladesh</p>
            <p className="text-base-content">Email: support@buildnest.com</p>
            <p className="text-base-content">Phone: +1 (555) 123-4567</p>
          </div>

          {/* Contact Form */}
          <div className="bg-base-100  shadow-lg rounded-xl p-6 contact">
            <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  name="from_name" // must match EmailJS template
                  className="input input-bordered w-full"
                  placeholder="Enter your name"
                  required
                  disabled={sending}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  name="reply_to" // must match EmailJS template
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  required
                  disabled={sending}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  name="message" // must match EmailJS template
                  className="textarea textarea-bordered w-full"
                  rows="4"
                  placeholder="Type your message..."
                  required
                  disabled={sending}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`btn btn-outline w-full ${sending ? "btn-disabled" : ""}`}
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
