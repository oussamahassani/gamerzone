import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

let  data = [

];




export default function Chart({statestique}) {
  if(statestique){
    for (const [key, value] of Object.entries(statestique)) {
      data.push({ name: value["year"]+"-"+ value["month"], user: value["count"] });
    }
  }
 console.log(data)
  
  return (
    <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
        user by date
    </Typography>
    
     
      <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
        
          data={data}
          margin={{
            top: 5,
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
          <Line type="monotone" dataKey="user" stroke="#8884d8" strokeDasharray="5 5" />
        </LineChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
}