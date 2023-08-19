import React, { useEffect } from 'react'
import { Wrapper } from './Wrapper'
import NavBar from './NavBar'
import DataViewContainer from './DataViewContainer';
import DataGridTable from './DataGridTable';
import { useContext } from 'react';
import { LoginContext } from '../../Context/Login.Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'momnet';
import axios from 'axios';
import { useState } from 'react';
import UserDataModal from './UserDataModal';
import { UserContext } from '../../Context/User.Context';
import DataFilterContainer from './DataFilterContainer';


 const UserPage = () => {

  const navigate = useNavigate();
  const [gridData, setGridData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customActiveTypeFilter, setCustomActiveTypeFilter] = useState(null);
  const [customActiveStatusFilter, setCustomActiveStatusFilter] = useState(null);
  const {isLoggedIn} = useContext(LoginContext);
  const {selectedView} = useContext(UserContext);

const VISIBLE_FIELDS = ['type', 'name', 'date', 'time', 'status', 'actions','remarks'];


  const fetchData = async () => {
    const param = {}
    if(selectedDate){
     param.date = moment(selectedDate.toString()).format('YYYY-MM-DD')
     console.log(param)
    }
    try {
      // console.log("entering")
      const transportResponse = await axios.get('/transport/get',{params:param})
      const seminarResponse = await axios.get('/seminar/get',{params:param})
      const guestHouseResponse = await axios.get('/guesthouse/get',{params:param})
      const itemResponse = await axios.get('/items/get',{params:param})
    //   const transportRequest = axios.get('/transport/get', { params: param });
    // const seminarRequest = axios.get('/seminar/get', { params: param });
    // const guestHouseRequest = axios.get('/guesthouse/get', { params: param });
    // const itemRequest = axios.get('/items/get', { params: param });

    // // Run all requests in parallel and wait for all of them to complete
    // const [transportResponse, seminarResponse, guestHouseResponse, itemResponse] = await Promise.all([
    //   transportRequest,
    //   seminarRequest,
    //   guestHouseRequest,
    //   itemRequest,
    // ]);
      const fullData=[...transportResponse.data.data,...seminarResponse.data.data, ...guestHouseResponse.data.data,...itemResponse.data.data];
      // console.log("fullData",fullData)
      setGridData(fullData)
      setIsLoading(false)
    }
    catch (error) {
      console.log("Error", error)
    };

  }

  const handleModalOpen = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
    fetchData()

  };

  useEffect(()=>{
    if (!isLoggedIn) {
      console.log("in not logged");
      // Redirect to login page if not logged in
      navigate("/");
    } else {
      toast.success("Logged in to User")
    }
  },[isLoggedIn]);

  useEffect(() => {
    fetchData()
  },[]);

  return (
    <Wrapper alignment="start">
        <NavBar title={'Resource Registration'} />
        {selectedView === "My Bookings"? 
          <DataViewContainer>
            <DataGridTable 
              gridData={gridData} 
              VISIBLE_FIELDS = {VISIBLE_FIELDS} 
              setSelectedRow={setSelectedRow} 
              setIsModalOpen={setIsModalOpen} 
              fetchData={fetchData} 
              customActiveTypeFilter={customActiveTypeFilter} 
              customActiveStatusFilter ={customActiveStatusFilter}
              selectedDate={selectedDate}
              handleModalOpen={handleModalOpen} 
              modal={
                <UserDataModal 
                isModalOpen={isModalOpen}  
                handleModalClose={handleModalClose} 
                selectedRow={selectedRow} 
                fetchData={fetchData} 
              />
            }
          />
          <DataFilterContainer setSelectedDate={setSelectedDate} setCustomActiveStatusFilter={setCustomActiveStatusFilter} setCustomActiveTypeFilter={setCustomActiveTypeFilter} selectedDate={selectedDate} customActiveTypeFilter={customActiveTypeFilter} customActiveStatusFilter={customActiveStatusFilter}/>
        </DataViewContainer>
        : null}
        

    </Wrapper>
  )
}

export default UserPage;
