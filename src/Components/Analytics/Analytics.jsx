import React from 'react'
import AnalyticsContainer from '../Containers/AnalyticsContainer';
import { Card, CardActionArea } from '@mui/material';
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material';
import DoughnutChart from './DoughnutChart';
import AreaSplineChart from './AreasplineChart';

const Analytics = () => {
  return (
    <AnalyticsContainer>
        {/* Card Container */}
        <div className='w-full flex justify-around text-white text-[12px]'>
            <div className='w-[250px] h-[160px] rounded-[8px] bg-red-500 border-[1px] border-gray-600 shadow-xl hover:scale-110 ease-in-out duration-300'>
                <CardActionArea sx={{height: '100%', p: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
                    <p>Most Used Seminar Hall <KeyboardDoubleArrowUp sx={{fontSize: '16px', mt: '-5px'}}/> </p>
                    <p className='w-[210px] text-xl font-medium overflow-hidden whitespace-nowrap text-ellipsis' title={'3rd Floor Drawing Hall'}>3rd Floor Drawing Hall</p>
                    <p className='text-5xl font-medium pt-1'>25</p>
                    <p>bookings this month</p>
                </CardActionArea>
            </div>
            <div className='w-[250px] h-[160px] rounded-[8px] bg-blue-500 border-[1px] border-gray-600 shadow-xl hover:scale-110 ease-in-out duration-300'>
                <CardActionArea sx={{height: '100%', p: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
                    <p>Most Used Seminar Hall <KeyboardDoubleArrowDown sx={{fontSize: '16px', mt: '-5px'}}/> </p>
                    <p className='w-[210px] text-xl font-medium overflow-hidden whitespace-nowrap text-ellipsis' title={'Ignite'}>Ignite</p>
                    <p className='text-5xl font-medium pt-1'>2</p>
                    <p>bookings this month</p>
                </CardActionArea>
            </div>
            <div className='w-[250px] h-[160px] rounded-[8px] bg-green-500 border-[1px] border-gray-600 shadow-xl hover:scale-110 ease-in-out duration-300'>
                <CardActionArea sx={{height: '100%', p: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
                    <p>Most Used Seminar Hall <KeyboardDoubleArrowUp sx={{fontSize: '16px', mt: '-5px'}}/> </p>
                    <p className='w-[210px] text-xl font-medium overflow-hidden whitespace-nowrap text-ellipsis' title={'Amenities Guest Suite Bed 01'}>Amenities Guest Suite Bed 01</p>
                    <p className='text-5xl font-medium pt-1'>15</p>
                    <p>bookings this month</p>
                </CardActionArea>
            </div>
            <div className='w-[250px] h-[160px] rounded-[8px] bg-yellow-500 border-[1px] border-gray-600 shadow-xl hover:scale-110 ease-in-out duration-300'>
                <CardActionArea sx={{height: '100%', p: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
                    <p>Most Used Seminar Hall <KeyboardDoubleArrowDown sx={{fontSize: '16px', mt: '-5px'}}/> </p>
                    <p className='w-[210px] text-xl font-medium overflow-hidden whitespace-nowrap text-ellipsis' title={'D Block Room 23 Bed 01'}>D Block Room 23 Bed 01</p>
                    <p className='text-5xl font-medium pt-1'>0</p>
                    <p>bookings this month</p>
                </CardActionArea>
            </div>
        </div>
        <div className='flex gap-[20px]'>
            <div className='w-[500px]'>
                <DoughnutChart 
                    totalName="Total AUM"
                    data = {
                        [
                            { name: "Debt", value: 20000 },
                            { name: "Equity", value: 40000 },
                            { name: "Hybrid", value: 30000 },
                            { name: "Commodity", value: 5000 },
                        ]
                    }
                />
            </div>
            <div className='w-[500px]'>
                <AreaSplineChart data={[
  {
    name: "Graph 1",
    data: [
      { month: 1, value: 10000 },
      { month: 2, value: 20000 },
      { month: 3, value: 5000 },
      // Add more data points as needed
    ],
  },
  {
    name: "Graph 2",
    data: [
      { month: 1, value: 15000 },
      { month: 2, value: 25000 },
      { month: 3, value: 7000 },
      // Add more data points as needed
    ],
  },
]} />
            </div>
        </div>
        
        
    </AnalyticsContainer>
  )
}

export default Analytics;
