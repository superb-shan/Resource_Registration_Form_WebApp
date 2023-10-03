import React, { useContext, useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { LoginContext } from '../../Context/Login.Context';
import "react-big-calendar/lib/css/react-big-calendar.css";
import {DropDownSelector} from '../Fields/InteractionFields';
import CalendarContainer from '../Containers/CalendarContainer';
import UserDataModal from '../Modals/UserDataModal';
import AdminDataModal from '../Modals/AdminDataModal';
import { Button } from '@mui/material';
import  { Print, NoPrint } from "react-easy-print";
import './bigCustomStyles.css'
import { SeminarContext } from '../../Context/Seminar.Context';
import ReactLoading from 'react-loading';
import { GuestHouseContext } from '../../Context/GuestHouse.Context';
const localizer = momentLocalizer(moment);

const CalendarView = (props) => {
  const { user, userName } = useContext(LoginContext);
  const [events, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formType, setFormType] = useState('Auditorium/Training Halls');
  const [requiredHallRoom, setRequiredHallRoom] = useState('All');
  const [selectedRow, setSelectedRow] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { allHalls } = useContext(SeminarContext);
  const { allRooms } = useContext(GuestHouseContext);

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

    param["isapproved"] = true

    if (user === "user") param["name"] = userName; 
    if (formType !== 'Guest House') param['category'] = formType;
    if (requiredHallRoom !== 'All') param[formType === 'Guest House'? 'roomRequired' : 'hallRequired'] = requiredHallRoom;

    try {

      let Data = [];
      let seminarResponse = await axios.get(`/${formType === 'Guest House' ? "guesthouse": "seminar"}/get`, { params: param });
      seminarResponse = seminarResponse.data.data;
      console.log(seminarResponse);
      console.log("events", events);

      if (seminarResponse.length > 0) {
        Data = seminarResponse.map((event) => {
          let color = generateRandomColors()
          return {
            title: formType === 'Guest House' ?`${event.roomRequired} (${formatTime(event.startDateTime,"DD-MM-YYYY HH:mm:ss")} - ${formatTime(event.endDateTime,"DD-MM-YYYY HH:mm:ss")})`: `${event.hallRequired} (${moment(event.startDateTime).format('hh:mm A')} - ${moment(event.endDateTime).format('hh:mm A')})`,
            start: new Date(formType === 'Guest House' ?  moment(event.startDateTime, "DD-MM-YYYY HH:mm:ss").format("YYYY MM DD hh:mm:ss"): Date.parse(event.startDateTime)),
            end: new Date(formType === 'Guest House' ?  moment(event.endDateTime, "DD-MM-YYYY HH:mm:ss").format("YYYY MM DD hh:mm:ss"):Date.parse(event.endDateTime)),
            colorEvento: color.backgroundColor,
            val: event,
            color: color.textColor,
          };
        });
      }
      console.log(Data, 'data');
      setIsLoading(false);
      return Data;
    } catch (error) {
      console.log("Error", error);
    }
    setIsLoading(false);
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

  useEffect(() => {
    console.log(formType)
    fetchData(user, userName, formType).then((data) => {
      console.log(data);
      setEvent(data);
    });
  }, [formType, requiredHallRoom]);

  function formatTime(dateTime,format ) {
    return moment(dateTime,format).format('hh:mm A'); // Customize the format as needed
  }

  return (
    <div className='flex flex-col items-center p-5 gap-5'>

    <div className='flex justify-between w-full'>        
      <div className='flex gap-[20px] items-center'>
        <DropDownSelector buttonSide='right' value={formType} setValue={setFormType} setSubListAll={setRequiredHallRoom}
          list={[ 
            ...Object.keys(allHalls), "Guest House"
            ]} 
        />
        {
          true &&
          <DropDownSelector buttonSide='right' value={requiredHallRoom} setValue={setRequiredHallRoom} 
          list={
            formType === 'Guest House' ?
            [ "All", ...allRooms ]
            :
            [ "All", ...allHalls[formType].map(hall => hall.name) ]
          } 
          />
        }
        {isLoading && <ReactLoading height={"30px"} width={"30px"} type='spin' /> }
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
                  fetchData={fetchData}
              />
              
          :
          
              <AdminDataModal
                  isModalOpen={isModalOpen}
                  handleModalClose={handleModalClose}
                  selectedRow={selectedRow}
                  fetchData={fetchData}
              />
          
          }
        </NoPrint>
      </CalendarContainer>
    </Print>
    </div>
  );
};

export default CalendarView;
