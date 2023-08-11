import React, {useContext, useState} from 'react';
import { Box, Button, Divider, Grid, List, ListItemText, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { SeminorContext } from '../../Context/Seminor.Context';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Done, Send } from '@mui/icons-material';
import ReactLoading from 'react-loading';
import { UserContext } from '../../Context/User.Context';
import { GuestHouseContext } from '../../Context/GuestHouse.Context';

export const CheckAvailabilityContainer = () => {

    const [seminarOrGuest, setSeminarOrGuest] = useState('Seminar Hall');

    const{
        setHall, 
        isAvailabilityChecked,
        setIsAvailabilityChecked,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        handleCheckAvailability,
        isAvailabilityLoading,
        unavailableHalls,
        eventHall
    } 
    = useContext(SeminorContext);

    const {
        startDateTime, 
        endDateTime, 
        setRequiredRoom,
        isGuestHouseAvailabilityChecked,
        setIsGuestHouseAvailabilityChecked,
        isGuestHouseAvailabilityLoading,
        handleGuestRoomCheckAvailability,
        setStartDateTime,
        setEndDateTime,
        allRooms,
        unavailableGuestHouses
  } = useContext(GuestHouseContext);

    const{
        setSelectedView,
        setSelectedForm
    }
    = useContext(UserContext);


    const handleStartDateChange = (date) => {
        setHall('');
        setIsAvailabilityChecked(false);
        setStartDate(date);
      };
    
      const handleEndDateChange = (date) => {
        setHall('');
        setIsAvailabilityChecked(false);
        setEndDate(date);
      };
    
      const handleStartTimeChange = (time) => {
        setHall('');
        setIsAvailabilityChecked(false);
        setStartTime(time);
      };
    
      const handleEndTimeChange = (time) => {
        setHall('');
        setIsAvailabilityChecked(false);
        setEndTime(time);
      };

      const handleProceed = () => {
        setSelectedView("Add Bookings");
        setSelectedForm(seminarOrGuest);
      }

      const handleSeminarOrGuestChange = (event, newSeminarGuestValue) => {
        setSeminarOrGuest(newSeminarGuestValue);
      };

      const handleStartDateTimeChange = (dateTime) => {
        setRequiredRoom('');
        setIsGuestHouseAvailabilityChecked(false);
        setStartDateTime(dateTime);
        console.log(dateTime);
      };
    
      const handleEndDateTimeChange = (dateTime) => {
        setRequiredRoom('');
        setIsGuestHouseAvailabilityChecked(false);
        setEndDateTime(dateTime);
        console.log(dateTime);
      };

  return (
    <div className='p-20 px-40 [@media(max-width:640px)]:p-5 h-[90.7vh] bg-fixed bg-[#1976d2] flex items-start'>
        <div className='h-full w-full bg-white rounded-md p-10 flex gap-8 items-center justify-evenly'>
            <Box sx={{display: "flex", gap: "30px", flexDirection: "column"}}>
                
                <ToggleButtonGroup
                    color="primary"
                    value={seminarOrGuest}
                    exclusive
                    onChange={handleSeminarOrGuestChange}
                    sx={{mx: "auto"}}
                >
                    <ToggleButton value="Seminar Hall"><span className='mt-1'>Seminar Hall</span> </ToggleButton>
                    <ToggleButton value="Guest House"><span className='mt-1'>Guest House</span> </ToggleButton>
                </ToggleButtonGroup>

                {seminarOrGuest === "Seminar Hall" ?  
                <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} >
                        <DatePicker
                            sx={{width:"300px"}}
                            label='Start Date *'
                            views={['year', 'month', 'day']}
                            disablePast
                            value={startDate}
                            onChange={handleStartDateChange}
                            format='DD-MM-YYYY'
                        />
                        </DemoContainer>
                    </LocalizationProvider>

                {/* end datepicker*/}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            sx={{width:"300px"}}
                            label='End Date *'
                            views={['year', 'month', 'day']}
                            disablePast
                            value={endDate}
                            onChange={handleEndDateChange}
                            format='DD-MM-YYYY'
                        />
                        </DemoContainer>
                    </LocalizationProvider>

                {/* time picker start*/}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                        <TimePicker
                            sx={{width:"300px"}}
                            label="Start Time *"
                            value={startTime}
                            onChange={handleStartTimeChange}
                        />
                        </DemoContainer>
                    </LocalizationProvider>

                {/* time picker end*/}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                        <TimePicker
                            sx={{width:"300px"}}
                            label="End Time *"
                            value={endTime}
                            onChange={handleEndTimeChange}
                        />
                        </DemoContainer>
                    </LocalizationProvider>
                </>
                : 
                <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        sx={{width:"300px"}}
                        label = "Check-in Datetime *" 
                        disablePast value={startDateTime} 
                        onChange={handleStartDateTimeChange} 
                        format="DD-MM-YYYY hh:mm A"
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        sx={{width:"300px"}}
                        label = "Check-out Datetime *" 
                        disablePast value={endDateTime} 
                        onChange={handleEndDateTimeChange} 
                        format="DD-MM-YYYY hh:mm A"
                        />
                    </LocalizationProvider>
                </>
                }

                <Button variant="contained" sx={{width:"200px", height: "40px", mx: "auto"}} onClick={seminarOrGuest === "Seminar Hall" ? handleCheckAvailability : handleGuestRoomCheckAvailability} color={seminarOrGuest === "Seminar Hall" ? (isAvailabilityChecked ? "success" : "primary"): (isGuestHouseAvailabilityChecked ? "success" : "primary")} >{ seminarOrGuest === "Seminar Hall" ?  (isAvailabilityLoading? <ReactLoading height={"20%"} width={"10%"} /> : isAvailabilityChecked ? <Done/> : <>Check Availability</>) : (isGuestHouseAvailabilityLoading? <ReactLoading height={"20%"} width={"10%"} /> : isGuestHouseAvailabilityChecked ? <Done/> : <>Check Availability</>)  }</Button>
            </Box>

            <Box sx={{display: "flex", gap: "30px", flexDirection: "column"}}>
                <Typography variant="h6" component="div" sx={{textAlign: "center", m: 0}}> Seminar Halls </Typography>
                <Grid container spacing={2} sx={{textAlign: "center",backgroundColor: "#FFD966",  width: {xs:"400px", md:"800px"}, borderRadius: "10px", ml: {xs:0,md:1}, height: {xs: "auto", md: "300px"}, overflow: "auto"}}> 
                    <Grid item xs={12} md={6} sx={{display: "flex", justifyContent: "flex-start", flexDirection: "column", p: 1}}>
                    {isAvailabilityLoading ? <ReactLoading type="spin" height={"20%"} width={"10%"} color='#1976d2' />  :
                    <>
                        <Typography variant="h6" component="div" >
                            Available
                        </Typography>
                        <Box>
                            <List>
                            { seminarOrGuest === "Seminar Hall" ?  
                                (unavailableHalls.length === eventHall.length ? <ListItemText primary={"None"} />  : eventHall.filter(hall => !unavailableHalls.includes(hall.value)).map((hall) => <ListItemText primary={hall.value} />))
                                :
                                (unavailableGuestHouses.length === allRooms.length ? <ListItemText primary={"None"} />  : allRooms.filter(room => !unavailableGuestHouses.includes(room)).map((room) => <ListItemText primary={room} />))
                            }
                            </List>
                        </Box>
                    </>
                    }
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={12} md={5} sx={{display: "flex", justifyContent: "flex-start", flexDirection: "column"}}>
                    {isAvailabilityLoading? <ReactLoading type="spin" height={"20%"} width={"10%"} color='#1976d2' />  :
                    <Box>
                        <Typography variant="h6" component="div" >
                            Not Available
                        </Typography>
                        <Box>
                            <List>
                            {  seminarOrGuest === "Seminar Hall" ?
                                (unavailableHalls.length === 0 ? <ListItemText primary={"None"} />  : unavailableHalls.map((hall) => <ListItemText primary={hall}/>))
                                :
                                (unavailableGuestHouses.length === 0 ? <ListItemText primary={"None"} />  : unavailableGuestHouses.map((room) => <ListItemText primary={room}/>))
                            }  
                            </List>
                        </Box>
                    </Box>
                    }
                    </Grid>
                </Grid>

                <Button variant="contained" sx={{width:"200px", height: "40px", mx: "auto"}} onClick={handleProceed} disabled={seminarOrGuest === "Seminar Hall" ? !isAvailabilityChecked : !isGuestHouseAvailabilityChecked} endIcon={<Send />}>Proceed</Button>
            </Box>
        </div>
    </div>
  )
}
