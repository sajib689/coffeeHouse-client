"use client";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#6F4F37] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Grid Layout for Desktop & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-200">
              CoffeeHouse is a place where you can enjoy the best coffee, pastries, and a cozy atmosphere. Join us for a relaxing experience.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li>
                <Link href="/" className="hover:text-[#f4e1d2]">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#f4e1d2]">Menu</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#f4e1d2]">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#f4e1d2]">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" className="text-xl hover:text-[#f4e1d2]">
                <FaFacebook />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-xl hover:text-[#f4e1d2]">
                <FaTwitter />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-xl hover:text-[#f4e1d2]">
                <FaInstagram />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="text-xl hover:text-[#f4e1d2]">
                <FaLinkedin />
              </Link>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-200">123 Coffee Street, CoffeeTown, CT 12345</p>
            <p className="text-gray-200">Phone: (123) 456-7890</p>
            <p className="text-gray-200">Email: info@coffeehouse.com</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-200">© 2025 CoffeeHouse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
