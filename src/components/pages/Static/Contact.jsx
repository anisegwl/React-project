import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("❌ Please fill all fields");
      return;
    }

    setLoading(true);

    // 🔹 FRONTEND-ONLY (fake submit)
    setTimeout(() => {
      toast.success("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have a question, feedback, or business inquiry?  
            We’d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Get in Touch
            </h2>

            <div className="space-y-5 text-gray-700">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-600 text-xl" />
                <span>support@uoitappareals.com</span>
              </div>

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-blue-600 text-xl" />
                <span>+977-98XXXXXXXX</span>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                <span>Kathmandu, Nepal</span>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              Our support team usually responds within 24 hours.
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-lg transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-blue-700"
                }`}
              >
                <FaPaperPlane />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
