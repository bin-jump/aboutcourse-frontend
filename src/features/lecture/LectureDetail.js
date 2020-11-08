import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Score from './components/Score';

function Comment(props) {
  const { isDiscussion, showReply } = { ...props };
  return (
    <div className="lecture-comment-item">
      <div className="comment-user-info">
        <Avatar>H</Avatar>
        <Typography variant="h6" style={{ marginLeft: 12 }}>
          name
        </Typography>
        <div style={{ margin: 'auto' }}></div>
        <Typography variant="caption" style={{ marginLeft: 12 }}>
          2020
        </Typography>
      </div>
      {isDiscussion ? (
        <div>
          <Score value={9} size="small" />
        </div>
      ) : null}

      <Typography
        variant={isDiscussion ? 'body1' : 'body2'}
        style={{ paddingLeft: 8 }}
      >
        In some situations you might not be able to use the Typography
        component. Hopefully, you might be able to take advantage of the
        typography keys of the theme.
      </Typography>
      <div style={{ paddingLeft: 3 }}>
        {showReply ? (
          <div style={{ display: 'flex' }}>
            <TextField fullWidth style={{ margin: '0 12px' }} />
            <Button>reply</Button>
          </div>
        ) : (
          <Button>Reply</Button>
        )}
      </div>
      <div style={{ paddingLeft: 42 }}>{isDiscussion ? <Comment /> : null}</div>
    </div>
  );
}

function WriteRating(props) {
  const [value, setValue] = useState(5);

  return (
    <div style={{ marginTop: 26, background: '#fbfbfb', padding: 16 }}>
      <Typography>Write Review</Typography>
      <TextField
        style={{ marginBottom: 12 }}
        fullWidth
        multiline
        variant="outlined"
        rows={3}
      />
      <div style={{ display: 'flex' }}>
        <Score value={value} onScoreChange={setValue} />
        <div style={{ margin: 'auto' }}></div>
        <Button variant="outlined">Comment</Button>
      </div>
    </div>
  );
}

export default function LectureDetail(props) {
  const [replies, setReplies] = useState({});

  return (
    <div>
      <Paper style={{ width: 800, minHeight: 400, padding: '36px 96px' }}>
        <Typography
          style={{ fontWeight: 'bold', marginBottom: 10 }}
          variant="h5"
        >
          Title
        </Typography>
        <Typography variant="subtitle">information</Typography>
        <div style={{ display: 'flex' }}>
          <Score value={9} />
          <Typography
            variant="h5"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {` ${9} / 32`}
          </Typography>
        </div>
        <hr style={{ marginTop: 10 }} />
        <WriteRating />
        <div style={{ marginTop: 32 }}>
          <Comment isDiscussion showReply />
          <Comment isDiscussion />
        </div>
      </Paper>
    </div>
  );
}
