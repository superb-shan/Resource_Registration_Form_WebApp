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
import {CheckCircleOutline, HighlightOff, PendingOutlined, SettingsBackupRestore } from '@mui/icons-material';
import { useContext } from 'react';
import { Empty } from 'antd';
import ReactLoading from 'react-loading';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BsCalendarCheck } from "react-icons/bs";
import UserCalender from './MyBookingCalender';
import moment from 'moment';
import { UserContext } from '../../Context/User.Context';
import { LoginContext } from '../../Context/Login.Context';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const VISIBLE_FIELDS = ['type', 'name', 'date', 'status', 'actions','remarks'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 800,
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  overflow:"auto",
  paddingTop:'5px'
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
  const { selectedDate, setSelectedDate } = useContext(UserContext)
  const { userName } = useContext(LoginContext)


  const fetchData = async () => {
    const param = {}
    param["name"] =userName
    if(selectedDate){
      console.log(moment(selectedDate.toString()).format('DD-MM-YYYY'));
     param.date = moment(selectedDate.toString()).format('DD-MM-YYYY')
    }
    try {
      
       const transportResponse = await axios.get('/transport/get',{params:param})
       const seminarResponse = await axios.get('/seminar/get',{params:param})
      const fullData=[...transportResponse.data.data,...seminarResponse.data]
      setUserData(fullData)
      setTimeout(() => setIsLoading(false), 500)
    }
    catch (error) {
      console.log("Error", error)
    };
  }

  const deleted = async (id) => {
    const res = await axios.delete(`/${selectedRow.type.toLowerCase()}/delete`, { params: { id } })
    console.log(res)
    fetchData()
    handleClose()
    if(res.data.message){
      toast.success(`${selectedRow?.type} Deleted Successfully`)
    }else{
    toast.error(res.data.message)
  }
  }

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
                <PendingOutlined style={{ marginRight: 4, color: 'orange' }} />
                <Typography variant="body1" style={{ color: 'orange' }}>
                  Pending
                </Typography>
              </>
            )}
            {params.row.isapproved === true && (
              <>
                <CheckCircleOutline style={{ color: 'green', marginRight: 4 }} />
                <Typography variant="body1" style={{ color: 'green' }}>
                  success
                </Typography>
              </>
            )}
            {params.row.isapproved === false && (
              <>
                <HighlightOff style={{ color: 'red', marginRight: 4 }} />
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
        description={<span style={{marginLeft:'-20px'}}>No data found to show </span>}
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

  return (
    <ThemeProvider theme={theme}>

      <div style={{ height: "100%", width: '100%', backgroundColor: 'white', borderRadius: 5, padding: 10, display: 'flex', justifyContent: "center", alignItems: "center" }}>
     
        {isLoading ?
          <ReactLoading type={"spin"} color='#1976d2' height={'5%'} width={'5%'} />
          :
          <div style={{ height: "100%", width: '100%', backgroundColor: 'white', borderRadius:5, padding: 10 }}>
            <Box style={{display:"flex",justifyContent:"end"}}>
              <Button 
                variant="contained"  
                size="small" 
                sx={{ height: '30px',marginTop:"5px", display:"flex", gap: 1, fontSize: "14px" }}
                onClick={handleallbutton}
              >
                <span>ALL</span>
                <SettingsBackupRestore sx={{width:"18px"}} />
              </Button>
              <Button onClick={handleCalender} >
                <BsCalendarCheck   style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}/>
              </Button>
            </Box>
            <DataGrid
              rows={userData}
              columns={columns}
              components={{
                Toolbar: GridToolbar,
              }}
              sx={{maxHeight: {xs: "90%", md: "94%"}}}
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
                                {Object.keys(selectedRow).map((key) => {
                                  // List of keys to exclude
                                  const excludedKeys = ['id', 'createdAt', 'UserId', 'isapproved', 'updatedAt'];
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
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Typography>
                        <Stack direction="row" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '30px' }}>
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











