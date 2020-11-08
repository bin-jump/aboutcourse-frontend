import { combineReducers } from 'redux';
import scheduleReducer from '../features/schedule/redux/reducer';
import lectureReducer from '../features/lecture/redux/reducer';

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  lecture: lectureReducer,
});

export default rootReducer;
