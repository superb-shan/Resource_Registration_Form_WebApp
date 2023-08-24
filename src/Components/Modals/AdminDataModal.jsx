import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Text from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { IoCloseCircleOutline } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import jsPDF from "jspdf";
import { toast } from 'react-toastify';
import moment from 'moment';

const AdminDataModal = ({...props}) => {

  const [remarks, setRemarks] = useState('');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #1976d2',
        boxShadow: 24,
        p: "1rem 2rem",
        borderRadius: 3,
        overflow:"auto",
        paddingTop:'5px',
        height:800
      };

    // const deleted = async (id) => {
    //     const res = await axios.delete(`/${props.selectedRow.type.toLowerCase()}/delete`, { params: { id } })
    //     console.log(res)
    //     props.fetchData()
    //     props.handleModalClose()
    //     if(res.data.message){
    //         toast.success(`${props.selectedRow?.type} Deleted Successfully`)
    //     }else{
    //     toast.error(res.data.message)
    //     }
    // }

    const generatePDF = () => {
      const pdf = new jsPDF();
    
      pdf.setFontSize(16);
      pdf.text("Sri Eshwar College of Engineering", 60, 25);
    
      if (props.selectedRow) {
        pdf.setFontSize(14);
        pdf.text("The Details of the Bookings are below , ", 20, 40);
    
        let yPos = 60;
        const lineHeight = 10; // Adjust this value to control the vertical spacing between lines
    
        const borderWidth = 1;
        const increasedHeight = yPos - 55 + borderWidth * 2 + 260;
    
        pdf.setDrawColor(3);
        pdf.setLineWidth(borderWidth);
        pdf.rect(10, 10, 180, increasedHeight, "S");
    
        for (const key of Object.keys(props.selectedRow)) {
          if (key === "id" || key === "createdAt" || key === "UserId" || key === "isapproved" || key === "updatedAt") {
            continue;
          }
    
          const formattedKey = key[0].toUpperCase() + key.slice(1);
          let formattedValue = ""; // Initialize formattedValue as an empty string
    
          if (typeof props.selectedRow[key] === "object") {
            formattedValue = moment(props.selectedRow[key]).format("YYYY-MM-DD HH:mm:ss");
          } else {
            formattedValue = props.selectedRow[key].toString(); // Convert to string
          }
    
          pdf.text(`${formattedKey} :`.padEnd(35, " "), 20, yPos);
          pdf.text(formattedValue, 90, yPos); // Adjust the x-coordinate as needed
          yPos += lineHeight;
        }
      }
    
      pdf.save("Resource_Registration.pdf");
    };

      const accept = async (id) => {
        await axios.patch(`/${props.selectedRow.type.toLowerCase()}/update`, { id, isapproved: 'true' ,remarks})
        props.fetchData()
        props.handleModalClose();
        toast.success('Accepted')
        setRemarks("");
    
      }
      const reject = async (id) => {
        if(remarks === ''){
          toast.error("Enter the Reason to Reject in Remarks Field")
        }else{
          await axios.patch(`/${props.selectedRow.type.toLowerCase()}/update`, {
          id,
          isapproved: 'false', 
          remarks
        });
        props.fetchData();
        props.handleModalClose();
        toast.error('Rejected');
        setRemarks("");
        }
      };

  return (
    <Modal open={props.isModalOpen} onClose={props.handleModalClose}>
        {/* Render the detailed information from props.selectedRow */}
        {props.selectedRow ? (
            <Box sx={style}>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={props.handleModalClose}  ><IoCloseCircleOutline /></Button>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
              Details
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TableContainer>
                <Table>
                  <TableBody>
                  {Object.keys(props.selectedRow).map((key) => {
                      // List of keys to exclude
                      const excludedKeys = ['id', 'createdAt', 'UserId', 'isapproved', 'updatedAt', 'remarks'];
                      if (excludedKeys.includes(key)) {
                        return null; // Skip rendering this key
                      }
                      return (
                        <TableRow key={key}>
                          <TableCell>{key[0].toUpperCase() + key.slice(1)}</TableCell>
                          <TableCell>{props.selectedRow[key]}</TableCell>
                        </TableRow>
                      );
                    })}
                    {props.selectedRow.isapproved=== null && <TableRow>
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
              <Button variant="contained" color="success" disabled={props.selectedRow.isapproved !== null} onClick={() => { accept(props.selectedRow.id) }}>
                Accept
              </Button>
              <Button variant="contained" color="error" disabled={props.selectedRow.isapproved !== null} onClick={() => { reject(props.selectedRow.id) }}>
                Reject
              </Button>
              <Button variant="contained" color="warning" onClick={generatePDF}  >
                Print
              </Button>
            </Stack>
          </Box>
        ):
        <div></div>}

    </Modal>
  )
}

export default AdminDataModal
