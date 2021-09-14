import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Spinner from './spinner';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    textAlign: 'center',
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={5} alignItems="center" justifyContent="center" alignContent="center" direction="column">
      <Grid item align="center" xs={12}>
        <Spinner size={100} />
      </Grid>
    </Grid>
  );
}