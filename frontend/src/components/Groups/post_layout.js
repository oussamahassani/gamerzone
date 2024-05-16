import React, { Component, useEffect, useRef, useState } from "react";
import "../assests/post.css";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';
import { Avatar, Card, CardActions, CardContent, CardHeader, Paper, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import ForumIcon from '@material-ui/icons/Forum';

import Box from '@material-ui/core/Box';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      maginTop:"25px",
      paddingTop:"25px"
    },
  },
  button: {
    margin: theme.spacing.unit,
    padding: '2px'
  },
  input: {
    display: 'none',
  },
}));







export default function PostLayout(props) {
  const BASE_URL_HTTP = process.env.REACT_APP_BASE_URL_HTPP;
  const params = props.params
  const url = props.params.url
  const classes = useStyles();
  const [Posts, setPosts] = useState();
  const [isLiked, setisLiked] = useState({});
  const [likedCount, setlikedCount] = useState({});
  const [PageCount, setPageCount] = useState(1);
  const [totalpageCnt, settotalpageCnt] = useState(PageCount + 1);
  const x = localStorage.getItem('token');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };



  const handleScroll = () => {

    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

    if (bottom && (PageCount < totalpageCnt)) {
      setPageCount(PageCount + 1);
    }
  };
  const likeDislike = (id) => {
    if (isLiked[id] == 1) {
      axios.delete(`${BASE_URL_HTTP}/posts/like_dislike`, {
        headers: {
          'Authorization': `token ${x}`,
        },
        data: {
          post_id: id,
        }
      }).then((res) => {

        setisLiked({ ...isLiked, [id]: 0 });
        setlikedCount({ ...likedCount, [id]: likedCount[id] - 1 });
      }, (error) => { console.log(error.message, error.response) })
        .catch(err => console.log(err))

    }
    else {
      axios.post(`${BASE_URL_HTTP}/posts/like_dislike`, { post_id: id }, {
        headers: {
          'Authorization': `token ${x}`,
        },

      }).then((res) => {

        setisLiked({ ...isLiked, [id]: 1 });
        setlikedCount({ ...likedCount, [id]: likedCount[id] + 1 });
      })
        .catch(error => { console.log('err', error); alert(error.response) })

    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });



    axios.get(url, {
      headers: {
        'Authorization': `token ${x}`,

      },

    }).then((res) => {

      setPosts(
        res.data,
      );


      settotalpageCnt(res.data.pageCnt);
      setisLiked(Object.assign({}, isLiked, res.data.likeDict))
      // setisLiked(res.data.likeDict);

      setlikedCount(Object.assign({}, likedCount, res.data.likeCount));

    }
      , (error) => { console.log(error.message, error.response) })
      .catch(err => console.log(err))
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [PageCount])
  const [Open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);

  };



  return (
    <>


      {Posts && Posts.map((post, index) => {
        var isvideo = true;
        return (

          <div key={index}>

            <article className="Post marginPostGroup" >

              <header>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  alignContent="flex-between"
                  p={0}
                  m={0}
                  bgcolor="background.paper"

                >
                  <div className="Post-user">

                    {post.creator && post.creator.mypicture && post.creator.mypicture.startsWith('/media') ? <Avatar src={BASE_URL_HTTP + post.creator.mypicture} className={classes.large} /> : <Avatar src={post.creator.mypicture} className={classes.large} />}





                    <div className="Post-user-nickname">
                      <NavLink to={`/profile/${post.creator.user_name}`} style={{ textDecoration: 'none', cursor: 'pointer', color: 'black' }}>
                        <span>{post.creator.user_name}</span>
                      </NavLink>

                    </div>

                  </div>


                </Box>
              </header>
              <div className="Post-image">


                <div className="Post-image-bg">

                  {post.file && <img src={BASE_URL_HTTP + post.file} onError={(e) => { isvideo = true; e.target.onerror = null; e.target.src = ""; }} width={"150px"} height={"250px"} />}

                </div>

              </div>
              <div className="Post-caption">
                <div>Titel:{post.title}</div>
                <div>Content:{post.content}</div>

              </div>

            </article>

          </div>

        )
      })

      }

      <br></br>

    </>
  )

}