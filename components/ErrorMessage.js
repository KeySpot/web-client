import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    textAlign: 'center',
  },
}));

export default function ErrorMessage({ message }) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Paper className={classes.paper}>
        <Grid container spacing={5}>
          <Grid item align="center" xs={12}>
            <Typography>Failed to load:</Typography>
          </Grid>
          <Grid item align="center" xs={12}>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}