import React, { useEffect, useState } from 'react'
import AnalyticsContainer from '../Containers/AnalyticsContainer';
import { Card, CardActionArea } from '@mui/material';
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material';
import DoughnutChart from './DoughnutChart';
import AreaSplineChart from './AreasplineChart';
import axios from 'axios';
import ReactLoading from 'react-loading';

const Analytics = () => {

    const [analyticsData, setAnalyticsData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let componentData;
    const getAnalytics = async () => {
        setIsLoading(true);
        try{
            const response = await axios.get('/analytics');
            const data = response.data;
            console.log(data)
            setAnalyticsData(data);
            componentData = Object.keys(data.AllBooking)?.map(name => ({
                name: name,
                data: data.AllBooking[name]
              
              }));
              console.log("componentData", componentData);
        }
        catch (e){
            console.error(e);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getAnalytics();
    },[]);
   // console.log(analyticsData, analyticsData.AllBooking)
   
  return (
    <AnalyticsContainer>
        {isLoading? 
            <div className='h-[80vh] flex justify-center items-center'>
                <ReactLoading width={50} height={50} type='spin' color='blue'/>
            </div>
            :
            <>
                {/* Card Container */}
                <div className='flex flex-col gap-[10px]'>
                    <div className='w-full flex justify-around text-white text-[12px]'>
                        <div className='w-[250px] h-[160px] rounded-[8px] bg-red-500 border-[1px] border-gray-600 shadow-xl hover:scale-110 ease-in-out duration-300'>
                            <CardActionArea sx={{height: '100%', p: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
                                <p>Most Used Seminar Hall <KeyboardDoubleArrowUp sx={{fontSize: '16px', mt: '-5px'}}/> </p>
                                <p className='w-[210px] text-xl font-medium overflow-hidden whitespace-nowrap text-ellipsis' title={'3rd Floor Drawing Hall'}>{analyticsData?.mostleastBooking?.seminar?.most?.name}</p>
                                <p className='text-5xl font-medium pt-1'>{analyticsData?.mostleastBooking?.seminar?.most?.value}</p>
                                <p>bookings this month</p>
                            </CardActionArea>
                        </div>
                        <div className='w-[250px] h-[160px] rounded-[8px] bg-blue-500 border-[1px] border-gray-600 shadow-xl hover:scale-110 ease-in-out duration-300'>
                            <CardActionArea sx={{height: '100%', p: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
                                <p>Most Used Seminar Hall <KeyboardDoubleArrowDown sx={{fontSize: '16px', mt: '-5px'}}/> </p>
                                <p className='w-[210px] text-xl font-medium overflow-hidden whitespace-nowrap text-ellipsis' title={'Ignite'}>{analyticsData?.mostleastBooking?.seminar?.least?.name}</p>
                                <p className='text-5xl font-medium pt-1'>{analyticsData?.mostleastBooking?.seminar?.least?.value}</p>
                                <p>bookings this month</p>
                            </CardActionArea>
                        </div>
                        <div className='w-[250px] h-[160px] rounded-[8px] bg-green-500 border-[1px] border-gray-600 shadow-xl hover:scale-110 ease-in-out duration-300'>
                            <CardActionArea sx={{height: '100%', p: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
                                <p>Most Used Seminar Hall <KeyboardDoubleArrowUp sx={{fontSize: '16px', mt: '-5px'}}/> </p>
                                <p className='w-[210px] text-xl font-medium overflow-hidden whitespace-nowrap text-ellipsis' title={'Amenities Guest Suite Bed 01'}>{analyticsData?.mostleastBooking?.guesthouse?.most?.name}</p>
                                <p className='text-5xl font-medium pt-1'>{analyticsData?.mostleastBooking?.guesthouse?.most?.value}</p>
                                <p>bookings this month</p>
                            </CardActionArea>
                        </div>
                        <div className='w-[250px] h-[160px] rounded-[8px] bg-yellow-500 border-[1px] border-gray-600 shadow-xl hover:scale-110 ease-in-out duration-300'>
                            <CardActionArea sx={{height: '100%', p: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
                                <p>Most Used Seminar Hall <KeyboardDoubleArrowDown sx={{fontSize: '16px', mt: '-5px'}}/> </p>
                                <p className='w-[210px] text-xl font-medium overflow-hidden whitespace-nowrap text-ellipsis' title={'D Block Room 23 Bed 01'}>{analyticsData?.mostleastBooking?.guesthouse?.least?.name}</p>
                                <p className='text-5xl font-medium pt-1'>{analyticsData?.mostleastBooking?.guesthouse?.least?.value}</p>
                                <p>bookings this month</p>
                            </CardActionArea>
                        </div>
                    </div>
                    <p className='text-[10px] ml-5 mt-3 italic'>* all the halls/houses with no bookings are ignored.</p>
                </div>

                {/* AreaSpline */}
                <div className='flex justify-evenly items-center'>
                    <div className='flex flex-col gap-[10px]'>
                        <p className='font-medium'>Number of Bookings</p>
                        <div className='w-[700px]'>
                            <AreaSplineChart data={
                                [componentData]
                                // analyticsData?.AllBooking
                            } 
                            />
                        </div>
                    </div>
                    <div className='w-[500px]'>
                        <DoughnutChart 
                            totalName="Departments"
                            data = {
                                [
                                    { name: "Debt", value: 20000 },
                                    { name: "Equity", value: 40000 },
                                    { name: "Hybrid", value: 30000 },
                                    { name: "Commodity", value: 5000 },
                                ]
                            }
                            height='300px'
                            startColor='#2EB62C'
                            endColor='#C5E8B7'
                        />
                    </div>
                </div>

                {/* Doughnut chart container */}
                <div>
                    <p className='font-medium my-[20px] ml-[50px]'>Specific Charts</p>
                    <div className='flex justify-evenly'>
                        <div className='w-[300px]'>
                            <DoughnutChart 
                                totalName="Hall/Lab Bookings"
                                data = {
                                    [
                                        { name: "Debt", value: 20000 },
                                        { name: "Equity", value: 40000 },
                                        { name: "Hybrid", value: 30000 },
                                        { name: "Commodity", value: 5000 },
                                    ]
                                }
                                startColor='#D22826'
                                endColor='#FF553D'
                            />
                        </div>
                        <div className='w-[300px]'>
                            <DoughnutChart 
                                totalName="Hall/Lab Bookings"
                                data = {
                                    [
                                        { name: "Debt", value: 20000 },
                                        { name: "Equity", value: 40000 },
                                        { name: "Hybrid", value: 30000 },
                                        { name: "Commodity", value: 5000 },
                                    ]
                                }
                                startColor='#e7a300'
                                endColor='#f9ffa1'
                            />
                        </div>
                        <div className='w-[300px]'>
                            <DoughnutChart 
                                totalName="Hall/Lab Bookings"
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
                        <div className='w-[300px]'>
                            <DoughnutChart 
                                totalName="Hall/Lab Bookings"
                                data = {
                                    [
                                        { name: "Debt", value: 20000 },
                                        { name: "Equity", value: 40000 },
                                        { name: "Hybrid", value: 30000 },
                                        { name: "Commodity", value: 5000 },
                                    ]
                                }
                                startColor='#552586'
                                endColor='#B589D6'
                            />
                        </div>
                    </div>
                </div>
            </>
        
    }
        
    </AnalyticsContainer>
  )
}

export default Analytics;
