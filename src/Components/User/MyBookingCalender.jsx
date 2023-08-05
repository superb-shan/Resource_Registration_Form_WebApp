import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useContext } from 'react';
import { UserContext } from '../../Context/User.Context';

export default function UserCalender() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid white',
        boxShadow: 24,
        p: 4,
        borderRadius: 3
    }

    const {selectedDate, setSelectedDate}= useContext(UserContext)

    const handleDateChange = (newDate) => {
        console.log(newDate);
        setSelectedDate(newDate); // Update selected date when it changes
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                value={selectedDate} // Pass the selected date as value
                onChange={handleDateChange} // Handle date changes
                sx={style}
            />
        </LocalizationProvider>
    );
}
