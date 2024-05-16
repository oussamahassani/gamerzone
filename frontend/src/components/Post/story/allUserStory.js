import React, { Component, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function AllUserStory() {
  const [spacing, setSpacing] = useState(2);
  const [Storys, setStorys] = useState([]);


  const classes = useStyles();
  const BASE_URL_HTTP = process.env.REACT_APP_BASE_URL_HTPP;

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  const deleteStory = (story) => {
    const x = localStorage.getItem('token')

    axios.delete(BASE_URL_HTTP + '/story/stories/' + story.id, {
      headers: {
        'Authorization': `token ${x}`,

      },

    }).then((res) => {
      console.log("storys", res)
      let stroryfilterd = Storys.filter(el => el.id !== story.id)
      setStorys(stroryfilterd);
    })
  }
  useEffect(() => {


    const x = localStorage.getItem('token')


    axios.get(BASE_URL_HTTP + '/story/stories', {
      headers: {
        'Authorization': `token ${x}`,

      },

    }).then((res) => {
      console.log("storys", res)
      if (Storys.length == 0) {
        setStorys(
          res.data
        );
      }
      else {

        setStorys([...Storys, ...res.data]);
      }


    }
      , (error) => { console.log(error.message, error.response) })
    return () => {

    };
  }, [])
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {Storys.map((value, index) => (
            <Grid key={index} item>
              <Paper className={classes.paper} >

                <div className="Post-image-bg">
                  <IconButton color={"inherit"} aria-label="delete" onClick={() => deleteStory(value)}>
                    <DeleteForeverSharpIcon />
                  </IconButton>
                  {value.media_file && <img src={BASE_URL_HTTP + value.media_file} width={"120px"} />}
                  <NavLink to={`/profile/${value.user.user_name}`} style={{ textDecoration: 'none', cursor: 'pointer', color: 'black' }}>
                    <span>{value.user.user_name}</span>
                  </NavLink>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>

    </Grid>
  );
}
