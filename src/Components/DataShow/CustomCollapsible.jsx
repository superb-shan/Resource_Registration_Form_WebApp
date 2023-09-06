import React from 'react';
import Collapsible from 'react-collapsible';
import { Typography } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useState } from 'react';

const CustomCollapsible = ({ title, children, isOpen: incomingIsOpen, isCalendar }) => {
    const [isOpen, setIsOpen] = useState(incomingIsOpen);

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
        >
            <div className='p-3'>
                {children}
            </div>
        </Collapsible>
    );
};

export default CustomCollapsible;
