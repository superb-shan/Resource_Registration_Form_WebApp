import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';



export default function LoginUserSelector() {
  const [user, setUser] = useState('user');

  const handleChange = (event, newUser) => {
    setUser(newUser);
  };



  return (
    <>

      <ToggleButtonGroup
        color="primary"
        value={user}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="user"> <PersonOutlineIcon /> User</ToggleButton>
        <ToggleButton value="admin"><SupervisorAccountIcon />Admin</ToggleButton>
      </ToggleButtonGroup>

    </>
  );
}