import { reducer as fetchItemsReducer } from './fetchItems';
import { reducer as createTaskReducer } from './createTask';
import { reducer as removeTaskReducer } from './removeTask';
import { reducer as addLectureReducer } from './addLecture';

const initialState = {
  items: [],
  fetchItemsPending: false,
  createTaskPending: false,
  removeTaskPending: false,
  addLecturePending: false,
  removeLecturePending: false,
  lastError: null,
};

const reducers = [
  fetchItemsReducer,
  createTaskReducer,
  removeTaskReducer,
  addLectureReducer,
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
