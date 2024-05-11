import React from 'react'
import './widget.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const Widget = ({titel,type,sxx , statestique, icon}) => {
  return (
    <Card sx={sxx}>
    <CardContent>
 
    <Box  spacing={3}>
          <Box direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Box spacing={1}>
            <Grid container justifyContent="center" spacing={"10"}>
       
            <Grid key={"1"} item>
            <Typography color="text.secondary" variant="overline">
                {titel}
              </Typography>
            </Grid>
            <Grid key={"2"} item>
            <Avatar sx={{ backgroundColor: 'red', height: '56px', width: '56px' }}>
            
            {icon}
          </Avatar>
            </Grid>
        </Grid>
           
              <Typography variant="h4">{type}</Typography>
            </Box>
         

      <div className="right">
      
  <p>{statestique}</p>
      </div>
    
  
          </Box>
          </Box> 
          
          </CardContent>
          </Card>
 
  )
}

export default Widget
