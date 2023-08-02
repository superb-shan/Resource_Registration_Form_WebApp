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
import {IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useState ,useEffect} from 'react';


const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const VISIBLE_FIELDS = ['type', 'name', 'date', 'actions'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AdminViewTable() {


  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const[isLoading,setisloading]=useState(true)
  const [userData,setuserData]=useState([])

  const fetechData= async ()=>{
    try{
      const response= await axios.get('http://localhost:8000/transport/get',{params:{name:'g2'}})
      console.log(response.data.data)
      setuserData(response.data.data)
      setisloading(false)
    }
      catch(error)
      {
        console.log("Error", error)
      };

  }


  const accept = async(id)=>{
    const res = await axios.patch('http://localhost:8000/transport/update',{id,isapproved:'true'})
    console.log(res)
    fetechData()
    handleClose()
  }
  const reject = async(id)=>{
    const res = await axios.patch('http://localhost:8000/transport/update',{id,isapproved:'false'})
    console.log(res)
    fetechData()
    handleClose()
  }
  useEffect(()=>{
    
    fetechData()
  
  },[])


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
          <Button variant="contained"  onClick={() => handleOpen(params.row)}>
            Show more
          </Button>
        ),
      };
    }

    return {
      field,
      headerName: field,
      width: 200,
    };
  });
    if(isLoading){
      return <div>Loading...</div>
    }
  return (
    <ThemeProvider theme={theme}>
    <div style={{ height: 400, width: '100%' }}>
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
                <div style={{textAlign:'right'}}>
    <Button onClick={handleClose}  ><IoCloseCircleOutline/></Button>
    </div>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:'center'}}>
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
          <Stack direction="row" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '10px' }}>
  <Button variant="contained" color="success" disabled={selectedRow.isapproved !== null} onClick={()=>{accept(selectedRow.id)}}>
    Accept
  </Button>
  <Button variant="contained" color="error"  disabled={selectedRow.isapproved !== null} onClick={()=>{reject(selectedRow.id)}}>
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











