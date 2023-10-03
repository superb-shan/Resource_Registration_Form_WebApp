import React, { useContext, useState } from 'react'
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
import watermark from '../../Assets/Images/sriEshwarLogo.png'
import logo from '../../Assets/Images/logo.png'
import accepted from '../../Assets/Images/accepted.png'
import rejected from '../../Assets/Images/rejected.png'
import pending  from '../../Assets/Images/pending.png'
import autoTable from 'jspdf-autotable'
import { DataContext } from '../../Context/Data.Context';

const AdminDataModal = ({...props}) => {
 const selectedRow = props.selectedRow
  const [remarks, setRemarks] = useState('');
  const {terms}=useContext(DataContext)

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
        height:700
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
    const printData = []
      pdf.setFontSize(16);
      // pdf.text("Sri Eshwar College of Engineering", 60, 25);
      // var img = new Image()
      // img.src = '../../Images/download.png'
      // const logoPath = "/Users/jeethula/Desktop/project_sece/download.png";
      pdf.addImage(logo, "png", 50, 15, 100, 30);
    
      if (selectedRow) {
        pdf.setFontSize(14);
        pdf.setFont("Times")
        const formType = selectedRow["type"]
         pdf.text(`${formType} Booking Details  `, 15, 57);
    
        let yPos = 60;
        const lineHeight = 10; // Adjust this value to control the vertical spacing between lines
    
        const borderWidth = 1;
        const increasedHeight = yPos - 55 + borderWidth * 2 + 300;
    
        // pdf.setDrawColor(3);
        // pdf.setLineWidth(borderWidth);
        // pdf.rect(10, 10, 180, increasedHeight, "S");
    
        for (const key of Object.keys(selectedRow)) {
         
          if (key === 'id'||  key === "createdAt" || key === "UserId" || key === "isapproved" || key === "updatedAt"||key==='type') {
            continue;
          }
    
          const formattedKey = key[0].toUpperCase() + key.slice(1);
          let formattedValue = ""; // Initialize formattedValue as an empty string
          if(selectedRow[key] === null){
            continue ;
          }
         if(selectedRow[key] === ""){
          printData.push([formattedKey,"Nil"]) ;
          continue;
  }
          if (typeof selectedRow[key] === "object") {
            
            formattedValue = moment(selectedRow[key]).format("YYYY-MM-DD HH:mm:ss");
            printData.push([formattedKey,formattedValue])
          } else {
            formattedValue = selectedRow[key].toString(); // Convert to string
            printData.push([formattedKey,formattedValue])
          }
    
          
        }
        printData.push(["BookID",selectedRow["id"]])
      // pdf.autoPrint();
      autoTable(pdf, {
        margin: { top: 65 }, // Adjust top margin to create space above the table
          headStyles: { fillColor: [41, 128, 185], textColor: 255 }, // Header row style
          bodyStyles: { textColor: 0 }, // Body row style
          alternateRowStyles: { fillColor: 240 }, // Alternate row style
         styles:{
          
          valign:"middle",
       minCellHeight:10,
       overflow:"hidden"
         },
          columnStyles: {
              0: { cellWidth: 87 }, // Column 0 width
              1: { cellWidth: 95 }, // Column 1 width as 'auto'
          },
          body: printData,
         
      
     
      })
      
      const lastRowIndex = printData.length;
      const rowHeight = 10;
      const lastRowHeight = lastRowIndex >= 0 ? rowHeight : 0;
      
      // Calculate the coordinates and size for the background color
      const lastRowX = 10;
      const lastRowY = 90 + lastRowIndex * rowHeight;
      const lastRowWidth = 180;
      
      // Apply the background color as a rectangle
      if(selectedRow["isapproved"] === null){
        pdf.addImage(pending,'png',lastRowX +70,lastRowY-10,40,40)
      }
      else if(selectedRow["isapproved"] === 1){
        pdf.addImage(accepted,'png',lastRowX+70,lastRowY+10,40,40)
      }
      else if(selectedRow["isapproved"] === 0){
        pdf.addImage(rejected,'png',lastRowX+70,lastRowY-20,40,40)
      }
    //watermark
    pdf.saveGraphicsState();
    pdf.setGState(new pdf.GState({opacity: 0.05}));
    pdf.addImage(watermark,'png',60,100,80,80)
    pdf.restoreGraphicsState();;
    }
  
  window.open(pdf.output("bloburl"), "_blank","toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes,top=200,left=350,width=600,height=400");
  
  
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
                      const excludedKeys = ['id', 'createdAt', 'UserId', 'isapproved', 'updatedAt', 'type', 'name', 'travelDateTime', 'startDateTime', 'endDateTime'];
                      if (excludedKeys.includes(key)) {
                        return null; // Skip rendering this key
                      }
                      return (
                        <TableRow key={key}>
                          <TableCell>{terms[key[0].toUpperCase() + key.slice(1)]}</TableCell>
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
