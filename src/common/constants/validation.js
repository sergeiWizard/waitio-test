/* eslint-disable */
import { objectFields } from './listOfFields';

export const objectNameValidationRegExp = /^[^!@#$%^&*(),.?":{}|<>]{0,100}$/;

export const objectURLValidationRegExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const ALLOWED_IMG_FORMATS = ['jpg', 'jpeg', 'png', 'gif'];
export const MAX_IMG_SIZE = {
  [objectFields.avatar]: 2097152,
  [objectFields.background]: 15728640,
};

export default null;