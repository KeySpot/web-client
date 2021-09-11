import { useState, useContext } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import SubjectIcon from '@material-ui/icons/Subject';
import Modal from '../components/Modal';
import HtmlBase from '../components/HtmlBase';
import AccessKeyContext from '../context/accessKeyContext';
import Fab from '@material-ui/core/Fab';
import Responsive from '../components/Responsive';
import requireLogin from '../hooks/requireLogin';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';


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
  fabItem: {
    margin: theme.spacing(2),
    wordBreak: 'break-all',
  }
}));

const fetcher = url => fetch(url).then(res => res.json());

export default function Records() {
  requireLogin();
  const [_, setAccessKey] = useContext(AccessKeyContext);
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
      return <ErrorMessage message={error.toString()} />;
    } else if (!data || !Array.isArray(data)) {
      return <Loading />;
    } else {
      let items = [
        <Responsive
          key={0}
          desktop={
            <Grid item xs={12}>
              <Fab
                className={classes.fab}
                color="secondary"
                onClick={() => setAccessKey(item._id)}
              >
                <AddOutlinedIcon fontSize="large" />
              </Fab>
            </Grid>
          }
          mobile={
            <Grid item xs={12}>
              <Fab
                className={classes.fab}
                color="secondary"
                onClick={() => setAccessKey(item._id)}
              >
                <AddOutlinedIcon fontSize="large" />
              </Fab>
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
                  <Fab
                    variant="extended"
                    className={classes.fab}
                    color="primary"
                    style={{ height: "15em", width: "25em", textTransform: "none" }}
                    onClick={() => setAccessKey(item._id)}
                  >
                    <Grid container>
                      <Grid item align="left" className={classes.fabItem}><SubjectIcon fontSize="large" /></Grid>
                      <Grid item align="left" className={classes.fabItem}>
                        <Typography variant="h5">
                          {item.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Fab>
                </Link>
              </Grid>
            }
            mobile={
              <Grid item xs={12} >
                <Link href={`/record`} passHref >
                  <Fab
                    variant="extended"
                    className={classes.fab}
                    color="primary"
                    style={{ height: "10em", width: "20em", textTransform: "none" }}
                    onClick={() => setAccessKey(item._id)}
                  >
                    <Grid container>
                      <Grid item align="left" className={classes.fabItem}><SubjectIcon fontSize="large" /></Grid>
                      <Grid item align="left" className={classes.fabItem}>
                        <Typography variant="h5">
                          {item.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Fab>
                </Link>
              </Grid>
            }
          />
        );
      }

      return [
        <Grid key={0} item xs={12}>
          <div className={classes.paper} >
            <Typography className={classes.paperElement} variant="h2" >Records</Typography>
            <Grid container spacing={7}>
              {items}
            </Grid>
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