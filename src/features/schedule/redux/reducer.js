import { reducer as fetchItemsReducer } from './fetchItems';
import { reducer as createTaskReducer } from './createTask';

const initialState = {
  items: [],
  fetchItemsPending: false,
  createTaskPending: false,
  lastError: null,
};

const reducers = [fetchItemsReducer, createTaskReducer];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }

  return reducers.reduce((s, r) => r(s, action), newState);
}
