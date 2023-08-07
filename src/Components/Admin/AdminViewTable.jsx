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
import { BsCalendarCheck } from "react-icons/bs";
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

const VISIBLE_FIELDS = ['type', 'name', 'date', 'status', 'actions','remarks'];

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
  // const {}
  

  const fetchData = async () => {
    const param = {}
    if(selectedDate){
      console.log(selectedDate)
      console.log(moment(selectedDate.toString()).format('DD-MM-YYYY'));
     param.date = moment(selectedDate.toString()).format('DD-MM-YYYY')
    }
    try {
      const transportResponse = await axios.get('/transport/get',{params:param})
      const seminarResponse = await axios.get('/seminar/get',{params:param})
     const fullData=[...transportResponse.data.data,...seminarResponse.data.data]
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
    setIsCalOpen(true)
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
      
      <div style={{ height: "100%", width: '100%', backgroundColor: 'white', borderRadius:5, padding: 10 ,display:"flex"}}>

  
            <DataGrid
        rows={userData}
        columns={columns.map((column) => ({
          ...column,
          width: column.field === 'name' ? 150 : 150, // Customize the width as needed
        }))}
        components={{
          Toolbar: GridToolbar,
        }}
        style={{ maxHeight: '94%', maxWidth: '70%' }}
      />

       
        <div>   
      <div className='flex flex-col items-center p-2 py-0 '>
      <Button 
      variant="contained"
      size="small" 
       sx={{ height: '30px',width:'350px', display:"flex", gap: 1, fontSize: "14px"}}
       onClick={handleallbutton}

       >
          <span>Reset Date</span>
        <SettingsBackupRestore sx={{width:"18px"}} />

        </Button>
      </div>
         <AdminCalender />
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
                  </Stack>
                </Box>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default AdminViewTable;











