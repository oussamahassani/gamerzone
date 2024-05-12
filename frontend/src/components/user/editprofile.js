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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 660,
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
  const [regionList, setRegionList] = useState(["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kébili", "Kef", "Mahdia", "Manouba", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"]);
    const[show,setshow]=useState('none');
    const [see,setSee] = useState(false);
    
    useEffect(() => { 
      axios.get(`${BASE_URL_HTTP}/user/findCurrent`,{
          headers: {
              'Authorization': `token ${x}`,
              
            },
           
          }).then((res)=>{
            setRegion(res.data.location)
            setDateOfBirth(res.data.birthday)
            setNickname(res.data.user_name)
            setLastName(res.data.last_name)
            setFirstName(res.data.first_name)

          
      }
      ,(error)=>{console.log(error.message,error.response)})
      return () => {

      };
  }, [])
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

        if(password){
          formData.append('password', password);
        }
        if(firstName){
          formData.append('first_name', firstName);
        }
        if(lastName){
          formData.append('last_name', lastName);
        }  
        if(dateOfBirth){
          formData.append('birthday', dateOfBirth);
        } 
        if(region){
          formData.append('location', region);
        } 

      
        
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
        <Dialog onClose={handleClose}  open={open} style={{minWidth:'400px',minHeight:'40%' , padding:'20px' , margin:'20px'}}>
            <DialogTitle >Edit Photo</DialogTitle>
            <form  noValidate style={{minWidth:'400px',minHeight:'40%' , padding:'20px' , margin:'20px'}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
            <div>
                <input required accept="image/*"  name="Image" type="file" onChange={changeDetail}/>
            </div>
            <div>
                <img src={PreviewImage} style={{maxHeight:500,maxWidth:500}}/>
            </div>

            </Grid>
            <Grid item xs={6}>
            <TextField
                  autoComplete="FirstName"
                  name="FirstName"
                  variant="outlined"
                  required
                  fullWidth
                  id=" FirstName"
                  label=" First Name"
                  autoFocus
                  value={firstName}
                  onChange={event => setFirstName(event.target.value)}
                />
                  </Grid>
                  <Grid item xs={6}>
            <TextField
                  autoComplete="LastName"
                  name="LastName"
                  variant="outlined"
                  required
                  fullWidth
                  id=" LastName"
                  label="Last Name"
                  autoFocus
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
                />
                  </Grid>
                  <Grid item xs={6}>
            <TextField
                  autoComplete="Nickname"
                  name="Nickname"
                  variant="outlined"
                  required
                  fullWidth
                  id="Nickname"
                  label="Nickname"
                  autoFocus
                  value={nickname}
                  redonly
                  onChange={event => setNickname(event.target.value)}
                />
                  </Grid>
                  <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="birthday"
                  label="birthday"
                  type='date'
                  value={dateOfBirth}
                  id="birthday"
                  autoComplete="current-birthday"
                  onChange={event => setDateOfBirth(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <div >
                  <TextField required fullWidth select label="select Location"
                    name="location" value={region} onChange={(event) => setRegion(event.target.value)} >
                    <option value="">Sélectionnez votre région</option>
                    {regionList.map((region, index) => (
                      <option key={index} value={region}>{region}</option>
                    ))}
                  </TextField>

                </div>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={event => setPassword(event.target.value)}
                />
              </Grid>
    
              </Grid>
            <div>
                <Button disabled={see} onClick={(e)=>{post(e);setshow('block');setSee(true)}}>Save</Button>
                <CircularProgress style={{display:see==false?'none':'block'}}/>
            </div>
            </form>
        </Dialog>


    
        </>
    )
}