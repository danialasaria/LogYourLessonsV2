import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { paidPost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [paids, setPaids] = useState(post?.paids);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const hasPaidPost = post.paids.find((paid) => paid === userId);

  const handlePaid = async () => {
    dispatch(paidPost(post._id));

    if (hasPaidPost) {
      setPaids(post.paids.filter((id) => id !== userId));
    } else {
      setPaids([...post.paids, userId]);
    }
  };

  const Paids = () => {
    if (paids.length > 0) {
      return paids.find((paid) => paid === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{paids.length > 2 ? `You and ${paids.length - 1} others` : `${paids.length} paid${paids.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{paids.length} {paids.length === 1 ? 'Paid' : 'Paids'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Paid</>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} studentName={post.studentName} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.studentName}</Typography>
          <Typography variant="h6">${post.price}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.studentName} gutterBottom variant="h5" component="h2">Lesson Date: {post.lessonDate}</Typography>
        {/* <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent> */}
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handlePaid}>
          <Paids />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
