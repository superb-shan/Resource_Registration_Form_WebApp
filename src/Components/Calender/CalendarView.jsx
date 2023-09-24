import React, { useContext, useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { LoginContext } from '../../Context/Login.Context';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Selector } from '../Fields/InteractionFields';
import CalendarContainer from '../Containers/CalendarContainer';
import UserDataModal from '../Modals/UserDataModal';
import AdminDataModal from '../Modals/AdminDataModal';
import { Button } from '@mui/material';

import printJS from "print-js";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import './bigCustomStyles.css'
const localizer = momentLocalizer(moment);

const CalendarView = (props) => {
  const { user, userName } = useContext(LoginContext);
  const [events, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formType, setFormType] = useState('Seminar');
  const [selectedRow, setSelectedRow] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);


  const modalHandler = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  const fetchData = async (user, userName, formType) => {
    setIsLoading(true)
    console.log("formtype", formType)

    const param = {};
    if (user === "user") param["name"] = userName;
    param["isapproved"] = true
    try {

      let Data = [];
      let seminarResponse = await axios.get(`/${formType === 'Seminar' ? "seminar" : "guesthouse"}/get`, { params: param });
      seminarResponse = seminarResponse.data.data;
      console.log(seminarResponse);
      console.log("events", events);

      if (seminarResponse.length > 0) {
        Data = seminarResponse.map((event) => {
          // Generate a random background color
          let color = generateRandomColors()
          // const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

          // // Calculate text color for better contrast
          // const textColor = getContrastColor(randomColor);

          return {
            title: formType === 'Seminar' ? `${event.hallRequired} (${moment(event.startDateTime).format('hh:mm A')} - ${moment(event.endDateTime).format('hh:mm A')})`: `${event.roomRequired} (${formatTime(event.startDateTime,"DD-MM-YYYY HH:mm:ss")} - ${formatTime(event.endDateTime,"DD-MM-YYYY HH:mm:ss")})`,
            start: new Date(formType === 'Seminar' ? Date.parse(event.startDateTime) : moment(event.startDateTime, "DD-MM-YYYY HH:mm:ss").format("YYYY MM DD HH:mm:ss")),
            end: new Date(formType === 'Seminar' ? Date.parse(event.endDateTime) : moment(event.endDateTime, "DD-MM-YYYY HH:mm:ss").format("YYYY MM DD HH:mm:ss")),
            colorEvento: color.backgroundColor,
            val: event,
            color: color.textColor,
          };
        });
      }
      console.log(Data, 'data');
      // setIsLoading(false)
      return Data;

    } catch (error) {
      console.log("Error", error);
    }
    setIsLoading(false)
  };
  function generateRandomColors() {
   
    const r = Math.floor(Math.random() * 128) + 128; // Red component
    const g = Math.floor(Math.random() * 128) + 128; // Green component
    const b = Math.floor(Math.random() * 128) + 128; // Blue component   
  
      return({
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
        textColor: 'rgb(0,0,0)',
      });
    
  
    
  }

  // Function to calculate text color based on background color
  //   const getContrastColor = (hexColor) => {
  //     const r = parseInt(hexColor.slice(1, 3), 16);
  //     const g = parseInt(hexColor.slice(3, 5), 16);
  //     const b = parseInt(hexColor.slice(5, 7), 16);
  //     const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  //     return brightness > 128 ? 'black' : 'white';
  //   };
  //  setInterval(()=>{fetchData(user, userName,formType).then((data) => {
  //     console.log(data);
  //     setEvent(data);
  //   });},1000*60)

  useEffect(() => {
    console.log(formType)

    if (isLoading) {
      fetchData(user, userName, formType).then((data) => {
        console.log(data);
        setEvent(data);
      });
    }

  }, [formType]);
  function formatTime(dateTime,format ) {
    return moment(dateTime,format).format('hh:mm A'); // Customize the format as needed
  }

  return (
    <div className='flex flex-col items-center p-5 gap-5'>

    <div className='flex justify-evenly w-[3300px]'>        
        <div className='bg-white p-1 rounded-[5px] '>
           <Selector value={formType} setValue={setFormType} list={[{name: "Seminar"}, {name: "Guest House"}]}/>
        </div>
       <Button  variant="contained" color="warning" onClick={() => window.print()} sx={{width:'80px',height:'40px'}}>Print</Button  >    
    </div>
    <Print>
        <CalendarContainer>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700, width: 1300 }}
                BackgroundWrapper="red"
                onSelectEvent={(e)=>{modalHandler(e.val)}}
                eventPropGetter={(myEvent) => {
                const backgroundColor = myEvent.colorEvento ? myEvent.colorEvento : 'blue';
                const color = myEvent.color ? myEvent.color : 'blue';
                return { style: { backgroundColor, color } };
                }}
            />
<NoPrint>
            {user === "user" ? 
            
                <UserDataModal
                    isModalOpen={isModalOpen}
                    handleModalClose={handleModalClose}
                    selectedRow={selectedRow}
                    fetchData={()=>{}}
                />
                
            :
            
                <AdminDataModal
                    isModalOpen={isModalOpen}
                    handleModalClose={handleModalClose}
                    selectedRow={selectedRow}
                    fetchData={()=>{}}
                />
            
            }
            </NoPrint>
        </CalendarContainer>
        </Print>
    </div>
  );
};

export default CalendarView;
