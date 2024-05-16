import React, { Component, useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import PostLayout from "./post_layout";
import AddPost from "./actions/add_postGroup";
import AddNewNember from "./actions/add_newMember"
import { useParams } from "react-router-dom";
import axios from "axios";
import AllPendingPost from "./PendingPost/allPendingPost"
export default function DetailsGroups() {
  const BASE_URL_HTTP = process.env.REACT_APP_BASE_URL_HTPP;
  const { GroupId } = useParams();
  const x = localStorage.getItem('token')

  const parameters = {
    type: 'all',
    url: `${BASE_URL_HTTP}/groups/approved-posts/${GroupId}`
  }



  const [OpenAddPost, setOpenAddPost] = useState(false);
  const [OpenNewNembers, setOpenNewNembers] = useState(false);
  const [mydata, setmydata] = useState([]);

  const [InfoGroup, setlInfo] = useState(null);
  useEffect(() => {

    axios.get(`${BASE_URL_HTTP}/groups/GroupByIdAPIView/${GroupId}`, {
      headers: {
        'Authorization': `token ${x}`,
      },

    }).then((res) => {


      setlInfo(res.data);
    })
      .catch(error => { console.log('err', error); alert(error.response) })
      axios.get(`${BASE_URL_HTTP}/user/findCurrent`, {
        headers: {
          'Authorization': `token ${x}`,
        },
  
      }).then((res) => {
        setmydata(res.data)
  
      }
        , (error) => { console.log(error.message, error.response) })
    return () => {

    }
  }, [])
  const findIsExisteInSupperAdmin = (group, currentUser) => {
    if (currentUser) {
      console.log(currentUser)
      let isexite = group.filter(el => el.user_name == currentUser.user_name)
      console.log(isexite)

      if (isexite.length > 0)
        return true
      else
        return false
    }
    return false
  }
  const handleCloseAddPost = () => {
    setOpenAddPost(false);

  };
  return (
    <>
      <div style={{ border: 'none' }}>
        <Button variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }} onClick={() => { setOpenAddPost(true) }}>Add Post</Button>
        {InfoGroup && findIsExisteInSupperAdmin(InfoGroup.admin,mydata) &&  <Button variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }} onClick={() => { setOpenNewNembers(true) }}>Add New Members</Button>}

      </div>        {OpenAddPost && <AddPost open={OpenAddPost} onClose={handleCloseAddPost} />}
      {OpenNewNembers && <AddNewNember member={InfoGroup.members} admin={InfoGroup.admin} open={OpenNewNembers} onClose={setOpenNewNembers} />}
      {InfoGroup && findIsExisteInSupperAdmin(InfoGroup.admin,mydata) && <AllPendingPost id={GroupId} /> }
      <PostLayout params={parameters} />
    </>
  )

}