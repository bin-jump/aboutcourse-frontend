import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  LECTURE_FETCH_LECTURE_BEGIN,
  LECTURE_FETCH_LECTURE_SUCCESS,
  LECTURE_FETCH_LECTURE_FAILURE,
  LECTURE_FETCH_LECTURE_RESET,
} from './constants';

let fetchlecture_version = 0;

export function fetchLectures(schoolId, majorId, page) {
  let url = `/lecture/api/course/lectures?page=${page}`;
  fetchlecture_version += 1;
  if (schoolId) {
    url += `&schoolId=${schoolId}`;
  }
  if (majorId) {
    url += `&majorId=${majorId}`;
  }

  return getRequest(
    url,
    LECTURE_FETCH_LECTURE_BEGIN,
    LECTURE_FETCH_LECTURE_SUCCESS,
    LECTURE_FETCH_LECTURE_FAILURE,
    null,
    { version: fetchlecture_version },
  );
}

export function useFetchLectures() {
  const dispatch = useDispatch();
  const {
    lectures,
    lecturePageNum,
    fetchLecturesPending,
    lastError,
  } = useSelector(
    (state) => ({
      lectures: state.lecture.lectures,
      lecturePageNum: state.lecture.lecturePageNum,
      fetchLecturesPending: state.lecture.fetchLecturesPending,
      lastError: state.lecture.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (schoolId, majorId, page) => {
      dispatch(fetchLectures(schoolId, majorId, page));
    },
    [dispatch],
  );

  const resetAction = useCallback(() => {
    fetchlecture_version += 1;
    dispatch({
      type: LECTURE_FETCH_LECTURE_RESET,
      extra: { version: fetchlecture_version },
    });
  }, [dispatch]);

  return {
    lectures,
    lecturePageNum,
    fetchLectures: boundAction,
    resetLectures: resetAction,
    fetchLecturesPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LECTURE_FETCH_LECTURE_BEGIN:
      return {
        ...state,
        fetchLecturesPending: true,
        lastError: null,
      };

    case LECTURE_FETCH_LECTURE_SUCCESS:
      if (action.extra.version < fetchlecture_version) {
        return state;
      }
      return {
        ...state,
        lectures: [...state.lectures, ...action.data.data],
        lecturePageNum: action.data.hasMore ? action.data.pageNumber + 1 : -1,
        fetchLecturesPending: false,
        lastError: null,
      };

    case LECTURE_FETCH_LECTURE_FAILURE:
      return {
        ...state,
        fetchLecturesPending: false,
        lastError: action.data.error,
      };

    case LECTURE_FETCH_LECTURE_RESET:
      if (action.extra.version < fetchlecture_version) {
        return state;
      }
      return {
        ...state,
        lectures: [],
        lecturePageNum: 0,
        fetchLecturesPending: false,
      };

    default:
      return state;
  }
}
