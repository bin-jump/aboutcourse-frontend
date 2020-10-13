import { combineReducers } from 'redux';
import scheduleReducer from '../features/schedule/redux/reducer';

const rootReducer = combineReducers({
  schedule: scheduleReducer,
});

export default rootReducer;
