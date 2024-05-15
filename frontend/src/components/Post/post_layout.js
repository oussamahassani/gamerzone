import React, { Component, useEffect, useRef, useState } from "react";
import "../assests/post.css";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import AddPost from "./actions/add_post";
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';
import { Avatar, Card, CardActions, CardContent, CardHeader, Paper, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import ForumIcon from '@material-ui/icons/Forum';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
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

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSavePost = (post) => {
    // setAnchorEl(null);
    console.log(post)
    axios.post(`${BASE_URL_HTTP}/saved/save/${post.id}`, { post_id: post.id }, {
      headers: {
        'Authorization': `token ${x}`,
      },

    }).then((res) => {
      console.log(res)

    }, (error) => { console.log(error.message, error.response); alert(error.response.data.message) })

  }
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
      params: {
        page: PageCount,
        type: params.type,
      }
    }).then((res) => {

      setPosts(
        res.data.posts_data,
      );


      settotalpageCnt(res.data.pageCnt);
      setisLiked(Object.assign({}, isLiked, res.data.likeDict))
      // setisLiked(res.data.likeDict);

      setlikedCount(Object.assign({}, likedCount, res.data.likeCount));

    }
      , (error) => { console.log(error.message, error.response) })
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

            <article className="Post" >

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

                    {post.userphoto && post.userphoto.startsWith('/media') ? <Avatar src={BASE_URL_HTTP + post.userphoto} className={classes.large} /> : <Avatar src={post.userphoto} className={classes.large} />}





                    <div className="Post-user-nickname">
                      <NavLink to={`/profile/${post.username}`} style={{ textDecoration: 'none', cursor: 'pointer', color: 'black' }}>
                        <span>{post.username}</span>
                      </NavLink>

                    </div>

                  </div>
                  <IconButton

                    color="default"
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true" onClick={() => handleSavePost(post)}>
                    <FavoriteBorderIcon />
                  </IconButton>

                </Box>
              </header>
              <div className="Post-image">

                <div className="Post-image-bg">

                  {post.Image && <img src={BASE_URL_HTTP + post.Image} onError={(e) => { isvideo = true; e.target.onerror = null; e.target.src = ""; }} />}
                  {/* {post.Image && isvideo && <video  controls >
                <source src={post.Image} type="video/mp4"  />
                </video>}
                 */}
                </div>

              </div>
              <div className="Post-caption">

                <IconButton onClick={() => likeDislike(post.id)} color={isLiked[post.id] == 1 ? "secondary" : "inherit"} className={classes.button} aria-label="Add an alarm">
                  <Icon><FavoriteIcon /></Icon>
                </IconButton>
                {likedCount[post.id]}&nbsp;

                <IconButton className={classes.button} color={"inherit"}>
                  <NavLink to={`/post/${post.id}`} style={{ textDecoration: 'none', cursor: 'pointer', color: 'black' }}> <Icon><ForumIcon /></Icon></NavLink>
                </IconButton>
                <div>Caption:{post.caption}</div>
              </div>

            </article>

          </div>

        )
      })

      }
      {PageCount < totalpageCnt ? <CircularProgress style={{ marginLeft: '50%' }} /> : <></>}
      <br></br>

    </>
  )

}