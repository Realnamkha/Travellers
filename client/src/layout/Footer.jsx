import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Socials */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Travellers Guest House</h2>
          <p className="text-sm text-black mb-4">
            Your comfort is our priority.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-primary" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-primary" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-primary" />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-black">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Rooms & Suites</a>
            </li>
            <li>
              <a href="#">Facilities</a>
            </li>
            <li>
              <a href="#">Gallery</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-medium mb-3">Contact Info</h3>
          <ul className="space-y-2 text-sm text-black">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              namkhagyatso999@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +977 9865389928
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Langtang,Nepal
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-black">
        © {new Date().getFullYear()} Travellers Guest House. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
