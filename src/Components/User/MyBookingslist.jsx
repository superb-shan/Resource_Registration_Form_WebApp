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
import { useContext } from 'react';
import { Empty } from 'antd';
import ReactLoading from 'react-loading';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BsCalendarCheck } from "react-icons/bs";
import UserCalender from './MyBookingCalender';
import moment from 'momnet';
import { UserContext } from '../../Context/User.Context';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const VISIBLE_FIELDS = ['type', 'name', 'date', 'status', 'actions'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 4,
  borderRadius: 3
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

function MyBookingslist() {

  // const {setSelectedView,setSelectedForm} = useContext(UserContext)
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState([])
  const [isCalOpen, setIsCalOpen] = React.useState(false);
  const[isAdd,setIsAdd]=useState(false)
  const { userName ,selectedDate, setSelectedDate} = useContext(UserContext)

  // const fetchData = async () => {
  //   console.log(selectedDate)
  //   try {
  //     const param = {}
  //     param["name"] =userName
  //     if(selectedDate){
  //       console.log(moment(selectedDate.toString()).format('DD-MM-YYYY'));
  //      param.date = moment(selectedDate.toString()).format('DD-MM-YYYY')
  //     }
      
  //     console.log(userName)
  //     const response = await axios.get('http://localhost:8000/transport/get', { params: { param} })
  //     console.log(response.data.data)
  //     setUserData(response.data.data)
  //     setTimeout(() => setIsLoading(false), 1000)

  //   }
  //   catch (error) {
  //     console.log("Error", error)
  //   };

  // }

  const fetchData = async () => {
    const param = {}
    param["name"] =userName
    if(selectedDate){
      console.log(moment(selectedDate.toString()).format('DD-MM-YYYY'));
     param.date = moment(selectedDate.toString()).format('DD-MM-YYYY')
    }
    try {
      const response = await axios.get('http://localhost:8000/transport/get',{params:param})
      console.log(response.data.data)
      setUserData(response.data.data)
      setTimeout(() => setIsLoading(false), 500)
      console.log("hh")

    }
    catch (error) {
      console.log("Error", error)
    };

  }

  const deleted = async (id) => {
    const res = await axios.delete('http://localhost:8000/transport/delete', { params: { id } })
    console.log(res)
    fetchData()
    handleClose()
    toast.error(res.data.message)
  }

  // const edit = async (id) => {
  // const res = await axios.patch('http://localhost:8000/transport/update', { id, isapproved: 'false' })
  // console.log(res)
  // fetchData()
  // handleClose()
  // }

  useEffect(() => {

    fetchData()
    console.log('hai')
    if (selectedDate === null && isAdd) {
      fetchData();
      setIsAdd(false);
    }
  }, [setSelectedDate,isAdd]);
  
  const handleOpen = (rowData) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };

  const handleallbutton = () => {
    setSelectedDate(null);
    setIsAdd(true); 
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

  const columns = VISIBLE_FIELDS.map((field) => {

    if (field === 'actions') {
      return {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <Button variant="contained" sx={{ width: "100px", fontSize: "12px" }} onClick={() => handleOpen(params.row)}>
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
                  success
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
  if (!userData) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%', minWidth: '100%', backgroundColor: 'white' }}>
       
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        description={<span style={{marginLeft:'-20px'}}>No data found on the selected date </span>}
      >
        
        <Button 
      variant="contained"
       color="warning" size="small" 
       sx={{ width: '50px', height: '30px',marginTop:"5px",marginRight:'50px' }}
       onClick={handleallbutton}
       >
          RETURN
        </Button>
        
      </Empty>
    </div>

  }

  return (
    <ThemeProvider theme={theme}>

      <div style={{ height: "100%", width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 10, display: 'flex', justifyContent: "center", alignItems: "center" }}>
     
        {isLoading ?
          <ReactLoading type={"spin"} color='#0D6EFD' height={'10%'} width={'10%'} />
          :
          <div style={{ height: "100%", width: '100%', backgroundColor: 'white', borderRadius:5, padding: 10 }}>
      <div style={{display:"flex",justifyContent:"end"}}>
      <Button 
      variant="contained" 
      color="warning" 
      size="small" 
      sx={{ width: '50px', height: '30px',marginTop:"5px" }}
      onClick={handleallbutton}
      >
          ALL
        </Button>
        <Button onClick={handleCalender} >
          <BsCalendarCheck   style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}/>
          </Button>
      </div>
            <DataGrid
              rows={userData}
              columns={columns}
              components={{
                Toolbar: GridToolbar,
              }}
            />

            {isCalOpen && (
              <Modal open={true} onClose={handleClose} sx={Calstyle}>
                <div>
                <UserCalender />
                </div>
              </Modal>
            )}

                  <Modal open={isOpen} onClose={handleClose}>
              <div>
                {/* Render the detailed information from selectedRow */}
                {selectedRow && (
                  <div >
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
                              <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{selectedRow.type}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{selectedRow.name}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>{selectedRow.number}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Purpose</TableCell>
                                <TableCell>{selectedRow.purpose}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>{selectedRow.date}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell>{selectedRow.time}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>PickUp Location</TableCell>
                                <TableCell>{selectedRow.pickUp}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Drop Location</TableCell>
                                <TableCell>{selectedRow.drop}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>No of Passengers</TableCell>
                                <TableCell>{selectedRow.passengerCount}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Special Requirement</TableCell>
                                <TableCell>{selectedRow.specialRequirements}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Typography>
                      <Stack direction="row" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '30px' }}>
                        {/* <Button variant="contained" color='warning' style={{width:"90px"}} disabled={selectedRow.isapproved !== null} onClick={() => { edit(selectedRow.id) }}>
                      Edit
                    </Button> */}
                        <Button variant="contained" color="error" style={{ width: "90px" }} disabled={selectedRow.isapproved !== null} onClick={() => { deleted(selectedRow.id) }}>
                          Cancel
                        </Button>
                      </Stack>
                    </Box>
                  </div>
                )}
              </div>
            </Modal>
          </div>
        }
      </div>
      
    </ThemeProvider>
  );
}

export default MyBookingslist;











