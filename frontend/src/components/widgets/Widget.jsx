import React from 'react'
import './widget.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
const Widget = ({titel,type,sxx , statestique}) => {
  return (
    <Card sx={sxx}>
    <CardContent>
    <Box  spacing={3}>
          <Box direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Box spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {titel}
              </Typography>
              <Typography variant="h4">{type}</Typography>
            </Box>
         

      <div className="right">
      <Avatar sx={{ backgroundColor: 'red', height: '56px', width: '56px' }}>
              <AccountCircleIcon />
            </Avatar>
  <p>{statestique}</p>
      </div>
    
  
          </Box>
          </Box> 
          <span className="link">see all ...</span>
          </CardContent>
          </Card>
 
  )
}

export default Widget
