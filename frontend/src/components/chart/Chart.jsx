import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css'
import Typography from '@material-ui/core/Typography';


const Chart = ({ statestique }) => {
let data = [
  {
    name: 'Page A',
    pv: 0,
   
  },

];
if(statestique){
  for (const [key, value] of Object.entries(statestique)) {
    data.push({ name: key, pv: value });
  }
}


  return (
    <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
        traffic by location
    </Typography>
    
     
      <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />

        </BarChart>
      </ResponsiveContainer>
    </div>
    </React.Fragment>
  )
}

export default Chart
