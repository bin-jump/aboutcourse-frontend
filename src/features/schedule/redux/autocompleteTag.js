import { getRequest } from '../../common/helper';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SCHEDULE_AUTOCOMPLETE_TAG_BEGIN,
  SCHEDULE_AUTOCOMPLETE_TAG_SUCCESS,
  SCHEDULE_AUTOCOMPLETE_TAG_FAILURE,
  SCHEDULE_AUTOCOMPLETE_TAG_RESET,
} from './constants';

let autotag_request_version = 0;

export function autocompleteTag(input) {
  autotag_request_version += 1;
  if (!input) {
    return {
      type: SCHEDULE_AUTOCOMPLETE_TAG_RESET,
      extra: { version: autotag_request_version },
    };
  }
  let url = `/schedule/api/schedule/search-tag?q=${input}`;

  return getRequest(
    url,
    SCHEDULE_AUTOCOMPLETE_TAG_BEGIN,
    SCHEDULE_AUTOCOMPLETE_TAG_SUCCESS,
    SCHEDULE_AUTOCOMPLETE_TAG_FAILURE,
    null,
    { version: autotag_request_version },
  );
}

export function useAutocompleteTag() {
  const dispatch = useDispatch();
  const { tags, autocompleteTagsPending, lastError } = useSelector(
    (state) => ({
      tags: state.schedule.autocompleteTags,
      autocompleteLecturesPending: state.schedule.autocompleteTagsPending,
      lastError: state.schedule.lastError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (input) => {
      dispatch(autocompleteTag(input));
    },
    [dispatch],
  );

  return {
    tags,
    autocompleteTags: boundAction,
    autocompleteTagsPending,
    lastError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SCHEDULE_AUTOCOMPLETE_TAG_BEGIN:
      return {
        ...state,
        autocompleteTagsPending: true,
        lastError: null,
      };

    case SCHEDULE_AUTOCOMPLETE_TAG_SUCCESS:
      if (action.extra.version < autotag_request_version) {
        return state;
      }
      return {
        ...state,
        autocompleteTags: [...action.data.data],
        autocompleteTagsPending: false,
        lastError: null,
      };

    case SCHEDULE_AUTOCOMPLETE_TAG_FAILURE:
      return {
        ...state,
        autocompleteTagsPending: false,
        lastError: action.data.error,
      };
    case SCHEDULE_AUTOCOMPLETE_TAG_RESET:
      if (action.extra.version < autotag_request_version) {
        return state;
      }
      return {
        ...state,
        autocompleteTags: [],
        autocompleteTagsPending: false,
      };

    default:
      return state;
  }
}
