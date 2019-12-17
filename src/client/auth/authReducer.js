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
      return {
        ...state,
        isAuthenticated: false,
        loaded: false,
        isGuestUser: false,
        user: {},
      };
    case GET_USER_METADATA.SUCCESS:
      return {
        ...state,
        userMetaData: action.payload,
      };
    default:
      return state;
  }
};

export const getIsAuthenticated = state => state.isAuthenticated;
export const getIsAuthFetching = state => state.isFetching;
export const getIsLoaded = state => state.loaded;
export const getIsReloading = state => state.isReloading;
export const getAuthenticatedUser = state => state.user;
export const getAuthenticatedUserName = state => state.user.name;
export const getAuthenticateduserMetaData = state => state.userMetaData;
