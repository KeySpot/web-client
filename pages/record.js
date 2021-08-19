import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Table as T, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import HtmlBase from '../components/HtmlBase';
import Modal from '../components/Modal';
import Spinner from '../components/spinner';
import HiddenField from '../components/HiddenField';
import HiddenInput from '../components/HiddenInput';
import Responsive from '../components/Responsive';
import shallowEqual from '../lib/shallowEqual';
import AccessKeyContext from '../context/accessKeyContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  applyPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  applyPaperElement: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  modalElement: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  topTextField: {
    color: 'primary.contrastText',
    textAlign: 'center',
    fontSize: '3em',
  },
  mobileTableContainer: {
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  }
}));

export default function AccessKey() {
  const [accessKey] = useContext(AccessKeyContext);
  const classes = useStyles();
  const router = useRouter();
  const { data, error, mutate } = useSWR(accessKey ? `/api/${accessKey}` : null, url => fetch(url).then(res => res.json()));
  const { data: isOwner } = useSWR(accessKey ? `/api/isOwner/${accessKey}` : null, url => fetch(url).then(res => res.json()));
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [rows, setRows] = useState([]);
  const [focused, setFocused] = useState(null);
  const [newName, setNewName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(function () {
    if (!accessKey) {
      router.push('/records');
    }
  });

  useEffect(function () {
    if (data) {
      setRows(Object.entries(data.record));
      setNewName(data.name);
    }
  }, [data]);

  function objectFromRows() {
    let comparer = {};
    for (const item of rows) {
      comparer[item[0]] = item[1];
    }

    return comparer;
  }

  function handleChangeValue(index, newValue) {
    let newRows = [...rows];
    newRows[index][1] = newValue;
    setRows(newRows);
    setFocused([index, 'value']);
  }

  function handleChangeKey(index, newKey) {
    let newRows = [...rows];
    newRows[index][0] = newKey;
    setRows(newRows);
    setFocused([index, 'key']);
  }

  function handleAddKvp() {
    setRows([[newKey, newValue], ...rows]);
    setNewKey('');
    setNewValue('');
  }

  function handleDeleteKvp(index) {
    let newRows = [...rows];
    newRows.splice(index, 1)
    setRows(newRows);
  }

  function updateForm() {
    let newData = objectFromRows();
    fetch(`/api/${accessKey}?name=${newName}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
      .then(res => mutate({ name: data.name, record: newData }))
      .catch(console.error(error));
  }

  function revertForm() {
    setRows(Object.entries(data.record));
    setNewName(data.name);
  }

  function deleteForm() {
    fetch(`/api/delete/${accessKey}`, {
      method: 'DELETE'
    })
      .then(res => router.push('/records'))
      .catch(error => console.error(error));
  }

  function hasChanged() {
    return !shallowEqual(objectFromRows(), data.record) || newName !== data.name;
  }

  let body = [];

  if (error) {
    body.push(
      <Grid item xs={12} >
        <Paper className={classes.paper} >
          <Typography variant="h4" >Record</Typography>
          <Typography variant="h4" >Failed to find that record</Typography>
        </Paper>
      </Grid>
    );
  } else if (!data) {
    body.push(
      <Grid item xs={12} >
        <Paper className={classes.paper} >
          <Typography variant="h4" >Record</Typography>
          <Spinner size={100} />
        </Paper>
      </Grid>
    );
  } else {
    body.push(
      <Grid item xs={12} >
        <Paper className={classes.paper} >
          <TextField inputProps={{ className: classes.topTextField }} onChange={e => setNewName(e.target.value)} value={newName} />
          <Typography>accessKey: <HiddenField value={accessKey} /></Typography>
        </Paper>
      </Grid>,
      <Responsive
        desktop={
          <Grid item xs={12} >
            <Paper className={classes.applyPaper} >
              <Button className={classes.applyPaperElement} variant="contained" color="secondary" disabled={!hasChanged()} onClick={revertForm} >Revert</Button>
              <Button className={classes.applyPaperElement} variant="contained" color="secondary" disabled={!hasChanged()} onClick={updateForm} >Apply</Button>
              <Button className={classes.applyPaperElement} variant="contained" color="default" disabled={isOwner !== true} onClick={() => setModalOpen(true)} >Delete Record</Button>
            </Paper>
          </Grid>
        }
        mobile={
          <Grid item xs={12} >
            <Paper className={classes.applyPaper} >
              <Grid container spacing={0}>
                <Grid item xs={12} ><Button className={classes.applyPaperElement} variant="contained" color="secondary" disabled={!hasChanged()} onClick={revertForm} >Revert</Button></Grid>
                <Grid item xs={12} ><Button className={classes.applyPaperElement} variant="contained" color="secondary" disabled={!hasChanged()} onClick={updateForm} >Apply</Button></Grid>
                <Grid item xs={12} ><Button className={classes.applyPaperElement} variant="contained" color="default" disabled={isOwner !== true} onClick={() => setModalOpen(true)} >Delete</Button></Grid>
              </Grid>
            </Paper>
          </Grid>
        }
      />,
      <Grid item xs={12}>
        <Paper className={classes.paper} >
          <Responsive
            desktop={
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell><AddOutlinedIcon /></TableCell> */}
                      <TableCell><TextField label="New Key" onChange={e => setNewKey(e.target.value)} value={newKey} /></TableCell>
                      <TableCell><HiddenInput align="right" label="New Value" onChange={e => setNewValue(e.target.value)} value={newValue} /></TableCell>
                      <TableCell><Fab variant="contained" color="secondary" disabled={!newKey} onClick={handleAddKvp} ><AddOutlinedIcon /></Fab></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (

                      <TableRow key={row[0]}>
                        <TableCell>
                          <TextField autoFocus={focused ? focused[0] === index && focused[1] === 'key' : false} variant="outlined" onChange={e => handleChangeKey(index, e.target.value)} defaultValue={row[0]} />
                        </TableCell>
                        <TableCell>
                          <HiddenInput value={row[1]} autoFocus={focused ? focused[0] === index && focused[1] === 'value' : false} variant="outlined" onChange={e => handleChangeValue(index, e.target.value)} defaultValue={row[1]} />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton color="secondary" variant="contained" onClick={() => handleDeleteKvp(index)}>
                            <CancelRoundedIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
            mobile={
              <>
                <Grid align="left" container spacing={3} >
                  <Grid item xs={12} >
                    <TextField label="New Key" onChange={e => setNewKey(e.target.value)} value={newKey} />
                  </Grid>
                  <Grid item xs={12} >
                    <HiddenInput align="right" label="New Value" onChange={e => setNewValue(e.target.value)} value={newValue} />
                  </Grid>
                  <Grid item xs={12} >
                    <Fab variant="contained" color="secondary" disabled={!newKey} onClick={handleAddKvp} ><AddOutlinedIcon /></Fab>
                  </Grid>
                </Grid>
                <T>
                  {/* <Thead>
                    <Tr>
                      <Th>Key</Th>
                      <Th>Value</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead> */}
                  <Tbody>
                    {rows.map((row, index) => (
                      <Tr key={row[0]}>
                        <Td><TextField autoFocus={focused ? focused[0] === index && focused[1] === 'key' : false} variant="outlined" onChange={e => handleChangeKey(index, e.target.value)} defaultValue={row[0]} /></Td>
                        <Td><HiddenInput icons={true} value={row[1]} autoFocus={focused ? focused[0] === index && focused[1] === 'value' : false} variant="outlined" onChange={e => handleChangeValue(index, e.target.value)} defaultValue={row[1]} /></Td>
                        <Td>
                          <IconButton color="secondary" variant="contained" onClick={() => handleDeleteKvp(index)}>
                            <CancelRoundedIcon />
                          </IconButton>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </T>
              </>
            }
          />
        </Paper>
      </Grid>
    );
  }

  return (
    <HtmlBase title={data ? data.name : 'Record'} >
      <Container maxWidth="lg" >
        <Grid container spacing={3}>
          {body}
        </Grid>
      </Container>
      {
        data ?
          <Modal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
            title={`Delete Record ${data.name}`}
            description={`Are your sure you want to delete record ${data.name}.`}
          >
            <Button className={classes.modalElement} variant="contained" onClick={() => setModalOpen(false)} >Nevermind</Button>
            <Button className={classes.modalElement} variant="contained" color="secondary" onClick={deleteForm} >Delete</Button>
          </Modal> :
          <></>
      }
    </HtmlBase>
  );
}