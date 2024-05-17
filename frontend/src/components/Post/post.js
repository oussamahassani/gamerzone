import React, { Component, useState } from "react";
import Button from '@material-ui/core/Button';
import PostLayout from "./post_layout";

import AddPost from "./actions/add_post";
import AddStory from "./actions/add_story"
export default function Post() {
  const BASE_URL_HTTP = process.env.REACT_APP_BASE_URL_HTPP;
  const parameters = {
    type: 'all',
    url: `${BASE_URL_HTTP}/posts/profile_post/ `
  }
  const [OpenAddPost, setOpenAddPost] = useState(false);
  const [OpenAddStory, setOpenAddStory] = useState(false)
  const handleCloseAddPost = () => {
    setOpenAddPost(false);

  };
  return (
    <>

      <div style={{ border: 'none' }}>
        <Button variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }} onClick={() => { setOpenAddPost(true) }}>Add Post</Button>
        <Button variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }} onClick={() => { setOpenAddStory(true) }}>Add Story</Button>

      </div>        {OpenAddPost && <AddPost open={OpenAddPost} onClose={handleCloseAddPost} />}
      {OpenAddStory && <AddStory open={OpenAddStory} onClose={handleCloseAddPost} />}

      <PostLayout params={parameters} />
    </>
  )

}