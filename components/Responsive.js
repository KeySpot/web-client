import Hidden from '@material-ui/core/Hidden'

export default function Responsive({ desktop, mobile }) {
  return (
    <div>
      <Hidden smDown>
        {desktop}
      </Hidden>
      <Hidden mdUp>
        {mobile}
      </Hidden>
    </div>
  );
}