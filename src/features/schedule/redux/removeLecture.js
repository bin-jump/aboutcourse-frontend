import { deleteRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SCHEDULE_REMOVE_LECTURE_BEGIN,
  SCHEDULE_REMOVE_LECTURE_SUCCESS,
  SCHEDULE_REMOVE_LECTURE_FAILURE,
} from './constants';

export function removeLecture(id) {
  let url = `/schedule/api/schedule/lecture/${id}`;

  return deleteRequest(
    url,
    SCHEDULE_REMOVE_LECTURE_BEGIN,
    SCHEDULE_REMOVE_LECTURE_SUCCESS,
    SCHEDULE_REMOVE_LECTURE_FAILURE,
    id,
  );
}

export function useRemoveLecture() {
  const dispatch = useDispatch();
  const { removeLecturePending, lastError } = useSelector(
    (state) => ({
      removeLecturePending: state.schedule.removeLecturePending,
      lastError: state.schedule.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (id) => {
      dispatch(removeLecture(id));
    },
    [dispatch],
  );

  return {
    removeLecture: boundAction,
    removeLecturePending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SCHEDULE_REMOVE_LECTURE_BEGIN:
      return {
        ...state,
        removeLecturePending: true,
        lastError: null,
      };

    case SCHEDULE_REMOVE_LECTURE_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.filter(
            (item) => !(item.id == action.id && item.taskType == 'LECTURE'),
          ),
        ],
        removeLecturePending: false,
        lastError: null,
      };

    case SCHEDULE_REMOVE_LECTURE_FAILURE:
      return {
        ...state,
        removeLecturePending: false,
        lastError: action.data.error,
      };
    default:
      return state;
  }
}
