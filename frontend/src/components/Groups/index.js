import React, { Component, useState,useEffect } from "react";
import Button from '@material-ui/core/Button';
import AddGroup from "./actions/add_group";
import GroupLayout from "./Group_layout"
import axios from 'axios';

export default function Post() {
    const BASE_URL_HTTP = process.env.REACT_APP_BASE_URL_HTPP;
    const parameters = {
        type: 'all',
        url: `${BASE_URL_HTTP}/posts/profile_post/ `
    }
    const [OpenAddPost, setOpenAddPost] = useState(false);
    const [mydata, setmydata] = useState(null)
    const [follower, setfollowers] = useState([])
    
    const handleCloseAddPost = () => {
        setOpenAddPost(false);

    };
useEffect(() => {
  



    const x = localStorage.getItem('token');
    axios.get(`${BASE_URL_HTTP}/user/findCurrent`, {
      headers: {
        'Authorization': `token ${x}`,
      },

    }).then((res) => {
      setmydata(res.data)
      axios.get(`${BASE_URL_HTTP}/user/followers_followings/${res.data.user_name}`, {
        headers: {
          'Authorization': `token ${x}`,

        },
        params: {
          type: 'followers',

        }
      }).then((res) => {
        setfollowers(res.data.followers);

      })
    }
      , (error) => { console.log(error.message, error.response) })
      return () => {
    
      }
    }, [])
    return (
        <>
            <div style={{ border: 'none' }}>
                {follower.length >= 4 && <Button variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }} onClick={() => { setOpenAddPost(true) }}>Add News groups</Button>}

            </div>        { OpenAddPost && <AddGroup open={OpenAddPost} onClose={handleCloseAddPost} />}

            <GroupLayout />
        </>
    )

}