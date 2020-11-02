import React from 'react';
import { useParams, Route } from 'react-router-dom';
import Lecture from './Lecture';
import LectureDetail from './LectureDetail';

export default function Index(props) {
  return (
    <div>
      <Route path={`/lecture`} exact render={(props) => <Lecture />} />
      <Route
        path={`/lecture/:id`}
        exact
        render={(props) => <LectureDetail />}
      />
    </div>
  );
}
