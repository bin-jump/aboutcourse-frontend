import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import './Header.less';

export default function Header(props) {
  //const user = useSelector((state) => state.auth.user);

  return (
    <div className="header">
      <div className="header-container">
        <Grid container>
          <Grid item xs={1}>
            <div className="header-logo"></div>
          </Grid>
          <Grid item xs={8} />
          <Grid item xs={2}>
            <div>User</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
