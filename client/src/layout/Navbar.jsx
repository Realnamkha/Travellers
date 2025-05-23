import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-8 py-4 shadow-sm bg-white border-b fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-semibold tracking-tight text-gray-800">
          Travellers<span className="text-primary"> Guest House</span>
        </div>
        <div className="flex flex-1 justify-end gap-6 ml-12">
          {[
            { label: "Home", path: "/" },
            { label: "Facilities", path: "/facilities" },
            { label: "Gallery", path: "/gallery" },
            { label: "Contact Us", path: "/contact" },
          ].map(({ label, path }) => (
            <Button
              key={label}
              asChild
              variant="ghost"
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              <Link to={path}>{label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
