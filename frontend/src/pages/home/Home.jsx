import React, { useState, useEffect } from 'react';
import './home.css';
import Widget from '../../components/widgets/Widget';
import FeaturedChart from '../../components/featured/FeaturedChart';
import Chart from '../../components/chart/Chart';
import LineChart from '../../components/chart/LineChart';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const Home = () => {
  const [statestique, setStatestique] = useState(14);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    
  }, []); // Empty dependency array means this effect runs once on component mount

  // Render based on role state
  return  (
    <div className='home'>
    
      <div className='homeContainer'>
     
        <Box sx={{ flexGrow: 1, p: 2, m: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={5}>
              <Widget title={'Users Stat'} type='Users' sxx={6} statestique={statestique} />
            </Grid>
            <Grid item xs={6} md={5}>
              <Widget title={'Ingenieurs'} type='Ingenieurs' sxx={6} statestique={statestique} />
            </Grid>
          </Grid>
        </Box>
        <div className='charts'>
          <FeaturedChart />
          <Chart />
        </div>
        <div>
          <LineChart />
        </div>
      </div>
    </div>
  
  );
};

export default Home;
