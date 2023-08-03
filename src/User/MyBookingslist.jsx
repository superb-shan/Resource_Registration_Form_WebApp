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
import { LoginContext } from '../Context/Login.Context';
import { Empty } from 'antd';
import { UserContext } from '../Context/User.Context';
import UserWrapper from './UserWrapper';
import ReactLoading from 'react-loading';

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

function MyBookingslist() {

const {setSelectedView,setSelectedForm} = useContext(UserContext)
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState([])
  const{userName} = useContext(LoginContext)

  const fetchData = async () => {
    try {
        console.log(userName)
      const response = await axios.get('http://localhost:8000/transport/get',{params:{name:userName}})
      console.log(response.data.data)
      setUserData(response.data.data)
      setIsLoading(false)

    }
    catch (error) {
      console.log("Error", error)
    };

  }

  const deleted = async (id) => {
    const res = await axios.delete('http://localhost:8000/transport/delete', { params:{id}})
    console.log(res)
    fetchData()
    handleClose()
  }
  const edit = async (id) => {
    // const res = await axios.patch('http://localhost:8000/transport/update', { id, isapproved: 'false' })
    // console.log(res)
    // fetchData()
    // handleClose()
  }
  useEffect(() => {

    fetchData()

  }, [])


  const handleOpen = (rowData) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedRow(null);
    setIsOpen(false);
  };

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
  if(!userData){
    return<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%',minWidth:'100%',backgroundColor:'white' }}>
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      description={<span>No data found.... Click to generate</span>}
    >
      <Button type="primary" variant='contained' onClick={()=> {}}>Create Now</Button>
    </Empty>
  </div>
  
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <ThemeProvider theme={theme}>

      <div style={{ height: "100%", width: '100%', backgroundColor: 'white', borderRadius:5, padding: 10 }}>
        <DataGrid
          rows={userData}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
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
                    <Button variant="contained" color="error" style={{width:"90px"}} disabled={selectedRow.isapproved !== null} onClick={() => { deleted(selectedRow.id) }}>
                      Cancel
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

export default MyBookingslist;











