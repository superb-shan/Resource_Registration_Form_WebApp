import React, { useContext, useEffect, useState } from 'react'
import { Wrapper } from '../Components/Wrappers/Wrapper';
import { AccountManagerContainer } from '../Components/Containers/AccountManagerContainer';
import { TextInput, PasswordInput } from '../Components/Fields/InteractionFields';
import { LoginContext } from '../Context/Login.Context';
import { AccountCircle, Done, Mail } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateUserPage = () => {

  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { user, isLoggedIn } = useContext(LoginContext);

  console.log(user, isLoggedIn);

  if (!isLoggedIn && user !== 'admin') {
    toast.info("You are not logged in as an Admin");
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

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleCreate = async (event) => {

    event.preventDefault();
    console.log(newPassword, confirmPassword);
    if (newPassword !== confirmPassword){
        toast.info('Please enter the same password');
        return;
    }
    if (newUserName === "" || newEmail === "" || newPassword === "" || confirmPassword === ""){
        toast.info('Fields cannot be empty!');
        return;
    }

    //! Strong Password Check
    // const passwordRequirements = isValidPassword(newPassword);
    // if (passwordRequirements.length > 0) {
    //     toast.info(passwordRequirements.join(" "));
    //     return;
    // }

    //! Email Validation
    if (!isValidEmail(newEmail)) {
        toast.info("Please provide a valid email");
        return;
    }

    const res = await axios.post("/user/create", { name: newUserName, email: newEmail,  password: newPassword  } );
    const loginStatus = res.data.message;
    if (loginStatus === "success"){
      setIsCreated(true);
      setNewUserName('');
      setNewEmail('');
      setConfirmPassword('');
      setNewPassword('');
      toast.success("New user Created");
      setTimeout(()=> {setIsCreated(false)}, 3000);
    }else{
      toast.warn(loginStatus);
    }

  }
  
  useEffect(()=>{}, [newUserName, newPassword, confirmPassword, newEmail]);

  try{return (
    <Wrapper alignment="center" >
      <AccountManagerContainer title = "Create User" onSubmit = {handleCreate}>
        <TextInput label={"New User Name"} value={newUserName} setValue={setNewUserName} endAdornment={<AccountCircle/>} />
        <TextInput label={"New Email"} value={newEmail} setValue={setNewEmail} endAdornment={<Mail/>} />
        <PasswordInput label={"New Password"} value={newPassword} setValue={setNewPassword} />
        <PasswordInput label={"Confirm Password"} value={confirmPassword} setValue={setConfirmPassword} />
        <Button variant="contained" sx={{ width: "100px" }} type="submit" color={isCreated? "success": "primary"} endIcon={isCreated?<Done />:<></>}>{isCreated? "Created" : "Create"}</Button>
      </AccountManagerContainer>
    </Wrapper>
  )}catch(err){
    console.log(err);
  }
}

export default CreateUserPage;
