import React from "react";

const Map = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow my-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.045353052802!2d85.31021227513445!3d27.712870976194728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190fe18dd1a1%3A0x89956c8609b8e2ba!2sChaksibari%20Marg%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1716272240116!5m2!1sen!2snp"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
