import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactForm = () => {
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
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Your Message"
              rows="8"
              className="w-full border p-2 rounded"
            />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
