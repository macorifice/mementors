import React, { useState } from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Draggable from "react-draggable";
import Image from "react-image-resizer";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PinterestIcon from "@material-ui/icons/Pinterest";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
const NewMeme = (props) => {
  const [insertbottomtext, setinsertbottomtext] = useState(false);
  const [inserttoptext, setinserttoptext] = useState(false);

  const [textList, settextlist] = useState([]);

  const Text = () => {
    return (
      <Draggable>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          required
          error
          variant="outlined"
          id="text"
          placeholder="Text"
          name="text"
          margin="dense"
        />
      </Draggable>
    );
  };

  const onAddBtnClick = (event) => {
    settextlist(textList.concat(<Text key={textList.length} />));
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    container: {
      position: "relative",
      width: "auto",
      height: "auto",
    },
    image: {
      width: "auto",
      height: "auto",
    },
    input: {
      color: "#FFFFFF",
      resize: true,
    },
  }));

  const [src, setsrc] = useState(props.image);
  const [files, setfiles] = useState();
  const [filepond, setfilepond] = useState(false);

  const style = {
    image: {
      border: "1px solid #ccc",
      background: "#fefefe",
    },
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container spacing={3}>
        <Grid item xs={12}>
          <Image src={src} width={400} height={400} style={style.image} />
          {textList}
        </Grid>
        <Grid item xs={12}>
          {insertbottomtext && (
            <Draggable>
              <TextField
                InputProps={{
                  className: classes.input,
                }}
                required
                error
                variant="outlined"
                id="bottomText"
                placeholder="Bottom Text"
                name="bottomText"
                margin="dense"
              />
            </Draggable>
          )}
          {inserttoptext && (
            <Draggable>
              <TextField
                InputProps={{
                  className: classes.input,
                }}
                required
                error
                variant="outlined"
                id="topText"
                placeholder="Top text"
                name="topText"
                margin="dense"
              />
            </Draggable>
          )}
        </Grid>
      </Grid>

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Button
                color="primary"
                onClick={(e) => setinsertbottomtext(true)}
                variant="contained"
              >
                Insert bottom text
              </Button>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Button
                color="primary"
                onClick={(e) => setinserttoptext(true)}
                variant="contained"
              >
                Insert top text
              </Button>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              {!filepond && (
                <Button
                  onClick={(e) => setfilepond(true)}
                  color="primary"
                  variant="contained"
                >
                  Upload your own image
                </Button>
              )}
              {filepond && (
                <FilePond
                  server={{
                    process: (
                      fieldName,
                      file,
                      metadata,
                      load,
                      error,
                      progress,
                      abort
                    ) => {
                      // fieldName is the name of the input field
                      // file is the actual file object to send
                      const formData = new FormData();
                      formData.append('upload_preset','ml_default');
                      formData.append('file', file);
                      const request = new XMLHttpRequest();
                      request.open("POST", "https://api.cloudinary.com/v1_1/toowaste-com/upload");

                      // Should call the progress method to update the progress to 100% before calling load
                      // Setting computable to false switches the loading indicator to infinite mode
                      request.upload.onprogress = (e) => {
                        progress(e.lengthComputable, e.loaded, e.total);
                      };

                      // Should call the load method when done and pass the returned server file id
                      // this server file id is then used later on when reverting or restoring a file
                      // so your server knows which file to return without exposing that info to the client
                      request.onload = function () {
                        if (request.status >= 200 && request.status < 300) {
                          // the load method accepts either a string (id) or an object
                          load(request.responseText);
                        } else {
                          // Can call the error method if something is wrong, should exit after
                          error("oh no");
                        }
                      };


                      request.send(formData);

                      // Should expose an abort method so the request can be cancelled
                      return {
                        abort: () => {
                          // This function is entered if the user has tapped the cancel button
                          request.abort();

                          // Let FilePond know the request has been cancelled
                          abort();
                        },
                      };
                    },
                  }}
                  files={files}
                  onupdatefiles={setfiles}
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
              )}
              {filepond && (
                <Button
                  onClick={(e) => setfilepond(false)}
                  color="primary"
                  variant="contained"
                >
                  Cancel
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Button
                onClick={onAddBtnClick}
                color="primary"
                variant="contained"
              >
                Add text
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <FacebookIcon />
              <InstagramIcon />
              <TwitterIcon />
              <PinterestIcon />
              <LinkedInIcon />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Button color="primary" variant="contained">
                Add sticker
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NewMeme;
