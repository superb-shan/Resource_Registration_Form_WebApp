import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useState, useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import printJS from "print-js";
import AdminCalender from './AdminCalender';
import { useContext } from 'react';
import { AdminContext } from '../../Context/Admin.Context';
import moment from 'moment';
import { Empty } from 'antd';
import Text from '@mui/material/TextField';
import { SettingsBackupRestore } from '@mui/icons-material';




const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const VISIBLE_FIELDS = ['type', 'name', 'date', 'time', 'status', 'actions','remarks'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: "1rem 2rem",
  borderRadius: 3,
  overflow:"scroll",
  paddingTop:'5px',
  height:800
};

const Calstyle = {
  position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: '100%',
  backgroundColor:'transparent',
   border: '2px solid white',
  boxShadow: 24,
  p: 4,
  borderRadius: 3
};

function AdminViewTable() {


  const [isOpen, setIsOpen] = React.useState(false);
  const [isCalOpen, setIsCalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const[isAdd,setIsAdd]=useState(false)
  const [remarks, setRemarks] = useState('');
  const {setUserData,selectedDate, setSelectedDate,userData}= useContext(AdminContext)
  const [customActiveTypeFilter, setCustomActiveTypeFilter] = useState(null);
  const [customActiveStatusFilter, setCustomActiveStatusFilter] = useState(null);
  // const {}
  

  const fetchData = async () => {
    const param = {}
    if(selectedDate){
     param.date = moment(selectedDate.toString()).format('YYYY-MM-DD')
     console.log(param)
    }
    try {
      console.log("entering")
      const transportResponse = await axios.get('/transport/get',{params:param})
      const seminarResponse = await axios.get('/seminar/get',{params:param})
      const guestHouseResponse = await axios.get('/guesthouse/get',{params:param})
       const itemResponse = await axios.get('/items/get',{params:param})
     const fullData=[...transportResponse.data.data,...seminarResponse.data.data, ...guestHouseResponse.data.data,...itemResponse.data.data];
     console.log("fulldata",fullData)
     setUserData(fullData)
      setIsLoading(false)
    }
    catch (error) {
      console.log("Error", error)
    };

  }

  const accept = async (id) => {
    const res = await axios.patch(`/${selectedRow.type.toLowerCase()}/update`, { id, isapproved: 'true' ,remarks})
    console.log(res)
    fetchData()
    handleClose()
    toast.success('Accepted')
    setRemarks("");

  }
  const reject = async (id) => {
    if(remarks==''){
      toast.error("Enter the Reason to Reject in Remarks Field")
    }else{
    const res = await axios.patch(`/${selectedRow.type.toLowerCase()}/update`, {
      id,
      isapproved: 'false', 
      remarks
    });
    console.log(res);
    fetchData();
    handleClose();
    toast.error('Rejected');
    setRemarks("");
    }
  };

  const handleCustomTypeFilter = async (event) => setCustomActiveTypeFilter(event.target.name);
  const handleCustomStatusFilter = async (event) => setCustomActiveStatusFilter(event.target.name);

  useEffect(() => {

    fetchData()
    console.log('hai')
    if (selectedDate === null && isAdd) {
      fetchData();
      setIsAdd(false);
    }
  }, [setSelectedDate,isAdd, selectedDate]);

  const handleallbutton = () => {
    setSelectedDate(null);
    setIsAdd(true); 
    setIsCalOpen(true);
    setCustomActiveStatusFilter(null);
    setCustomActiveTypeFilter(null);
  };


  const handleOpen = (rowData) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedRow(null);
    setIsOpen(false);
    setIsCalOpen(false)
    fetchData()

  };

  const handleCalender =()=>{
    setIsCalOpen(true)
  }
 

  if (!userData) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%', minWidth: '100%', backgroundColor: 'white' }}>
       
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        description={<span style={{marginLeft:'-20px'}}>No data found to show</span>}
      >
        
        <Button 
      variant="contained"
      size="small" 
       sx={{ width: '50px', height: '30px',marginTop:"5px",marginRight:'20px' }}
       onClick={handleallbutton}
       >
          RETURN
        </Button>
      </Empty>
    </div>

  }


  const columns = VISIBLE_FIELDS.map((field) => {


    if (field === 'actions') {
      return {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <Button variant="contained" sx={{width:"100px", fontSize: "12px"}} onClick={() => handleOpen(params.row)}>
            Show more
          </Button>
        ),
      };
    }

    if (field === 'status') {
      return {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {params.row.isapproved === null && (
              <>
                <PendingOutlinedIcon style={{ marginRight: 4, color: 'orange' }} />
                <Typography variant="body1" style={{ color: 'orange' }}>
                  Pending
                </Typography>
              </>
            )}
            {params.row.isapproved === true && (
              <>
                <CheckCircleOutlineIcon style={{ color: 'green', marginRight: 4 }} />
                <Typography variant="body1" style={{ color: 'green' }}>
                  Approved
                </Typography>
              </>
            )}
            {params.row.isapproved === false && (
              <>
                <HighlightOffIcon style={{ color: 'red', marginRight: 4 }} />
                <Typography variant="body1" style={{ color: 'red' }}>
                  Rejected
                </Typography>
              </>
            )}
          </div>
        ),
      };
    }

    return {
      field,
      headerName: field[0].toUpperCase() + field.slice(1),
      width: 200,
    };
  });

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    
    <ThemeProvider theme={theme}>
      
      <Box sx={{ height: {xs: "auto", md:"100%"}, width: '100%', backgroundColor: 'white', borderRadius:1.5, padding: 1 ,display:"flex", flexDirection: {xs: "column-reverse", md: "row"}}}>
      <DataGrid
        rows={
          userData.map(
            (obj) => obj.type === "Seminar" 
            ? 
            {...obj, date: obj.startDate + " to " + obj.endDate, time: obj.startTime + " to " + obj.endTime} 
            : 
            obj.type === "GuestHouse" 
            ? 
            {...obj, date: obj.ArrivialDateTime.split(" ")[0] + " to " + obj.DepartureDateTime.split(" ")[0], time: obj.ArrivialDateTime.split(" ")[1] + " to " + obj.DepartureDateTime.split(" ")[0]}
            :
            obj.type==="Item" 
            ?
            {...obj,date:obj.selectedDate}
            :obj
            )
            .filter(
              item => (
                (!customActiveTypeFilter || item.type === customActiveTypeFilter) &&
                (customActiveStatusFilter === "Pending" ? item.isapproved === null :
                 customActiveStatusFilter === "Success" ? item.isapproved :
                 customActiveStatusFilter === "Rejected" ? item.isapproved === false :
                 true
                )
              )
            )
        }
        columns={columns.map((column) => ({
          ...column,
          width: (column.field === 'date' || column.field === 'time') ? 200 : 130, // Customize the width as needed
        }))}
        components={{
          Toolbar: GridToolbar,
        }}
        sx={{ maxWidth: {xs: "100%", md:'70%'}, m: {xs: 2, md: 0}  }}
      />

       
        
      <div className='flex flex-col gap-4 p-2 py-0 justify-center items-center w-[30%] [@media(max-width:640px)]:w-[100%]'>
        <Button 
        variant="contained"
        size="small" 
        sx={{ height: '30px',width:'350px', display:"flex", gap: 1, fontSize: "14px"}}
        onClick={handleallbutton}
        >
        <span>Reset Data</span>
        <SettingsBackupRestore sx={{width:"18px"}} />
        </Button>
        <AdminCalender/>
        {/* //an mui box with  two columns with 1st column having 6 buttons vertically aligned and 2nd column having 3 buttons */}
        <Box sx={{ width: 400, borderRadius: 3 }}>
          <Typography sx={{mb: 1}}>Custom Filters</Typography>
          <Box sx={{display: "flex", gap: 5}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
              <Button variant={customActiveTypeFilter === "Transport" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Transport" onClick={handleCustomTypeFilter}>Transport</Button>
              <Button variant={customActiveTypeFilter === "Seminar" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Seminar" onClick={handleCustomTypeFilter}>Seminar</Button>
              <Button variant={customActiveTypeFilter === "GuestHouse" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "GuestHouse" onClick={handleCustomTypeFilter}>GuestHouse</Button>
              <Button variant={customActiveTypeFilter === "Items" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Items" onClick={handleCustomTypeFilter}>Items</Button>
              <Button variant={customActiveTypeFilter === "Event/poster" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Event/poster" onClick={handleCustomTypeFilter}>Event/Poster</Button>
              <Button variant={customActiveTypeFilter === "Food" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Food" onClick={handleCustomTypeFilter}>Food</Button>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
              <Button variant={customActiveStatusFilter === "Pending" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Pending" onClick={handleCustomStatusFilter}>Pending</Button>
              <Button variant={customActiveStatusFilter === "Success" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Success" onClick={handleCustomStatusFilter}>Success</Button>
              <Button variant={customActiveStatusFilter === "Rejected" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Rejected" onClick={handleCustomStatusFilter}>Rejected</Button>
            </Box>
          </Box>
        </Box>
      </div>
        
       
        
       
        {/* <Button onClick={handleCalender} >
          <BsCalendarCheck   style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}/>
          </Button> */}
         
{/* 
          {isCalOpen && (
        <Modal open={true} onClose={handleClose} sx={Calstyle}>
          <div>
          <AdminCalender />
          </div>
        </Modal>
      )} */}

        <Modal open={isOpen} onClose={handleClose}>
          <div>
            {/* Render the detailed information from selectedRow */}
            {selectedRow && (
              <div>
                <Box sx={style}>
                  <div style={{ textAlign: 'right' }}>
                    <Button onClick={handleClose}  ><IoCloseCircleOutline /></Button>
                  </div>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
                    Details
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TableContainer>
                      <Table>
                        <TableBody>
                        {Object.keys(selectedRow).map((key) => {
                                  // List of keys to exclude
                                  const excludedKeys = ['id', 'createdAt', 'UserId', 'isapproved', 'updatedAt', 'remarks'];
                                  if (excludedKeys.includes(key)) {
                                    return null; // Skip rendering this key
                                  }
                                  return (
                                    <TableRow key={key}>
                                      <TableCell>{key[0].toUpperCase() + key.slice(1)}</TableCell>
                                      <TableCell>{selectedRow[key]}</TableCell>
                                    </TableRow>
                                  );
                          })}
                          {selectedRow.isapproved=== null && <TableRow>
                            <TableCell>Remarks</TableCell>
                            <TableCell style={{height: "100px"}}>
                              <Text
                                value={remarks} 
                                onChange={(e) => setRemarks(e.target.value)} 
                              />
                            </TableCell>
                          </TableRow>}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                  <Stack direction="row" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '30px' }}>
                    <Button variant="contained" color="success" disabled={selectedRow.isapproved !== null} onClick={() => { accept(selectedRow.id) }}>
                      Accept
                    </Button>
                    <Button variant="contained" color="error" disabled={selectedRow.isapproved !== null} onClick={() => { reject(selectedRow.id) }}>
                      Reject
                    </Button>
                    <Button variant="contained" color="warning" onClick={() => window.print()} >
                      Print
                    </Button>
                  </Stack>
                </Box>
              </div>
            )}
          </div>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

export default AdminViewTable;











