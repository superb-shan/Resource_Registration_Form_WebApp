import React, { useContext, useEffect, useState } from 'react'
import { Wrapper } from '../Components/Wrappers/Wrapper';
import { AccountManagerContainer } from '../Components/Containers/AccountManagerContainer';
import { TextInput, PasswordInput } from '../Components/Fields/InteractionFields';
import { LoginContext } from '../Context/Login.Context';
import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangePasswordPage = () => {

  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { 
          userName, 
          setPassword,
          isLoggedIn,
          setIsLoggedIn 
        } = useContext(LoginContext);

  if (!isLoggedIn) {
    navigate("/");
  }

  const isValidPassword = (password) => {
    const requirements = [];
    if (password.length < 8) requirements.push("Password must be at least 8 characters long.");
    if (!/[a-z]/.test(password)) requirements.push("Include at least one lowercase letter.");
    if (!/[A-Z]/.test(password)) requirements.push("Include at least one uppercase letter.");
    if (!/\d/.test(password)) requirements.push("Include at least one digit.");
    if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password)) requirements.push("Include at least one special character.");
    return requirements;
  };

  const handleUpdate = async (event) => {

    event.preventDefault();
    if (newPassword !== confirmPassword){
        toast.info('Please enter the same password');
        return;
    }
    if (newPassword === "" || confirmPassword === ""){
        toast.info('Password cannot be empty!');
        return;
    }

    //! Strong Password Check
    // const passwordRequirements = isValidPassword(newPassword);
    // if (passwordRequirements.length > 0) {
    //     toast.info(passwordRequirements.join(" "));
    //     return;
    // }

    const res = await axios.patch(`/user/update`, { name: userName, password: newPassword  } );
    const loginStatus = res.data.message;
    if (loginStatus === true){   
        toast.success("Password Updated!");
        setPassword(newPassword);
        setIsUpdated(true);
        setIsLoggedIn(false);
    }else{
        console.log("not updated", loginStatus);
    }

  }
  
  useEffect(()=>{
    // Empty block to prevent using of previous states, useEffects ensures that the current state is in the var
  },[userName, newPassword, confirmPassword]);

  try{return (
    <Wrapper alignment="center" >
      <AccountManagerContainer title = "Change Password" onSubmit = {handleUpdate}>
        <TextInput label={"User Name"} value={userName} disabled={true} endAdornment={<AccountCircle/>} />
        <PasswordInput label={"New Password"} value={newPassword} setValue={setNewPassword} />
        <PasswordInput label={"Confirm Password"} value={confirmPassword} setValue={setConfirmPassword} />
        <Button variant="contained" sx={{ width: "100px" }} type="submit" color={isUpdated ? "success" : "primary"}>Update</Button>
      </AccountManagerContainer>
    </Wrapper>
  )}catch(err){
    console.log(err);
  }
}

export default ChangePasswordPage;
