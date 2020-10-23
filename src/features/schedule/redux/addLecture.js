import { postRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SCHEDULE_ADD_LECTURE_BEGIN,
  SCHEDULE_ADD_LECTURE_SUCCESS,
  SCHEDULE_ADD_LECTURE_FAILURE,
} from './constants';

export function addLecture(lecture) {
  let url = `/schedule/api/schedule/lecture`;
  lecture = {
    ...lecture,
    startDate: lecture.startDate.getTime(),
    dueDate: lecture.dueDate.getTime(),
    intervals: lecture.intervals.map((item) => {
      return {
        ...item,
        start: item.start.getTime(),
        end: item.end.getTime(),
      };
    }),
  };

  return postRequest(
    url,
    lecture,
    SCHEDULE_ADD_LECTURE_BEGIN,
    SCHEDULE_ADD_LECTURE_SUCCESS,
    SCHEDULE_ADD_LECTURE_FAILURE,
  );
}

export function useAddLecture() {
  const dispatch = useDispatch();
  const { addLecturePending, lastError } = useSelector(
    (state) => ({
      addLecturePending: state.schedule.addLecturePending,
      lastError: state.schedule.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (lecture) => {
      dispatch(addLecture(lecture));
    },
    [dispatch],
  );

  return {
    addLecture: boundAction,
    addLecturePending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SCHEDULE_ADD_LECTURE_BEGIN:
      return {
        ...state,
        addLecturePending: true,
        lastError: null,
      };

    case SCHEDULE_ADD_LECTURE_SUCCESS:
      let lecture = {
        ...action.data.data,
        startDate: new Date(action.data.data.startDate),
        endDate: new Date(action.data.data.endDate),
        intervals: action.data.data.intervals.map((item) => {
          return {
            ...item,
            start: new Date(item.start),
            end: new Date(item.end),
          };
        }),
      };
      return {
        ...state,
        items: [
          {
            ...lecture,
            taskType: 'LECTURE',
          },
          ...state.items,
        ],
        addLecturePending: false,
        lastError: null,
      };

    case SCHEDULE_ADD_LECTURE_FAILURE:
      return {
        ...state,
        addLecturePending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
