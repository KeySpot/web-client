import { useState, useContext } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import AddIcon from '@material-ui/icons/Add';
import SubjectIcon from '@material-ui/icons/Subject';
import Modal from '../components/Modal';
import HtmlBase from '../components/HtmlBase';
import Spinner from '../components/spinner';
import AccessKeyContext from '../context/accessKeyContext';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Responsive from '../components/Responsive';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  paperElement: {
    margin: theme.spacing(3),
  },
  card: {
    minHeight: "200px",
  },
}));

const fetcher = url => fetch(url).then(res => res.json());

export default function Records() {
  const [accessKey, setAccessKey] = useContext(AccessKeyContext);
  const { data, error, mutate } = useSWR('/api/accessKeys', fetcher);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [newRecordName, setNewRecordName] = useState('');

  function handleNewRecord() {
    fetch(`/api/newName/${newRecordName}`, { method: 'POST' })
      .then(response => mutate(data.concat(newRecordName)))
      .catch(error => console.error(error));
    setModalOpen(false);
  }

  function DataView() {
    if (error) {
      return (
        <Grid item xs={12} >
          {/* <Paper className={classes.paper} > */}
          <div className={classes.paper} >
            <Typography variant="h4" >Your Records</Typography>
            <Typography className={classes.paperElement} variant="h4" >Failed to load: {error ? error.toString() : ''}</Typography>
            {/* </Paper> */}
          </div>
        </Grid>
      );
    } else if (!data) {
      return (
        <Grid item xs={12} >
          {/* <Paper className={classes.paper} > */}
          <div className={classes.paper} >
            <Typography variant="h4" >Your Records</Typography>
            <Spinner size={100} />
            {/* </Paper> */}
          </div>
        </Grid>
      );
    } else if (!Array.isArray(data)) {
      return (
        <Grid item xs={12} >
          {/* <Paper className={classes.paper} > */}
          <div className={classes.paper} >
            <Typography variant="h4" >Your Records</Typography>
            <Typography className={classes.paperElement} variant="h4" >You must be logged in to access Records</Typography>
            <Link href="/api/auth/login" passHref ><Button className={classes.paperElement} variant="contained" color="secondary" >Log in</Button></Link>
            {/* </Paper> */}
          </div>
        </Grid>
      );
    } else {
      let items = [
        <Responsive
          key={0}
          desktop={
            <Grid item xs={6}>
              <CardActionArea
                onClick={() => setModalOpen(true)}
              >
                <Card className={classes.card} key={0}>
                  <CardHeader
                    avatar={<Typography variant="h5">
                      Add Record
                    </Typography>}
                  />
                  <CardContent>
                    <AddOutlinedIcon style={{ fontSize: 50 }} />
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          }
          mobile={
            <Grid item xs={12}>
              <CardActionArea
                onClick={() => setModalOpen(true)}
              >
                <Card className={classes.card} key={0}>
                  <CardHeader
                    avatar={<Typography variant="h5">
                      Add Record
                    </Typography>}
                  />
                  <CardContent>
                    <AddOutlinedIcon style={{ fontSize: 50 }} />
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          }
        />
      ];

      for (const item of data) {
        items.push(
          <Responsive
            desktop={
              <Grid item xs={6} >
                <Link href={`/record`} passHref >
                  <CardActionArea
                    onClick={() => setAccessKey(item._id)}
                  >
                    <Card className={classes.card} key={item._id}>
                      <CardHeader
                        avatar={<SubjectIcon fontSize="large" />}
                      />
                      <CardContent>
                        <Typography variant="h4">
                          {item.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </Link>
              </Grid>
            }
            mobile={
              <Grid item xs={12} >
                <Link href={`/record`} passHref >
                  <CardActionArea
                    onClick={() => setAccessKey(item._id)}
                  >
                    <Card className={classes.card} key={item._id}>
                      <CardHeader
                        avatar={<SubjectIcon fontSize="large" />}
                      />
                      <CardContent>
                        <Typography variant="h4">
                          {item.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </Link>
              </Grid>
            }
          />
        );
      }

      return [
        <Grid key={0} item xs={12}>
          {/* <Paper className={classes.paper} > */}
          <div className={classes.paper} >
              <Typography className={classes.paperElement} variant="h4" >Your Records</Typography>
            {/* <List> */}
            <Grid container spacing={7}>
              {items}
            </Grid>
            {/* </List> */}
            {/* </Paper> */}
          </div>
        </Grid>
      ];
    }
  }

  return (
    <HtmlBase title="Records" >
        <Grid container spacing={3}>
          <DataView />
        </Grid>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setNewRecordName('');
        }}
        title="Create a New Record"
        description="Enter a name for your new record."
      >
        <TextField autoFocus label="Record Name" onChange={event => setNewRecordName(event.target.value)} />
        <Button variant="contained" color="secondary" disabled={newRecordName.length > 0 ? false : true} onClick={handleNewRecord} >Add</Button>
      </Modal>
    </HtmlBase>
  );
}