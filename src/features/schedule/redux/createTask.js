import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SCHEDULE_CREATE_TASK_BEGIN,
  SCHEDULE_CREATE_TASK_SUCCESS,
  SCHEDULE_CREATE_TASK_FAILURE,
} from './constants';

export function createTask(task) {
  let url = `/schedule/api/schedule/task`;
  task = {
    ...task,
    startDate: task.startDate.getTime(),
    dueDate: task.dueDate.getTime(),
    startTime: task.startTime.getTime(),
    endTime: task.endTime.getTime(),
  };

  return postRequest(
    url,
    task,
    SCHEDULE_CREATE_TASK_BEGIN,
    SCHEDULE_CREATE_TASK_SUCCESS,
    SCHEDULE_CREATE_TASK_FAILURE,
  );
}

export function useCreateTask() {
  const dispatch = useDispatch();
  const { createTaskPending, lastError } = useSelector(
    (state) => ({
      createTaskPending: state.schedule.createTaskPending,
      lastError: state.schedule.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (task) => {
      dispatch(createTask(task));
    },
    [dispatch],
  );

  return {
    createTask: boundAction,
    createTaskPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SCHEDULE_CREATE_TASK_BEGIN:
      return {
        ...state,
        createTaskPending: true,
        lastError: null,
      };

    case SCHEDULE_CREATE_TASK_SUCCESS:
      return {
        ...state,
        items: [
          {
            ...action.data.data,
            startDate: new Date(action.data.data.startDate),
            dueDate: new Date(action.data.data.dueDate),
            startTime: new Date(action.data.data.startTime),
            endTime: new Date(action.data.data.endTime),
            taskType: 'TASK',
          },
          ...state.items,
        ],
        createTaskPending: false,
        lastError: null,
      };

    case SCHEDULE_CREATE_TASK_FAILURE:
      return {
        ...state,
        fetchItemsPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
