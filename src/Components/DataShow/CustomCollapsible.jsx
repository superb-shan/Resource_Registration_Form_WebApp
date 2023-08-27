import React from 'react';
import Collapsible from 'react-collapsible';
import { Typography } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useState } from 'react';

const CustomCollapsible = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

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
            onOpening={() => setIsOpen(true)}
            onClosing={() => setIsOpen(false)}
        >
            {children}
        </Collapsible>
    );
};

export default CustomCollapsible;
