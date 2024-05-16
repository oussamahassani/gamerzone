import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { blue } from "@material-ui/core/colors";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    followButton: {
        marginLeft: 100,
    }
}));



export default function AddNewMember(props) {
    let history = useHistory();
    const { GroupId } = useParams();
    const BASE_URL_HTTP = process.env.REACT_APP_BASE_URL_HTPP;
    console.log(props)
    const x = localStorage.getItem('token')
    const classes = useStyles();

    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };

    const initialFormData = Object.freeze({
        id: '',

    });

    const [postData, updateFormData] = useState(initialFormData);

    const [show, setshow] = useState('none');
    const [see, setSee] = useState(false);
    function findArrayDifference(arr1, arr2) {
        // Extract unique identifiers (e.g., id) from array2
        const idsInArray2 = arr2.map(obj => obj.id);

        // Filter array1 to find objects not present in array2 based on unique identifier
        const difference = arr1.filter(obj => !idsInArray2.includes(obj.id));

        return difference;
    }

    const changeDetail = (event) => {



        updateFormData({
            ...postData,
            [event.target.name]: event.target.value,
        });


    };
    const post = (e) => {
        setshow('block');
        e.preventDefault();

        let formData = new FormData();
        formData.append('admin_id', postData.id);


        axios.post(`${BASE_URL_HTTP}/groups/groups/${GroupId}/add-admin`,
            formData
            , {
                headers: {
                    'Authorization': `token ${x}`,
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryGNvWKJmmcVAPkS3a',
                    accept: 'application/json',
                },

            }).then((res) => {
                alert(res.data.message)
                history.push('/groups/' + GroupId);

            }, (error) => { console.log(error.message, error.response) })
    }
    return (
        <>
            <LinearProgress style={{ display: show }} />
            <Dialog onClose={handleClose} open={open} style={{ minWidth: '400px', minHeight: '40%' }}>
                <DialogTitle >Add Post in group </DialogTitle>


                <TextField
                    required
                    autoFocus margin="dense" id="id" label="members" type="select" name="id"
                    onChange={changeDetail} value={postData.id}
                    fullWidth
                    select
                >
                    <option value={""}>choisir nouvaux admin</option>
                    {findArrayDifference(props.member, props.admin).map(el => <option value={el.id}>{el.user_name}</option>)}

                </TextField>


                <div>
                    <Button disabled={see} onClick={(e) => { post(e); setshow('block'); setSee(true) }}>Post</Button>
                    <CircularProgress style={{ display: see == false ? 'none' : 'block', marginBottom: '10px' }} />
                </div>
            </Dialog>



        </>
    )
}