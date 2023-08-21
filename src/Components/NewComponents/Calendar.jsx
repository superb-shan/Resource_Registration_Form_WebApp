import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar({...props}) {
    const style = {
        position: 'relative',
        width: 350,
        bgcolor: 'secondary.main',
        border: '2px solid white',
        boxShadow: 5,
        borderRadius: 3
    }

    const handleDateChange = (newDate) => {
        props.setSelectedDate(newDate); // Update selected date when it changes
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                value={props.selectedDate} // Pass the selected date as value
                onChange={handleDateChange} // Handle date changes
                sx={style}
            />
        </LocalizationProvider>
    );
}
