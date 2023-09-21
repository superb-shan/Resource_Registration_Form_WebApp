import moment from 'moment';
import React from 'react';

const Footer = () => {
  const currentYear = moment().format('YYYY');
  return (
    <footer className="bg-[#374151] h-[4vh] flex justify-between items-center px-[50px] text-gray-400">
      <span>Develpod By Shankar, Sree Ragu Nandha, Jeeththenthar<span className='px-[20px]'>|</span><span className=''>Mentored</span>  by Sarfaraz Ahmed</span>
      <span>| Dept of CSE |</span>
      <a href="http://www.sece.ac.in" style={{ textDecoration: "none" }} target='_blank' rel="noreferrer">
        © {currentYear} Sri Eshwar College of Engineering. All rights reserved.
      </a>

    </footer>
  );
};

export default Footer;
