import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { LoginContext } from '../../Context/Login.Context';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useContext } from 'react';



export default function LoginUserSelector() {
  const {user, setUser} = useContext(LoginContext);

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
        <ToggleButton value="user"> <PersonOutlineIcon className='mr-1' /> <span className='mt-1'>User</span> </ToggleButton>
        <ToggleButton value="admin"><SupervisorAccountIcon className='mr-1' /><span className='mt-1'>Admin</span> </ToggleButton>
      </ToggleButtonGroup>

    </>
  );
}