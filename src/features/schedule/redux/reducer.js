import { reducer as fetchItemsReducer } from './fetchItems';
import { reducer as createTaskReducer } from './createTask';
import { reducer as removeTaskReducer } from './removeTask';
import { reducer as addLectureReducer } from './addLecture';
import { reducer as removeLectureReducer } from './removeLecture';
import { reducer as autocompleteLectureReducer } from './autocompleteLecture';
import { reducer as autocompleteTageReducer } from './autocompleteTag';

const initialState = {
  items: [],
  fetchItemsPending: false,
  createTaskPending: false,
  removeTaskPending: false,
  addLecturePending: false,
  removeLecturePending: false,
  autocompleteLectures: [],
  autocompleteLecturesPending: false,
  autocompleteTags: [],
  autocompleteTagsPending: false,
  lastError: null,
};

const reducers = [
  fetchItemsReducer,
  createTaskReducer,
  removeTaskReducer,
  addLectureReducer,
  removeLectureReducer,
  autocompleteLectureReducer,
  autocompleteTageReducer,
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
