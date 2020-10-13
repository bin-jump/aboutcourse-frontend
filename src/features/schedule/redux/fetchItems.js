import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SCHEDULE_FETCH_ITEM_BEGIN,
  SCHEDULE_FETCH_ITEM_SUCCESS,
  SCHEDULE_FETCH_ITEM_FAILURE,
} from './constants';

export function fetchItems() {
  let url = `/schedule/api/schedule/my-schedule`;

  return getRequest(
    url,
    SCHEDULE_FETCH_ITEM_BEGIN,
    SCHEDULE_FETCH_ITEM_SUCCESS,
    SCHEDULE_FETCH_ITEM_FAILURE,
  );
}

export function useFetchItems() {
  const dispatch = useDispatch();
  const { items, fetchItemsPending, lastError } = useSelector(
    (state) => ({
      items: state.schedule.items,
      fetchItemsPending: state.schedule.fetchItemsPending,
      lastError: state.schedule.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return {
    items,
    fetchItems: boundAction,
    fetchItemsPending,
    lastError,
  };
}

const formatTask = (taskItem) => {
  let res = { ...taskItem.task, taskType: taskItem.taskType };
  if (res.taskType == 'TASK') {
    res.startDate = new Date(res.startDate);
    res.dueDate = new Date(res.dueDate);
    res.startTime = new Date(res.startTime);
    res.endTime = new Date(res.endTime);
  } else if (res.taskType == 'LECTURE') {
    res.startDate = new Date(res.startDate);
    res.dueDate = new Date(res.dueDate);
    let intervals = [];
    res.intervals.forEach((item) => {
      let interval = {
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
      };
      intervals.push(interval);
    });

    res = { ...res, intervals: intervals };
  }
  return res;
};

export function reducer(state, action) {
  switch (action.type) {
    case SCHEDULE_FETCH_ITEM_BEGIN:
      return {
        ...state,
        fetchItemsPending: true,
        lastError: null,
      };

    case SCHEDULE_FETCH_ITEM_SUCCESS:
      return {
        ...state,
        items: [...action.data.data.map(formatTask)],
        fetchItemsPending: false,
        lastError: null,
      };

    case SCHEDULE_FETCH_ITEM_FAILURE:
      return {
        ...state,
        fetchItemsPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
