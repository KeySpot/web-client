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
import { useEffect, useState } from 'react';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { useRouter } from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import shallowEqual from '../lib/shallowEqual';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
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
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
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
    }
}));

export default function AccessKey() {
    const classes = useStyles();
    const router = useRouter();
    const { data, error, mutate } = useSWR(router.query.accessKey ? `/api/${router.query.accessKey}` : null, url => fetch(url).then(res => res.json()));
    const { data: isOwner } = useSWR(router.query.accessKey ? `/api/isOwner/${router.query.accessKey}` : null, url => fetch(url).then(res => res.json()));
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');
    const [rows, setRows] = useState([]);
    const [focused, setFocused] = useState(null);
    const [newName, setNewName] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(function () {
        if (data) {
            revertForm();
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
        fetch(`/api/${router.query.accessKey}?name=${newName}`, {
            method: 'PUT',
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
        fetch(`/api/delete/${router.query.accessKey}`, {
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
                    <Typography variant="h4" >Failed to find that record</Typography>
                </Paper>
            </Grid>
        );
    } else if (!data) {
        body.push(
            <Grid item xs={12} >
                <Paper className={classes.paper} >
                    <Typography variant="h4" >Loading...</Typography>
                </Paper>
            </Grid>
        );
    } else {
        body.push(
            <Grid item xs={12} >
                <Paper className={classes.paper} >
                    <TextField inputProps={{ className: classes.topTextField }} onChange={e => setNewName(e.target.value)} value={newName} />
                    <Typography>accessKey: {router.query.accessKey}</Typography>
                </Paper>
            </Grid>,
            <Grid item xs={12} >
                <Paper className={classes.applyPaper} >
                    <Button className={classes.applyPaperElement} variant="contained" color="secondary" disabled={!hasChanged()} onClick={revertForm} >Revert</Button>
                    <Button className={classes.applyPaperElement} variant="contained" color="secondary" disabled={!hasChanged()} onClick={updateForm} >Apply</Button>
                    <Button className={classes.applyPaperElement} variant="contained" color="secondary" disabled={isOwner !== true} onClick={() => setModalOpen(true)} >Delete</Button>
                </Paper>
            </Grid>,
            <Grid item xs={12}>
                <Paper className={classes.paper} >
                    {/* <List>
                        {items}
                    </List> */}
                    <TableContainer>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell><AddOutlinedIcon /></TableCell> */}
                                    <TableCell><TextField label="New Key" onChange={e => setNewKey(e.target.value)} value={newKey} /></TableCell>
                                    <TableCell><TextField align="right" label="New Value" onChange={e => setNewValue(e.target.value)} value={newValue} /></TableCell>
                                    <TableCell><Fab variant="contained" color="secondary" disabled={!newKey} onClick={handleAddKvp} ><AddOutlinedIcon /></Fab></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Key</TableCell>
                                    <TableCell >Value</TableCell>
                                    <TableCell align="right" >Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row[0]}>
                                        <TableCell>
                                            <TextField autoFocus={focused ? focused[0] === index && focused[1] === 'key' : false} variant="outlined" onChange={e => handleChangeKey(index, e.target.value)} defaultValue={row[0]} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField autoFocus={focused ? focused[0] === index && focused[1] === 'value' : false} variant="outlined" onChange={e => handleChangeValue(index, e.target.value)} defaultValue={row[1]} />
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
                </Paper>
            </Grid>
        );
    }



    return (
        <div className="background">
            <AppBar hasSearch={true} title={data ? data.name : ''} />
            <Head>
                <title>{data ? data.name : ''}</title>
                <meta name="description" content="Written by Carl Schader" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="main">
                <div className={classes.root}>
                    <Container maxWidth="md" >
                        <Grid container spacing={3}>
                            {body}
                        </Grid>
                    </Container>
                </div>
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
            </main>
        </div>
    );
}