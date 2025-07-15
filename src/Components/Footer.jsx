import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router";
import Logo from "/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="footer flex justify-between p-10 container mx-auto">
        {/* Company Info */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
          >
            <img className="w-[200px]" src={Logo} alt="BuildNest" />
          </Link>
          <p>
            Your smart building management platform.
            <br />
            Streamline living, automate maintenance, and stay informed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <span className="footer-title">Quick Links</span>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/apartments" className="link link-hover">
            Apartments
          </Link>
          <Link to="/announcements" className="link link-hover">
            Announcements
          </Link>
          <Link to="/dashboard" className="link link-hover">
            Dashboard
          </Link>
        </div>

        {/* Social Links */}
        <div>
          <span className="footer-title">Follow Us</span>
          <div className="flex gap-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>© {new Date().getFullYear()} BuildNest — All rights reserved</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
