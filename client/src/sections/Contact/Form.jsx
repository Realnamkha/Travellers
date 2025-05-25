import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import axios from "axios";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/contact",
        {
          name,
          email,
          message,
        }
      );
      if (res.status === 200) {
        setStatus({ type: "success", message: res.data.message });
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Server error, please try again later.";
      setStatus({ type: "error", message: msg });
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center my-10">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg shadow text-gray-800 space-y-6">
          <div className="flex justify-center items-center gap-3">
            <Phone className="text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Call Us:</h3>
              <p>+977 9865389928</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Mail className="text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Email Us:</h3>
              <p>namkhagyatso999@gmail.com</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3">
            <MapPin className="text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Location:</h3>
              <p>Langtang,Nepal</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Clock className="text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Opening Time:</h3>
              <p>We are open 24/7</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              rows="8"
              className="w-full border p-2 rounded"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
          {status && (
            <p
              className={`mt-4 ${
                status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
