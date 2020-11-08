import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SCHEDULE_AUTOCOMPLETE_LECTURE_BEGIN,
  SCHEDULE_AUTOCOMPLETE_LECTURE_SUCCESS,
  SCHEDULE_AUTOCOMPLETE_LECTURE_FAILURE,
  SCHEDULE_AUTOCOMPLETE_LECTURE_RESET,
} from './constants';

let autolecture_request_version = 0;

export function autocompleteLecture(input) {
  autolecture_request_version += 1;
  if (!input) {
    return {
      type: SCHEDULE_AUTOCOMPLETE_LECTURE_RESET,
      extra: { version: autolecture_request_version },
    };
  }
  let url = `/schedule/api/schedule/search-course?q=${input}`;

  return getRequest(
    url,
    SCHEDULE_AUTOCOMPLETE_LECTURE_BEGIN,
    SCHEDULE_AUTOCOMPLETE_LECTURE_SUCCESS,
    SCHEDULE_AUTOCOMPLETE_LECTURE_FAILURE,
    null,
    { version: autolecture_request_version },
  );
}

export function useAutocompleteLecture() {
  const dispatch = useDispatch();
  const { lectures, autocompleteLecturesPending, lastError } = useSelector(
    (state) => ({
      lectures: state.schedule.autocompleteLectures,
      autocompleteLecturesPending: state.schedule.autocompleteLecturesPending,
      lastError: state.schedule.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (input) => {
      dispatch(autocompleteLecture(input));
    },
    [dispatch],
  );

  return {
    lectures,
    autocompleteLectures: boundAction,
    autocompleteLecturesPending,
    lastError,
  };
}

const formatLecture = (lecture) => {
  let res = { ...lecture };
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
  return res;
};

export function reducer(state, action) {
  switch (action.type) {
    case SCHEDULE_AUTOCOMPLETE_LECTURE_BEGIN:
      return {
        ...state,
        autocompleteLecturesPending: true,
        lastError: null,
      };

    case SCHEDULE_AUTOCOMPLETE_LECTURE_SUCCESS:
      if (action.extra.version < autolecture_request_version) {
        return state;
      }
      return {
        ...state,
        autocompleteLectures: [
          ...action.data.data.map((item) => formatLecture(item)),
        ],
        autocompleteLecturesPending: false,
        lastError: null,
      };

    case SCHEDULE_AUTOCOMPLETE_LECTURE_FAILURE:
      return {
        ...state,
        autocompleteLecturesPending: false,
        lastError: action.data.error,
      };
    case SCHEDULE_AUTOCOMPLETE_LECTURE_RESET:
      if (action.extra.version < autolecture_request_version) {
        return state;
      }
      return {
        ...state,
        autocompleteLectures: [],
        autocompleteLecturesPending: false,
      };

    default:
      return state;
  }
}
