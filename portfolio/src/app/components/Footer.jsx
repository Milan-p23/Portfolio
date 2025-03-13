import React from "react";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container flex justify-between">
        <Image
            src="/images/MilanPatel.png"
            alt="Milan Patel Logo"
            width={75}
            height={50}
            priority
            className="mr-6"
          />

        <p className="text-slate-600 pt-6 pb-6">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;