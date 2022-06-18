import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    studentName: "",
    message: "",
    price: 0,
    lessonDate: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const studentNameError = useState(false);
  // const helperText = useState('');

  const clear = () => {
    setCurrentId(0);
    setPostData({
      studentName: "",
      message: "",
      price: 0,
      lessonDate: "",
      tags: [],
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (!post?.studentName) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to log your lessons
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.studentName}"` : "Log a Lesson"}
        </Typography>
        <TextField
          name="studentName"
          variant="outlined"
          label="Student Name"
          fullWidth
          value={postData.studentName}
          onChange={(e) =>
            setPostData({ ...postData, studentName: e.target.value })
          }
        />
        {/* {...studentNameError && {...helperText}}/> error={false} */}
        <CurrencyTextField
          label="Amount"
          variant="outlined"
          value={postData.price}
          fullWidth
          decimalPlaces={0}
          currencySymbol="$"
          onChange={(e) => setPostData({ ...postData, price: e.target.value })}
        />{" "}
        <TextField
          name="lessonDate"
          variant="outlined"
          label="Lesson Date"
          fullWidth
          value={postData.lessonDate}
          onChange={(e) =>
            setPostData({ ...postData, lessonDate: e.target.value })
          }
        />
        {/* <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} /> */}
        {/* <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div> */}
        {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
