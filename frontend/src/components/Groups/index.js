import React, { Component, useState } from "react";
import Button from '@material-ui/core/Button';
import AddGroup from "./actions/add_group";
import GroupLayout from "./Group_layout"
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
                <Button variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }} onClick={() => { setOpenAddPost(true) }}>Add News groups</Button>

            </div>        {OpenAddPost && <AddGroup open={OpenAddPost} onClose={handleCloseAddPost} />}

            <GroupLayout />
        </>
    )

}