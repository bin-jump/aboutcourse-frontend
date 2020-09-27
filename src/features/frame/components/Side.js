import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Button from '@material-ui/core/Button';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Typography from '@material-ui/core/Typography';
import './Side.less';

export default function Side(props) {
  return (
    <div className="frame-side">
      <Button component={Link} to="/">
        <div className="frame-side-iconcontainer">
          <ListAltIcon fontSize="large" className="frame-side-icon" />
          <Typography variant="caption">Schedule</Typography>
        </div>
      </Button>
      <Button component={Link} to="/account">
        <div className="frame-side-iconcontainer">
          <AccountBoxIcon fontSize="large" className="frame-side-icon" />
          <Typography variant="caption">Account</Typography>
        </div>
      </Button>
      <Button component={Link} to="/lecture">
        <div className="frame-side-iconcontainer">
          <AccountBalanceIcon fontSize="large" className="frame-side-icon" />
          <Typography variant="caption">Lecture</Typography>
        </div>
      </Button>
    </div>
  );
}
