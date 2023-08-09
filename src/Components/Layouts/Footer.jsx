import moment from 'moment';
import React from 'react';

const Footer = () => {
    const currentYear = moment().format('YYYY');
  return (
    <footer className="bg-gray-500 h-[4vh] flex justify-center items-center text-gray-400">
      © {currentYear} Sri Eshwar College of Engineering. All rights reserved.
    </footer>
  );
};

export default Footer;
