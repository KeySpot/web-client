import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
        color: theme.palette.secondary.light,
    },
}));

export default function MarkdownLink({ children, href }) {
    const classes = useStyles();
    
    return (
        <Link className={classes.link} href={href} >{children}</Link>
    );
}