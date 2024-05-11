import './featuredchart.css';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import Typography from '@material-ui/core/Typography';

const FeaturedChart = ({ statestique }) => {

  
  let data01 = [
    { name: 'Group A', value: 0 },
    { name: 'Group B', value: 0 },
  
  ];
  if(statestique){
    for (const [key, value] of Object.entries(statestique)) {
      data01.push({ name: key, value: value });
    }
  }

  
      return (
        <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
        traffic by gender
    </Typography>
    
     
      <div style={{ width: '600px', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
      
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        </div>
    </React.Fragment>
      );
    }
  


export default FeaturedChart;
