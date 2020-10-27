import { deleteRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SCHEDULE_REMOVE_TASK_BEGIN,
  SCHEDULE_REMOVE_TASK_SUCCESS,
  SCHEDULE_REMOVE_TASK_FAILURE,
} from './constants';

export function removeTask(id) {
  let url = `/schedule/api/schedule/task/${id}`;

  return deleteRequest(
    url,
    SCHEDULE_REMOVE_TASK_BEGIN,
    SCHEDULE_REMOVE_TASK_SUCCESS,
    SCHEDULE_REMOVE_TASK_FAILURE,
    id,
  );
}

export function useRemoveTask() {
  const dispatch = useDispatch();
  const { removeTaskPending, lastError } = useSelector(
    (state) => ({
      removeTaskPending: state.schedule.removeTaskPending,
      lastError: state.schedule.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (task) => {
      dispatch(removeTask(task));
    },
    [dispatch],
  );

  return {
    removeTask: boundAction,
    removeTaskPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SCHEDULE_REMOVE_TASK_BEGIN:
      return {
        ...state,
        removeTaskPending: true,
        lastError: null,
      };

    case SCHEDULE_REMOVE_TASK_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.filter(
            (item) => !(item.id == action.id && item.taskType == 'TASK'),
          ),
        ],
        removeTaskPending: false,
        lastError: null,
      };

    case SCHEDULE_REMOVE_TASK_FAILURE:
      return {
        ...state,
        removeTaskPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
