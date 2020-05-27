import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import axios from "axios";
import ViewMeme from './ViewMeme'
import EditMeme from './EditMeme'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Album = () => {
  const classes = useStyles();

  const [state, setstate] = useState([]);
  const [current, setcurrent] = useState();
  const [view, setview] = useState(false);
  const [edit, setedit] = useState(false);

  const onClose = () => {
    setview(false)
  }

  const onEditClose = () => {
    setedit(false)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.imgflip.com/get_memes',
      );
 
      setstate(result.data.data.memes);
    };
 
    fetchData();
  }, []);

  const setCurrentMeme = (template_id, template_name, template_url) => {
      setcurrent(template_id+'-'+template_name+'-'+template_url)
      setview(true)
  }

  const editCurrentMeme = (template_id, template_name, template_url) => {
    setcurrent(template_id+'-'+template_name+'-'+template_url)
    setedit(true)
}

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        {/* <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h6"
              variant="h6"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Latest mementors
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div> */}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {state.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.url}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    {/* <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography> */}
                  </CardContent>
                  <CardActions>
                    {/* <Button onClick={(e) => setCurrentMeme(card.id, card.name, card.url)} size="small" color="primary">
                      View
                    </Button> */}
                    <Button onClick={(e) => editCurrentMeme(card.id, card.name, card.url)} size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            { view && <ViewMeme view={view} onClose={onClose} current={current} ></ViewMeme>}
            { edit && <EditMeme view={edit} onClose={onEditClose} current={current} ></EditMeme>}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};
export default Album;
