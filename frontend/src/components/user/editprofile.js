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
    followButton:{
        marginLeft:100,
    }
  }));
  


export default function Editprofile (props){
    const BASE_URL_HTTP=process.env.REACT_APP_BASE_URL_HTPP;

    const x=localStorage.getItem('token')
    const classes = useStyles();
    
    const { onClose,  open } = props;

    const handleClose = () => {
      onClose();
    };
    
    const[PostImage,setPostImage]=useState(null);
    const[PreviewImage,setPreviewImage]=useState('');
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [role, setRole] = useState('');
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regionList, setRegionList] = useState([]);
    const[show,setshow]=useState('none');
    const [see,setSee] = useState(false);
    
    const changeDetail=(event)=>{
        
        if(event.target.name=='Image'){
                setPreviewImage(URL.createObjectURL(event.target.files[0]));
               
               setPostImage(event.target.files[0])   
        }
       
    };
    const post=(e)=>{
        setshow('block');
        e.preventDefault();
        let formData = new FormData();	
		formData.append('Image', PostImage);
        axios.put(`${BASE_URL_HTTP}/user/register`,
            formData
        , {
            headers: {
              'Authorization': `token ${x}`,
              'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryGNvWKJmmcVAPkS3a',
              accept: 'application/json',
            },
           
          }).then((res)=>{
            window.location.reload();

        },(error)=>{console.log(error.message,error.response)})
    }
    return( 
        <>
        <LinearProgress style={{display:show}}/>
        <Dialog onClose={handleClose}  open={open} style={{minWidth:'400px',minHeight:'40%'}}>
            <DialogTitle >Edit Photo</DialogTitle>
            <div>
                <input required accept="image/*"  name="Image" type="file" onChange={changeDetail}/>
            </div>
            <div>
                <img src={PreviewImage} style={{maxHeight:500,maxWidth:500}}/>
            </div>

         
          <div className="form-group">
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              
              />
          
            </label>
            <label className='second-container'>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              
              />
             
            </label>
          </div>
          <div className="form-group">
            <label className='long'>
              Nickname:
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
           
              />
          
            </label>
          </div>
          <div className="form-group">
            <label>
              Birth date:
              <input
                type="date"
                placeholder="Date de naissance"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                
              />
         
            </label>

          </div>
          <div className="form-group">
            <label className='long'>
              Region:
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Sélectionnez votre région</option>
                {regionList.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
           
            </label>
          </div>
          <div className="form-group">
            <label className='long'>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
          
              />
            
            </label>
          </div>
          <div className="form-group">
            <label className='long'>
              Password:
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            
              />
            
            </label>
          </div>
          <div className='button-settings'>
         
        </div>
            <div>
                <Button disabled={see} onClick={(e)=>{post(e);setshow('block');setSee(true)}}>Save</Button>
                <CircularProgress style={{display:see==false?'none':'block'}}/>
            </div>

        </Dialog>


    
        </>
    )
}