import _ from 'lodash';
import { supportedObjectFields } from '../../../src/common/constants/listOfFields';
import { WAIVIO_META_FIELD_NAME } from '../../common/constants/waivio';

// set innerField to "null" to get whole parsed object
export const getFieldWithMaxWeight = (wObject, currentField, innerField) => {
  const field = supportedObjectFields.includes(currentField);
  if (!field) return '';

  const fieldValues = _.filter(wObject.fields, ['name', currentField]);
  if (!fieldValues) return '';

  const orderedValues = _.orderBy(fieldValues, ['weight'], ['desc']);
  if (!orderedValues.length) return '';

  let value = '';

  _.forEach(orderedValues, fld => {
    try {
      const parsed = JSON.parse(fld.body);
      value = innerField === null ? parsed : parsed[innerField];
      return false;
    } catch (e) {
      value = fld.body;
      return false;
    }
  });

  return value || '';
};

export const getField = (wObject, currentField, fieldName) => {
  const wo = _.find(wObject.fields, ['name', currentField]);

  if (!wo) return '';

  let parsed = null;

  try {
    parsed = JSON.parse(wo.body);
  } catch (e) {
    //
  }
  return parsed ? parsed[fieldName] : wo.body;
};

export const getFieldsCount = (wObject, fieldName) =>
  wObject.fields.filter(field => field.name === fieldName).length;

export const truncate = str => (str && str.length > 255 ? `${str.substring(0, 255)}...` : str);

export const hasActionType = (post, actionTypes = ['createObject', 'appendObject']) => {
  const parsedMetadata = post && post.json_metadata && JSON.parse(post.json_metadata);
  if (!parsedMetadata) return false;

  const objActionType =
    parsedMetadata[WAIVIO_META_FIELD_NAME] && parsedMetadata[WAIVIO_META_FIELD_NAME].action;
  const appendingField =
    parsedMetadata[WAIVIO_META_FIELD_NAME] && parsedMetadata[WAIVIO_META_FIELD_NAME].field;
  return (
    actionTypes.includes(objActionType) &&
    appendingField &&
    supportedObjectFields.includes(appendingField.name)
  );
};

export const mapObjectAppends = (comments, wObj) => {
  const filteredComments = Object.values(comments).filter(comment => hasActionType(comment));
  return wObj.fields.map(field => {
    const matchComment = filteredComments.find(
      comment => comment.permlink === field.permlink && comment.author === field.author,
    );
    const rankedUser = wObj.users && wObj.users.find(user => user.name === field.creator);
    return {
      ...matchComment,
      author: field.creator,
      author_original: field.author,
      author_rank: (rankedUser && rankedUser.rank) || 0,
      append_field_name: field.name || '',
      append_field_weight: field.weight || null,
    };
  });
};

export const hasField = (post, fieldName, locale) => {
  const parsedMetadata = post && post.json_metadata && JSON.parse(post.json_metadata);
  if (!parsedMetadata) return false;

  const field =
    parsedMetadata[WAIVIO_META_FIELD_NAME] && parsedMetadata[WAIVIO_META_FIELD_NAME].field;
  return !(fieldName && !(field.name === fieldName)) && !(locale && !(field.locale === locale));
};