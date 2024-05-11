import React, { useState, useEffect } from 'react';
import './home.css';
import Widget from '../../components/widgets/Widget';
import FeaturedChart from '../../components/featured/FeaturedChart';
import Chart from '../../components/chart/Chart';
import LineChart from '../../components/chart/LineChart';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
const Home = () => {
  const [statestique, setStatestique] = useState(14);
  const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;


  useEffect(() => {
    const x=localStorage.getItem('token')

      axios.get(`${BASE_URL_HTTP}/dashboard/dashboard`,{
          headers: {
              'Authorization': `token ${x}`,
            }}).then((res)=>{
              console.log(res.data)
              setStatestique(res.data);
      },(error)=>{console.log(error.message,error.response)})
    
  }, []); // Empty dependency array means this effect runs once on component mount

  // Render based on role state
  return  (
    <div className='home'>
    
      <div className='homeContainer'>
     
        <Box sx={{ flexGrow: 1, p: 2, m: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={5}>
              <Widget title={'Users'} type='Users' sxx={6} statestique={statestique.user_count} icon={  <AccountCircleIcon />}/>
            </Grid>
            <Grid item xs={6} md={5}>
              <Widget title={'Post'} type='Post' sxx={6} statestique={statestique.post_count} icon={<AssignmentIcon/>}/>
            </Grid>
          </Grid>
        </Box>
        <div className='charts'>
          <FeaturedChart statestique={statestique.traffic_by_gender} />
          <Chart statestique={statestique.traffic_by_location}/>
        </div>
        <div>
         <LineChart statestique={statestique.user_counts}/> 
        </div>
      </div>
    </div>
  
  );
};

export default Home;
