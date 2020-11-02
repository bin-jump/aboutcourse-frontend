import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import UpdateIcon from '@material-ui/icons/Update';
import Score from './Score';
import './Style.less';

export default function SearchHead(props) {
  const { lectures } = { ...props };
  const data = lectures || [{ name: 'aaa' }, { name: 'bbb' }, { name: 'ccc' }];

  return (
    // <Paper>
    <div style={{ marginTop: 8 }}>
      {data.map((item) => (
        <Paper
          style={{
            padding: '10px 46px 6px 16px',
            marginBottom: 3,
            //minHeight: 100,
          }}
        >
          <Link to={`/lecture/2`}>
            <Typography variant="h5">{item.name}</Typography>
          </Link>

          <div style={{ marginTop: -6, marginBottom: 5 }}>
            <Typography
              style={{ color: '#c9c8ca', display: 'contents' }}
              variant="body2"
            >{`Univercity | Major`}</Typography>
            <div style={{ float: 'right' }}>
              <Score value={9} />
            </div>
          </div>
          <div className="lecture-icon-container">
            <div>
              <QuestionAnswerIcon style={{ marginRight: 8 }} />
              <Typography variant="body2">{12}</Typography>
            </div>
            <div>
              {/* <UpdateIcon style={{ marginRight: 8 }} /> */}
              <Typography variant="body2">{`Last Update: ${12}`}</Typography>
            </div>
          </div>
        </Paper>
      ))}
    </div>
    // </Paper>
  );
}
