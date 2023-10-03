import React, { useState } from 'react'
import DataViewContainer from '../Containers/DataViewContainer';
import DataGridTable from './DataGridTable';
import DataFilterComponent from './DataFilterComponent';
import { UserContext } from '../../Context/User.Context';
import moment from 'moment';
import axios from 'axios';
import { useContext } from 'react';
import { LoginContext } from '../../Context/Login.Context';
import { useEffect } from 'react';
import UserDataModal from '../Modals/UserDataModal';
import AdminDataModal from '../Modals/AdminDataModal';
import ReactLoading from 'react-loading';
import { DataContext } from '../../Context/Data.Context';

const Bookings = () => {

  const [gridData, setGridData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customActiveTypeFilter, setCustomActiveTypeFilter] = useState(null);
  const [customActiveStatusFilter, setCustomActiveStatusFilter] = useState(null);
  const [customActiveDepartmentFilter, setCustomActiveDepartmentFilter] = useState(null);
  const { user,userName  } = useContext(LoginContext);
  const { allDepartments } = useContext(DataContext);

  const VISIBLE_FIELDS = ['type','name', 'date', 'time', 'status', 'actions', 'remarks'];

  const fetchData = async () => {
    setIsLoading(true)
    const param = {}
    if (user === "user")
      param["name"] = userName;
    if (selectedDate) {
      param.date = moment(selectedDate.toString()).format('YYYY-MM-DD')
      console.log(param)
    }
    try {
      const transportResponse = await axios.get('/transport/get', { params: param })
      console.log(transportResponse);
      const seminarResponse = await axios.get('/seminar/get', { params: param })
      const guestHouseResponse = await axios.get('/guesthouse/get', { params: param })
      const itemResponse = await axios.get('/Items/get', { params: param })
      const fullData = [...transportResponse?.data?.data, ...seminarResponse?.data?.data, ...guestHouseResponse?.data?.data, ...itemResponse?.data?.data];
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
  }, [selectedDate]);

  return (
    <DataViewContainer>
      {isLoading ? <div className='w-[1125px] h-[720px] flex justify-center items-center'><ReactLoading type={"bars"} color={"#1976D2"} height={"20%"} width={"7%"} /></div> : (<DataGridTable
        gridData={gridData}
        VISIBLE_FIELDS={VISIBLE_FIELDS}
        setSelectedRow={setSelectedRow}
        setIsModalOpen={setIsModalOpen}
        fetchData={fetchData}
        customActiveTypeFilter={customActiveTypeFilter}
        customActiveStatusFilter={customActiveStatusFilter}
        customActiveDepartmentFilter={customActiveDepartmentFilter}
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
      />)}
      <DataFilterComponent
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        fetchData={fetchData}
        filterData={[
          {
            title: "Resource Filters",
            filters: ["Transport", "Seminar", "GuestHouse", "Items"],
            // filters: ["Transport", "Seminar", "GuestHouse", "Items", "Event/poster", "Food"],
            value: customActiveTypeFilter,
            setValue: setCustomActiveTypeFilter,
            isOpen: false,
          },
          {
            title: "Status Filters",
            filters: ["Pending", "Accepted", "Rejected"],
            value: customActiveStatusFilter,
            setValue: setCustomActiveStatusFilter,
            isOpen: false,
          },
          {
            title: "Department Filters",
            filters: allDepartments,
            value: customActiveDepartmentFilter,
            setValue: setCustomActiveDepartmentFilter,
            isOpen: false,
          },
        ]}
      />
    </DataViewContainer>
  )
}

export default Bookings