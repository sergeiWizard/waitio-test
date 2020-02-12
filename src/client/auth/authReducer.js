import { get } from 'lodash';
import {createSelector} from "reselect";
import * as types from './authActions';
import { GET_USER_METADATA } from '../user/usersActions';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  isReloading: false,
  loaded: false,
  user: {},
  userMetaData: {},
  isGuestUser: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
      if (action.meta && action.meta.refresh) return state;
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        loaded: false,
        user: {},
      };
    case types.LOGIN_SUCCESS:
      if (action.meta && action.meta.refresh) return state;
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        loaded: true,
        user: action.payload.account || state.user,
        userMetaData: action.payload.userMetaData,
        isGuestUser: action.payload.isGuestUser,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        loaded: false,
      };
    case types.RELOAD_START:
      return {
        ...state,
        isReloading: true,
      };
    case types.RELOAD_SUCCESS:
      return {
        ...state,
        isReloading: false,
        user: action.payload.account || state.user,
      };
    case types.RELOAD_ERROR:
      return {
        ...state,
        isReloading: false,
      };
    case types.LOGOUT:
      return initialState;
    case GET_USER_METADATA.SUCCESS:
      return {
        ...state,
        userMetaData: action.payload,
      };
    case types.UPDATE_PROFILE_START:
      return {
        ...state,
        isFetching: true,
      };
    case types.UPDATE_PROFILE_SUCCESS: {
      if (action.payload.isProfileUpdated) {
        return {
          ...state,
          isFetching: false,
          user: {
            ...state.user,
            json_metadata: action.meta,
          },
        };
      }
      return state;
    }
    case types.UPDATE_PROFILE_ERROR:
      return state;
    default:
      return state;
  }
};

export const getIsAuthenticatedState = state => state.isAuthenticated;
export const getIsAuthenticated = createSelector(
  [getIsAuthenticatedState],
  isAuthenticated => isAuthenticated
);
export const getIsAuthFetchingState = state => state.isFetching;
export const getIsAuthFetching = createSelector(
  [getIsAuthFetchingState],
  isFetching => isFetching
);
export const getIsLoadedState = state => state.loaded;
export const getIsLoaded = createSelector(
  [getIsLoadedState],
  loaded => loaded
);
export const getIsReloading = state => state.isReloading;

export const getAuthenticatedUserState = state => state.user;
export const getAuthenticatedUser = createSelector(
  [getAuthenticatedUserState],
  user => user
);
export const getAuthenticatedUserNameState = state => state.user.name;
export const getAuthenticatedUserName = createSelector(
  [getAuthenticatedUserNameState],
  name => name
);
export const getAuthenticateduserMetaData = state => state.userMetaData;

export const getAuthenticatedUserAvatar = createSelector(
  state => {
    let jsonMetadata = get(state, 'user.json_metadata');
    if (jsonMetadata) {
      jsonMetadata = JSON.parse(state.user.json_metadata);
      return get(jsonMetadata, 'profile.profile_image');
    }
    return undefined;
  }
);
export const isGuestUser = state => state.isGuestUser;
