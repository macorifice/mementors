import React, { Component } from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Container } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


// Our app
const NewMeme = (props) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
      position: 'relative',
      width: '50%'
      // max-width: 300px;
    },
    image: {
      display: 'block',
      width: '100%',
      height: 'auto'
    },
    input: {
      color: "#FFFFFF"
    }
  }));
  
  
  
  const classes = useStyles();
  
    return (

      <div className={classes.root}>
      <Grid className={classes.container} container spacing={3}>
        <Grid style={{align:'center'}} item xs={6}>
        <img className={classes.image} style={{height: 400, width: 400}} src={`${props.image}`}></img>
        </Grid>
        <Grid item xs={6}>
        <TextField style={{top: 280, right: 120}}
        InputProps={{
          className: classes.input
        }}
              required
              error
              variant='outlined'
              id="bottomText"
              placeholder="Bottom Text"
              name="bottomText"
            />
        <TextField style={{top: 30, right: 120}}
        InputProps={{
          className: classes.input
        }}
              required
              error
              variant='outlined'
              id="topText"
              placeholder="Top text"
              name="topText"
            />
        </Grid>
        {/* <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid> */}
      </Grid>
    </div>
        
    );
}

export default NewMeme