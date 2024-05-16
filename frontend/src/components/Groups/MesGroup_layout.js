import React, { Component, useEffect, useRef, useState } from "react";
import "../assests/post.css";

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import axios from "axios";

import { Avatar, Card, CardActions, CardContent, CardHeader, Paper, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing.unit,
    padding: '2px'
  },
  input: {
    display: 'none',
  },
}));







export default function GroupLayout(props) {
  const BASE_URL_HTTP = process.env.REACT_APP_BASE_URL_HTPP;
  const url = BASE_URL_HTTP + '/groups/groups'
  const classes = useStyles();
  const [Groups, setGoups] = useState();
  const [userCurrent, setmydata] = useState();
  const [PageCount, setPageCount] = useState(false);
  const x = localStorage.getItem('token');
  const handleScroll = () => {

    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight


  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    axios.get(`${BASE_URL_HTTP}/user/findCurrent`, {
      headers: {
        'Authorization': `token ${x}`,
      },

    }).then((res) => {
      setmydata(res.data)

    }
      , (error) => { console.log(error.message, error.response) })

    axios.get(url, {
      headers: {
        'Authorization': `token ${x}`,

      },

    }).then((res) => {
      setPageCount(true)

      setGoups(
        res.data,
      );



    }
      , (error) => { console.log(error.message, error.response) })
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [PageCount, setmydata, setGoups])




  return (
    <>


      {Groups && Groups.map((grs, index) => {
        var isvideo = true;
        return (

          <div key={index}>

            <article className="Post" >

              <header>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  alignContent="flex-between"
                  p={0}
                  m={0}
                  bgcolor="background.paper"

                >
                  <div className="Post-user">


                    <Avatar src={grs.userphoto} className={classes.large} />
                  </div>

                </Box>
              </header>
              <div className="Post-image">

                <div className="Post-image-bg">

                  {grs.photo_grp && <img src={BASE_URL_HTTP + grs.photo_grp} onError={(e) => { isvideo = true; e.target.onerror = null; e.target.src = ""; }} />}

                </div>

              </div>
              <NavLink to="">
                <div className="Post-caption" >
                  <div>Caption:{grs.name}</div>
                  <div>Description:{grs.description}</div>
                </div>
              </NavLink>
            </article>

          </div>

        )
      })

      }
      {!PageCount && <CircularProgress style={{ marginLeft: '50%' }} />}
      <br></br>

    </>
  )

}