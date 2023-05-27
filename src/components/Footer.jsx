import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.gif';

function Footer() {
  return (
    <div className="border-t-2 bg-gradient-to-t from-slate-900 to-blue-main">
      <div className="flex items-center justify-center px-6 py-4 text-white text-xl md:text-3xl font-bold">
        <p>H</p>
        <Link to="/">
          <img
            src={Logo}
            alt="Holidaze logo image"
            className="max-h-9 md:max-h-12 py-1 mt-0.3 md:mt-1"
          />
        </Link>
        <p>ME is here</p>
      </div>
      <p className="text-center text-white pb-2">
        ©2023 Viorel Lazari. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
