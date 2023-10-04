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
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';


const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" style={{ fontSize: 45 }} />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" style={{ fontSize: 45 }} />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" style={{ fontSize: 45 }} />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" style={{ fontSize: 45 }} />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" style={{ fontSize: 45 }} />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));


const Feedback = () => {

  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [selectedRating, setSelectedRating] = useState(0)

  const { 
          userName, 
          isLoggedIn,
        } = useContext(LoginContext);  

  if (!isLoggedIn) {
    navigate("/");
  }

  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log(selectedRating)
    const res = await axios.post(`/feedback`, { userName,feedback,contactNumber:selectedRating,department:'SECE' } );
    console.log(res)
    setIsUpdated(true)
    toast.success("Thanks for your valuable feedback");
    

  }
  
  useEffect(()=>{
    // Empty block to prevent using of previous states, useEffects ensures that the current state is in the var
  },[userName,feedback]);

  try{return (
    <Wrapper alignment="center" >
        <AccountManagerContainer title = "Feedback" onSubmit = {handleUpdate}>
        <TextInput label="Name" value={userName} disabled={true} endAdornment={<AccountCircle/>} />
        <TextInput label="Feedback/Suggestions" placeholder="Any Suggestions to improve...." multiline={true} value={feedback} setValue={setFeedback} />    
        
        <StyledRating
        name="highlight-selected-only"
        value={selectedRating}
        onChange={(event, newValue) => {
          setSelectedRating(newValue); 
        }}
        IconContainerComponent={IconContainer}
        getLabelText={(value) => customIcons[value].label}
        highlightSelectedOnly
        size="small"
            />
        
        <Button variant="contained" sx={{ width: "100px" }} type="submit" color={isUpdated ? "success" : "primary"}>Submit</Button>
        <h3 className='text-orange-600'>Every Feedback and Suggestion Matters !</h3>
        </AccountManagerContainer>
    </Wrapper>
  )}catch(err){
    console.log(err);
  }
}

export default Feedback;
