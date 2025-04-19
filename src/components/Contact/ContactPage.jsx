"use client";

import { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Message sent:", data);
        // Optional: Reset form or show success message
      } else {
        console.error("Contact error:", data);
      }
    } catch (error) {
      console.error("Contact error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>

        {/* Office Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Our Office</h3>
            <p className="text-gray-600 mb-1">1234 Street Name, City, Country</p>
            <p className="text-gray-600 mb-1">Phone: +1 234 567 890</p>
            <p className="text-gray-600">Email: contact@company.com</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Business Hours</h3>
            <p className="text-gray-600 mb-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600 mb-1">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email - side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full border border-gray-300 text-gray-900 placeholder-transparent px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F4F37] focus:border-transparent"
                placeholder="Your Name"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-gray-500 text-sm transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 peer-focus:top-1 
                peer-focus:text-sm peer-focus:text-[#6F4F37]"
              >
                Your Name
              </label>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full border border-gray-300 text-gray-900 placeholder-transparent px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F4F37] focus:border-transparent"
                placeholder="Your Email"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-gray-500 text-sm transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 peer-focus:top-1 
                peer-focus:text-sm peer-focus:text-[#6F4F37]"
              >
                Your Email
              </label>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="peer w-full border border-gray-300 text-gray-900 placeholder-transparent px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F4F37] focus:border-transparent"
              placeholder="Your Message"
            />
            <label
              htmlFor="message"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 peer-focus:top-1 
              peer-focus:text-sm peer-focus:text-[#6F4F37]"
            >
              Your Message
            </label>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6F4F37] text-white py-3 rounded-md hover:bg-[#8F5F3C] transition duration-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
