import AppBar from '../components/appBar';
import useSWR from 'swr';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '../components/modal';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import SubjectIcon from '@material-ui/icons/Subject';
import Link from 'next/link';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
  modalPaper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const fetcher = url => fetch(url).then(res => res.json());

export default function Records() {
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
    if (error || !Array.isArray(data)) {
      return (
        <Grid item xs={12} >
          <Paper className={classes.paper} >
            <Typography variant="h4" >Failed to load: {error ? error.toString() : ''}</Typography>
          </Paper>
        </Grid>
      );
    } else if (!data) {
      return (
        <Grid item xs={12} >
          <Paper className={classes.paper} >
            <Typography variant="h4" >Loading...</Typography>
          </Paper>
        </Grid>
      );
    } else {
      let items = [
        <ListItem button onClick={() => setModalOpen(true)} >
          <ListItemIcon>
            <AddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Add Record" />
        </ListItem>
      ];

      for (const item of data) {
        items.push(
          <Grid item xs={12} >
            <Link href={`/${item._id}`}>
              <ListItem button >
                <ListItemIcon>
                  <SubjectIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          </Grid>
        );
      }

      return [
        <Grid item xs={12} >
          <Paper className={classes.paper} >
            <Typography variant="h4" >Records</Typography>
          </Paper>
        </Grid>,
        <Grid item xs={12}>
          <Paper className={classes.paper} >
            <List>
              {items}
            </List>
          </Paper>
        </Grid>
      ];
    }
  }

  return (
    <div className="background">
      <AppBar title="Records" />
      <Head>
        <title>Records</title>
        <meta name="description" content="Written by Carl Schader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main" >
        <div className={classes.root}>
          <Container maxWidth="md" >
            <Grid container spacing={3}>
              <DataView />
            </Grid>
          </Container>
        </div>
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
          <Button variant= "contained" color="secondary" disabled={newRecordName.length > 0 ? false : true} onClick={handleNewRecord} >Add</Button>
        </Modal>
      </main>
    </div>
  );
}