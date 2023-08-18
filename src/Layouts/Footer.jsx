import moment from 'moment';
import React from 'react';

const Footer = () => {
    const currentYear = moment().format('YYYY');
  return (
    <footer className="bg-[#374151] h-[4vh] flex justify-center items-center text-gray-400">
      <a href="http://www.sece.ac.in" style={{textDecoration: "none"}} target='_blank' rel="noreferrer">
      © {currentYear} Sri Eshwar College of Engineering. All rights reserved.
      </a> 
      
    </footer>
  );
};

export default Footer;
