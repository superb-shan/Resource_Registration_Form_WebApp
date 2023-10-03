import moment from 'moment';
import React from 'react';
import { NoPrint } from 'react-easy-print';

const Footer = () => {
  const currentYear = moment().format('YYYY');
  return (
    <NoPrint>
      <footer className="bg-[#374151] min-h-[4vh] flex justify-between items-center min-gap-[20px] px-[50px] text-gray-400 flex-wrap text-[10px] md:text-[14px] whitespace-nowrap">
        <span>Developed By Shankar, Sree Ragu Nandha, Jeeththenthar</span>
        <span className=''>Mentored by Mr. Sarfaraz Ahmed AP/CSE</span>
        <span>Dept of CSE </span>
        <a href="http://www.sece.ac.in" style={{ textDecoration: "none" }} target='_blank' rel="noreferrer">
          © {currentYear} Sri Eshwar College of Engineering. All rights reserved.
        </a>
      </footer>
    </NoPrint>
  );
};

export default Footer;
