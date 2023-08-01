import React from "react";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { FaComments,FaForward } from "react-icons/fa";
import UserNavBar from "./UserNavbar";


function UserSideBar() {
  const [showNavBar, setShowNavBar] = useState(false);

  const handleNavbar = () => {
    setShowNavBar(true);
  };


  var styles = {
    bmBurgerButton: {
       position: 'relative',
      width: '25px',
      height: '20px',
      right: '-20px',
      top: '47px'
    },
    bmBurgerBars: {
      background:"black"
    },
    bmBurgerBarsHover: {
      background: ''
    },
    bmCrossButton: {
      height: '30px',
      width: '30px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      width: '20%'
    },
    bmMenu: {
      background: 'white',
      // padding: '2.0em 0.5em ',
      fontSize: '1.05em',
      color:'	#000080'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: 'text-gray-950 ',
      // padding: '0.7em'
    },
    bmItem: {
      display: 'flex',
      alignItems: 'center',
       padding: '0.7em',
      // justifyContent:'center'
      
      
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

  return (
    <div>
    
    <Menu styles={styles} left>
      <div className="bg-current ">
      <h1 className="text-slate-50">Hey User !</h1></div>  
      <br />
      <div className="  bg-slate-100 bg-auto  border-b-[1.4px]  cursor-pointer hover:text-purple-600 ">
      <a id="home" className="" onClick={handleNavbar}>  <FaComments className="inline"/> <> &nbsp; Add Bookings</> </a> 
       </div>  
      <div className="h-50 bg-slate-100 bg-auto border-b-[1.4px] cursor-pointer hover:text-purple-600 ">
      <a id="home" className="" href="/Signup">
      <FaForward className="inline"/><> &nbsp; My Bookings</>
      </a> 
      </div> 

    </Menu>
    {showNavBar && <UserNavBar />}
   
    </div>
  );
}


export default UserSideBar;



