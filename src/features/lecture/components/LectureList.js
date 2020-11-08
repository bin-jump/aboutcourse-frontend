import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import UpdateIcon from '@material-ui/icons/Update';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
import Score from './Score';
import { useFetchLectures } from '../redux/hooks';
import './Style.less';

function LectureItem(props) {
  const { lecture } = { ...props };
  return (
    <Paper
      style={{
        padding: '10px 46px 6px 16px',
        marginBottom: 3,
        //minHeight: 100,
      }}
    >
      <Link to={`/lecture/2`}>
        <Typography variant="h5">{lecture.title}</Typography>
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
  );
}

export default function LectureList(props) {
  const { school, major } = { ...props };
  const sid = school ? school.id : null;
  const mid = major ? major.id : null;

  const {
    lectures,
    lecturePageNum,
    fetchLectures,
    fetchLecturesPending,
  } = useFetchLectures();

  console.log('length', lectures.length);

  // useEffect(() => {
  //   fetchLectures(sid, mid, 0);
  // }, [fetchLectures, sid, mid]);

  const loadMore = (pageNum) => {
    if (fetchLecturesPending) {
      return;
    }
    fetchLectures(sid, mid, lecturePageNum);
  };

  return (
    // <Paper>
    <div style={{ margin: '16px 0' }}>
      <InfiniteScroll
        pageStart={-1}
        loadMore={loadMore}
        hasMore={lecturePageNum >= 0}
        loader={
          <div style={{ width: '100%', alignItems: 'center' }}>
            <CircularProgress size={40} />
          </div>
        }
      >
        {lectures.map((item) => (
          <LectureItem lecture={item} />
        ))}
      </InfiniteScroll>
    </div>
    // </Paper>
  );
}
