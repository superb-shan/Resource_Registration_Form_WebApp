import React, { useEffect } from 'react';
import Collapsible from 'react-collapsible';
import { Typography } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useState } from 'react';

const CustomCollapsible = ({ title, children, isOpen: incomingIsOpen, isCalendar, isAvailability = false }) => {
    const [isOpen, setIsOpen] = useState(incomingIsOpen);

    console.log("isOpen at start", isOpen);
    useEffect(()=>{
        console.log("trigger", isOpen);
    }, [isOpen]);
    return (
        <Collapsible
            trigger={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mb: 0.5 }}>
                        {title}
                    </Typography>
                    <KeyboardArrowDown sx={{ marginLeft: 'auto', color: "text.main", transform: `rotate(${isOpen ? 180 : 0}deg)`, transition: 'transform 0.3s' }} />
                </div>
            }
            open={isCalendar}
            onOpening={() => setIsOpen(true)}
            onClosing={() => setIsOpen(false)}
            className={`${isAvailability ? 'bg-yellow-200' : 'bg-gray-100'} pl-[10px] rounded-[5px] w-full mb-1`}
            openedClassName={`${isAvailability ? 'bg-yellow-200' : 'bg-gray-100'} p-[10px] pb-0 rounded-[12px] mb-[10px]`}
            contentInnerClassName= "border-t-[1px] border-t-[gray]"
        >
            <div className='p-3'>
                {children}
            </div>
        </Collapsible>
    );
};

export default CustomCollapsible;
