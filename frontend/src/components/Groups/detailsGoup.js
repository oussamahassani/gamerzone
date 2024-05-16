import React, { Component, useState } from "react";
import Button from '@material-ui/core/Button';
import PostLayout from "./post_layout";
import AddPost from "./actions/add_postGroup";
import { useParams } from "react-router-dom";

export default function DetailsGroups() {
  const BASE_URL_HTTP = process.env.REACT_APP_BASE_URL_HTPP;
  const { GroupId } = useParams();
  const parameters = {
    type: 'all',
    url: `${BASE_URL_HTTP}/groups/group/posts/${GroupId}`
  }


  const [OpenAddPost, setOpenAddPost] = useState(false);
  const handleCloseAddPost = () => {
    setOpenAddPost(false);

  };
  return (
    <>
      <div style={{ border: 'none' }}>
        <Button variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }} onClick={() => { setOpenAddPost(true) }}>Add Post</Button>

      </div>        {OpenAddPost && <AddPost open={OpenAddPost} onClose={handleCloseAddPost} />}

      <PostLayout params={parameters} />
    </>
  )

}