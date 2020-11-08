import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  LECTURE_FETCH_MAJOR_BEGIN,
  LECTURE_FETCH_MAJOR_SUCCESS,
  LECTURE_FETCH_MAJOR_FAILURE,
  LECTURE_FETCH_MAJOR_RESET,
} from './constants';

export function fetchMajors(schoolId) {
  let url = `/lecture/api/course/school/${schoolId}/majors`;

  return getRequest(
    url,
    LECTURE_FETCH_MAJOR_BEGIN,
    LECTURE_FETCH_MAJOR_SUCCESS,
    LECTURE_FETCH_MAJOR_FAILURE,
  );
}

export function useFetchMajors() {
  const dispatch = useDispatch();
  const { majors, fetchMajorsPending, lastError } = useSelector(
    (state) => ({
      majors: state.lecture.majors,
      fetchLecturesPending: state.lecture.fetchMajorsPending,
      lastError: state.lecture.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (schoolId) => {
      dispatch(fetchMajors(schoolId));
    },
    [dispatch],
  );

  const resetAction = useCallback(() => {
    dispatch({ type: LECTURE_FETCH_MAJOR_RESET });
  }, [dispatch]);

  return {
    majors,
    fetchMajors: boundAction,
    resetMajors: resetAction,
    fetchMajorsPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LECTURE_FETCH_MAJOR_BEGIN:
      return {
        ...state,
        fetchMajorsPending: true,
        lastError: null,
      };

    case LECTURE_FETCH_MAJOR_SUCCESS:
      return {
        ...state,
        majors: [...action.data.data],
        fetchMajorsPending: false,
        lastError: null,
      };

    case LECTURE_FETCH_MAJOR_FAILURE:
      return {
        ...state,
        fetchMajorsPending: false,
        lastError: action.data.error,
      };

    case LECTURE_FETCH_MAJOR_RESET:
      return {
        ...state,
        majors: [],
        fetchMajorsPending: false,
      };

    default:
      return state;
  }
}
