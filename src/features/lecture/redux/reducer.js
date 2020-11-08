import { reducer as fetchLecturesReducer } from './fetchLectures';
import { reducer as fetchSchoolsReducer } from './fetchSchools';
import { reducer as fetchMajorsReducer } from './fetchMajors';

const initialState = {
  lectures: [],
  fetchLecturesPending: false,
  lecturePageNum: 0,
  schools: [],
  fetchSchoolsPending: false,
  majors: [],
  fetchMajorsPending: false,
  lastError: null,
};

const reducers = [
  fetchLecturesReducer,
  fetchSchoolsReducer,
  fetchMajorsReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
