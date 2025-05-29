import React from "react";
import Navbar from "../layout/Navbar";
import ContactForm from "../sections/Contact/Form";
import Map from "../sections/Contact/Map";
import Footer from "../layout/Footer";
import BookingStep1 from "../sections/Booking/Step1";

const Contact = () => {
  return (
    <>
      <div className="">
        {/* <main className="pt-[72px] mx-24"> */}
        <BookingStep1 />
        {/* </main> */}
      </div>
    </>
  );
};

export default Contact;
