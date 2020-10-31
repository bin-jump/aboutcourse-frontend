import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SearchHead from './components/SearchHead';
import LectureList from './components/LectureList';

export default function Lecture(props) {
  return (
    <div style={{ width: 800, height: 600, marginTop: 12 }}>
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        Lecture
      </Typography>
      <SearchHead />
      <LectureList />
    </div>
  );
}
