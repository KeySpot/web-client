import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2)
    },
}));

export default function CodeBlock({ children }) {
    const classes = useStyles();
    
    return (
        <Paper variant="outlined" elevation={3} className={classes.paper} >
            {children}
        </Paper>
    );
}