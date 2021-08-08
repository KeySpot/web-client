import { useState, useContext } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import SubjectIcon from '@material-ui/icons/Subject';
import Modal from '../components/Modal';
import HtmlBase from '../components/HtmlBase';
import Spinner from '../components/spinner';
import AccessKeyContext from '../context/accessKeyContext';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  paperElement: {
    margin: theme.spacing(2),
  }
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
          <Paper className={classes.paper} >
            <Typography variant="h4" >Your Records</Typography>
            <Typography className={classes.paperElement} variant="h4" >Failed to load: {error ? error.toString() : ''}</Typography>
          </Paper>
        </Grid>
      );
    } else if (!data) {
      return (
        <Grid item xs={12} >
          <Paper className={classes.paper} >
            <Typography variant="h4" >Your Records</Typography>
            <Spinner size={100} />
          </Paper>
        </Grid>
      );
    } else if (!Array.isArray(data)) {
      return (
        <Grid item xs={12} >
          <Paper className={classes.paper} >
            <Typography variant="h4" >Your Records</Typography>
            <Typography className={classes.paperElement} variant="h4" >You must be logged in to access Records</Typography>
            <Link href="/api/auth/login" passHref ><Button className={classes.paperElement} variant="contained" color="secondary" >Log in</Button></Link>
          </Paper>
        </Grid>
      );
    } else {
      let items = [
        <ListItem key="0" button onClick={() => setModalOpen(true)} >
          <ListItemIcon className={classes.contraster} >
            <AddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Add Record" />
        </ListItem>
      ];

      for (const item of data) {
        items.push(
          <Grid item xs={12} >
            <Link href={`/record`} passHref >
              <ListItem onClick={() => setAccessKey(item._id)} key={item._id} button>
                <ListItemIcon className={classes.contraster} >
                  <SubjectIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          </Grid>
        );
      }

      return [
        <Grid key={0} item xs={12}>
          <Paper className={classes.paper} >
            <Typography variant="h4" >Your Records</Typography>
            <List>
              {items}
            </List>
          </Paper>
        </Grid>
      ];
    }
  }

  return (
    <HtmlBase title="Records" >
      <Container maxWidth="lg" >
        <Grid container spacing={3}>
          <DataView />
        </Grid>
      </Container>
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