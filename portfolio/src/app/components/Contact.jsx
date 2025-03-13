"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        console.error("Failed to send message. Status:", response.status);
        console.error("Response Body:", result);
        setError(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="contact"
      className="max-w-10xl w-full px-8 md:px-16 lg:px-24 mx-auto bg-gray-900 text-white pt-12 pb-16 flex flex-col md:flex-row justify-between items-center gap-12 mt-16 rounded-lg shadow-lg"
    >
      <div className="text-center md:text-left flex-1">
        <h2 className="text-5xl lg:text-6xl font-extrabold tracking-wider mb-4 drop-shadow-md">
          Get in Touch
        </h2>
        <p className="text-xl lg:text-2xl font-medium tracking-wide opacity-90">
          I'd love to hear from you!
        </p>
      </div>

      <div className="flex flex-col items-center md:items-end flex-1">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 rounded-lg bg-[#33353F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded-lg bg-[#33353F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="p-2 rounded-lg bg-[#33353F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="5"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-80 transition-opacity"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {isSubmitted && (
            <p className="text-green-500 mt-2 text-center">Message sent successfully!</p>
          )}
          {error && (
            <p className="text-red-500 mt-2 text-center">{error}</p>
          )}
        </motion.form>

        {/* Contact Links */}
        <ul className="flex flex-col gap-6 list-none mt-12">
          <li className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
            <img
              src="/email-icon.svg"
              alt="Email icon"
              className="w-8 h-8 drop-shadow-md"
            />
            <a
              href="mailto:milanapatel23@gmail.com"
              className="text-white text-lg font-light tracking-wide hover:underline opacity-90"
            >
              milanapatel23@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
            <img
              src="/linkedin-icon.svg"
              alt="LinkedIn icon"
              className="w-8 h-8 drop-shadow-md"
            />
            <a
              href="https://www.linkedin.com/in/milan-patel-444504229/"
              className="text-white text-lg font-light tracking-wide hover:underline opacity-90"
            >
              LinkedIn Profile
            </a>
          </li>
          <li className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
            <img
              src="/github-icon.svg"
              alt="GitHub icon"
              className="w-8 h-8 drop-shadow-md"
            />
            <a
              href="https://github.com/settings/profile"
              className="text-white text-lg font-light tracking-wide hover:underline opacity-90"
            >
              GitHub Profile
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Contact;