import React, { useState, useRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import UpdateIcon from '@material-ui/icons/Update';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import './Style.less';

function Score(props) {
  const { value } = { ...props };
  const val = value || 0;

  const resolveStart = (i) => {
    //i += 1;
    if (i * 2 + 1 === val) {
      return <StarHalfIcon />;
    }
    if (i * 2 <= val) {
      return <StarIcon />;
    }
    return <StarBorderIcon />;
  };

  return (
    <div className="lecture-star">
      {[...Array(5).keys()].map((item, i) => (
        <>{resolveStart(i)}</>
      ))}
    </div>
  );
}

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
          <Typography variant="h5">{item.name}</Typography>
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
