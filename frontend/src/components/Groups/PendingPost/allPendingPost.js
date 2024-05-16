import React, { Component, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import DoneIcon from '@material-ui/icons/Done';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 340,
    width: 300,
  },
  control: {
    padding: theme.spacing(5),
  },
}));

export default function AllPendingPost(props) {
  const [spacing, setSpacing] = useState(2);
  const [Storys, setStorys] = useState([]);


  const classes = useStyles();
  const BASE_URL_HTTP = process.env.REACT_APP_BASE_URL_HTPP;

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  const deletePost = (post) => {
    const x = localStorage.getItem('token')

    axios.delete(BASE_URL_HTTP + '/groups/admin/reject/' + post.id, {
      headers: {
        'Authorization': `token ${x}`,

      },

    }).then((res) => {

      let stroryfilterd = Storys.filter(el => el.id !== post.id)
      setStorys(stroryfilterd);
    })
  }

  const AcceptedPost = (post) => {
    const x = localStorage.getItem('token')

    axios.put(BASE_URL_HTTP + '/groups/admin/approve/' + post.id, {}, {
      headers: {
        'Authorization': `token ${x}`,

      },

    }).then((res) => {

      let stroryfilterd = Storys.filter(el => el.id !== post.id)
      setStorys(stroryfilterd);
    })
  }
  useEffect(() => {


    const x = localStorage.getItem('token')


    axios.get(BASE_URL_HTTP + '/groups/panding-posts/' + props.id, {
      headers: {
        'Authorization': `token ${x}`,

      },

    }).then((res) => {


      setStorys(
        res.data
      );
    }




      , (error) => { console.log(error.message, error.response) })
    return () => {

    };
  }, [])
  return (
    <Grid container className={classes.root} spacing={10}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {Storys.map((value, index) => (
            <Grid key={index} item xs={4}>
             
              <Card  variant="outlined" className={classes.paper}>
      <CardContent>
                <div className="Post-image-bg">
                
                  {value.file && <img src={BASE_URL_HTTP + value.file} width={"120px"} />}
                  {value.title && <p>Titel :  {value.title}  </p>}
                  {value.content && <p> Description : {value.content} </p>}
                  <p>Status : {value.status}</p>
                  <NavLink to={`/profile/${value.creator.user_name}`} style={{ textDecoration: 'none', cursor: 'pointer', color: 'black' }}>
                    <span>{value.creator.user_name}</span>
                  </NavLink>
                </div>
                </CardContent>
                <CardActions>
                <IconButton color={"inherit"} aria-label="delete" onClick={() => deletePost(value)}>
                    <DeleteForeverSharpIcon />
                  </IconButton>

                  <IconButton color={"inherit"} aria-label="delete" onClick={() => AcceptedPost(value)}>
                    <DoneIcon />
                  </IconButton>
                  </CardActions>
                </Card>
             
            </Grid>
          ))}
        </Grid>
      </Grid>

    </Grid>
  );
}
