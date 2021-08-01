import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
        // color: theme.palette.primary.contrastText,
    },
}));

export default function MarkdownLink({ children }) {
    const classes = useStyles();
    
    return (
        <Link color="error" >{children}</Link>
    );
}