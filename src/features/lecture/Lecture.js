import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SearchHead from './components/SearchHead';
import LectureList from './components/LectureList';
import { useFetchLectures } from './redux/hooks';

export default function Lecture(props) {
  const [school, setSchool] = useState(null);
  const [major, setMajor] = useState(null);
  const [majorInput, setMajorInput] = useState('');

  const { resetLectures } = useFetchLectures();

  const onSchoolChange = (s) => {
    setSchool(s);
    resetLectures();
    if (!s || (school && s.id != school.id)) {
      setMajor(null);
      setMajorInput('');
    }
  };

  const onMajorChange = (m) => {
    // if same major
    if (major && m && major.id == m.id) {
      return;
    }

    resetLectures();
    if (!m) {
      setMajorInput('');
    }
    setMajor(m);
  };

  return (
    <div style={{ width: 800, minHeight: 600, marginTop: 12 }}>
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        Lecture
      </Typography>
      <SearchHead
        school={school}
        major={major}
        onSchoolChange={onSchoolChange}
        onMajorChange={onMajorChange}
        majorInput={majorInput}
        setMajorInput={setMajorInput}
      />
      <LectureList school={school} major={major} />
    </div>
  );
}
