import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import 'react-toastify/dist/ReactToastify.css';

const DataGridTable = ({...props}) => {

  const columns = props.VISIBLE_FIELDS.map((field) => {
    if (field === 'actions') {
      return {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <Button variant="contained" sx={{width:"100px", fontSize: "12px"}} onClick={() => props.handleModalOpen(params.row)}>
            Show more
          </Button>
        ),
      };
    }

    // console.log(props.VISIBLE_FIELDS, props.gridData, columns);

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
                  Accepted
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

  return (
    <>
      <DataGrid
        rows={
          props.gridData.map(
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
                (!props.customActiveTypeFilter || item.type === props.customActiveTypeFilter) &&
                (   props.customActiveStatusFilter === "Pending" ? item.isapproved === null :
                    props.customActiveStatusFilter === "Accepted" ? item.isapproved :
                    props.customActiveStatusFilter === "Rejected" ? item.isapproved === false :
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
      {props.modal}
    </>
  )
}

export default DataGridTable
