import React, {useContext} from 'react';
import { Box, Button, Divider, Grid, List, ListItemText, Typography } from '@mui/material';
import { SeminorContext } from '../../Context/Seminor.Context';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Done, Send } from '@mui/icons-material';
import ReactLoading from 'react-loading';
import { UserContext } from '../../Context/User.Context';

export const CheckAvailabilityContainer = () => {

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
        setSelectedForm("Seminar Hall");
      }

  return (
    <div className='p-20 px-40 [@media(max-width:640px)]:p-5 h-[92.7vh] bg-fixed bg-[#1976d2] flex items-start'>
        <div className='h-full w-full bg-white rounded-md p-10 flex gap-8 items-center justify-evenly'>
            <Box sx={{display: "flex", gap: "30px", flexDirection: "column"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} >
                    <DatePicker
                        sx={{width:"300px"}}
                        label='Start Date *'
                        views={['year', 'month', 'day']}
                        disablePast
                        value={startDate}
                        onChange={handleStartDateChange}
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

                <Button variant="contained" sx={{width:"200px", height: "40px", mx: "auto"}} onClick={handleCheckAvailability} color={isAvailabilityChecked? "success" : "primary"} >{isAvailabilityLoading? <ReactLoading height={"20%"} width={"10%"} /> : isAvailabilityChecked ? <Done/> : <>Check Availability</>  }</Button>
            </Box>

            <Box sx={{display: "flex", gap: "30px", flexDirection: "column"}}>
                <Grid container spacing={2} sx={{textAlign: "center",backgroundColor: "#FFD966",  width: {xs:"400px", md:"720px"}, borderRadius: "10px", ml: {xs:0,md:1}, mt: 1, height: {xs: "auto", md: "340px"}}}>
                    <Grid item xs={12} md={6} >
                    <Typography variant="h6" component="div" >
                        Available
                    </Typography>
                    <Box>
                        <List>
                        { unavailableHalls.length === eventHall.length ? <ListItemText primary={"None"} />  : eventHall.filter(hall => !unavailableHalls.includes(hall.value)).map((hall) => <ListItemText primary={hall.value} />)}
                        </List>
                    </Box>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={12} md={5}>
                    <Typography variant="h6" component="div">
                        Not Available
                    </Typography>
                    <Box>
                        <List>
                        { unavailableHalls.length === 0 ? <ListItemText primary={"None"} />  : unavailableHalls.map((hall) => <ListItemText primary={hall}/>)}  
                        </List>
                    </Box>
                    </Grid>
                </Grid>

                <Button variant="contained" sx={{width:"200px", height: "40px", mx: "auto"}} onClick={handleProceed} disabled={!isAvailabilityChecked} endIcon={<Send />}>Proceed</Button>
            </Box>
        </div>
    </div>
  )
}
