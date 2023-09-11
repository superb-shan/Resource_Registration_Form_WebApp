import React, { useState } from 'react'
import DataViewContainer from '../Containers/DataViewContainer';
import DataGridTable from './DataGridTable';
import DataFilterComponent from './DataFilterComponent';
import { UserContext } from '../../Context/User.Context';
import moment from 'moment';
import axios from 'axios';
import { useContext } from 'react';
import { useCallback } from 'react';
import { LoginContext } from '../../Context/Login.Context';
import { useEffect } from 'react';
import UserDataModal from '../Modals/UserDataModal';
import AdminDataModal from '../Modals/AdminDataModal';

const Bookings = () => {

  const [gridData, setGridData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customActiveTypeFilter, setCustomActiveTypeFilter] = useState(null);
  const [customActiveStatusFilter, setCustomActiveStatusFilter] = useState(null);
  const {user} = useContext(LoginContext);
  const {userName} = useContext(UserContext);

  const VISIBLE_FIELDS = ['type', 'name', 'date', 'time', 'status', 'actions','remarks'];

  const fetchData = async () => {
    const param = {}
    if (user === "user")
        param["name"] = userName;
    if(selectedDate){
     param.date = moment(selectedDate.toString()).format('YYYY-MM-DD')
     console.log(param)
    }
    try {
      const transportResponse = await axios.get('/transport/get',{params:param})
      console.log(transportResponse);
      const seminarResponse = await axios.get('/seminar/get',{params:param})
      const guestHouseResponse = await axios.get('/guesthouse/get',{params:param})
      const itemResponse = await axios.get('/Items/get',{params:param})
      const fullData=[...transportResponse?.data?.data,...seminarResponse?.data?.data, ...guestHouseResponse?.data?.data,...itemResponse?.data?.data];
      // const fullData=[...transportResponse?.data?.data,...seminarResponse?.data?.data,...itemResponse?.data?.data];
      setGridData(fullData)
      setIsLoading(false)
    }
    catch (error) {
      console.log("Error", error)
    };

  };

  const handleModalOpen = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
    fetchData()

  };

  useEffect(() => {
    fetchData();
  },[selectedDate]);

  return (
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
                user === "user" ?
                    <UserDataModal 
                    isModalOpen={isModalOpen}  
                    handleModalClose={handleModalClose} 
                    selectedRow={selectedRow} 
                    fetchData={fetchData} 
                    />
                :
                    <AdminDataModal 
                    isModalOpen={isModalOpen}  
                    handleModalClose={handleModalClose} 
                    selectedRow={selectedRow} 
                    fetchData={fetchData} 
                    />
          }
        />
        <DataFilterComponent 
          setSelectedDate={setSelectedDate} 
          selectedDate={selectedDate} 
          fetchData={fetchData}
          filterData = {[
            {
              title: "Type Filters",
              filters: ["Transport", "Seminar", "GuestHouse", "Items", "Event/poster", "Food"],
              value: customActiveTypeFilter,
              setValue: setCustomActiveTypeFilter,
              isOpen : false,
            },
            {
              title: "Status Filters",
              filters: ["Pending", "Accepted", "Rejected"],
              value: customActiveStatusFilter,
              setValue: setCustomActiveStatusFilter,
              isOpen : false,
            },
          ] }          
        />
      </DataViewContainer>
  )
}

export default Bookings