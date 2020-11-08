import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  LECTURE_FETCH_SCHOOL_BEGIN,
  LECTURE_FETCH_SCHOOL_SUCCESS,
  LECTURE_FETCH_SCHOOL_FAILURE,
} from './constants';

export function fetchSchool() {
  let url = `/lecture/api/course/schools`;

  return getRequest(
    url,
    LECTURE_FETCH_SCHOOL_BEGIN,
    LECTURE_FETCH_SCHOOL_SUCCESS,
    LECTURE_FETCH_SCHOOL_FAILURE,
  );
}

export function useFetchSchools() {
  const dispatch = useDispatch();
  const { schools, fetchSchoolsPending, lastError } = useSelector(
    (state) => ({
      schools: state.lecture.schools,
      fetchLecturesPending: state.lecture.fetchSchoolsPending,
      lastError: state.lecture.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    dispatch(fetchSchool());
  }, [dispatch]);

  return {
    schools,
    fetchSchools: boundAction,
    fetchSchoolsPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LECTURE_FETCH_SCHOOL_BEGIN:
      return {
        ...state,
        fetchSchoolsPending: true,
        lastError: null,
      };

    case LECTURE_FETCH_SCHOOL_SUCCESS:
      return {
        ...state,
        schools: [...action.data.data],
        fetchSchoolsPending: false,
        lastError: null,
      };

    case LECTURE_FETCH_SCHOOL_FAILURE:
      return {
        ...state,
        fetchSchoolsPending: false,
        lastError: action.data.error,
      };

    default:
      return state;
  }
}
