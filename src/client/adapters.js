import { objectFields } from '../common/constants/listOfFields';
import { getFieldWithMaxWeight } from './object/wObjectHelper';

export const getClientWObj = serverWObj => {
  /* eslint-disable no-underscore-dangle */
  /* eslint-disable camelcase */
  const {
    parents,
    author_permlink,
    followers_names,
    weight,
    created_at,
    updated_at,
    __v,
    users,
    children,
    user_count,
    isNew,
    rank,
    object_type,
  } = serverWObj;

  return {
    id: author_permlink,
    avatar: getFieldWithMaxWeight(serverWObj, objectFields.avatar) || '/images/logo-brand.png',
    name: getFieldWithMaxWeight(serverWObj, objectFields.name),
    title: getFieldWithMaxWeight(serverWObj, objectFields.title),
    parents: parents || [],
    weight: weight || '',
    createdAt: created_at || Date.now(),
    updatedAt: updated_at || Date.now(),
    children: children || [],
    users: users || [],
    userCount: user_count || 0,
    version: __v || 0,
    followersNames: followers_names,
    isNew: Boolean(isNew),
    rank: rank || 1,
    type: (object_type && object_type.toLowerCase()) || 'item',
    background: getFieldWithMaxWeight(serverWObj, objectFields.background),
  };
};

/* eslint-enable no-underscore-dangle */
/* eslint-enable camelcase */

export const getServerWObj = clientWObj => {
  const {
    id,
    author,
    creator,
    name,
    type,
    rank,
    version,
    createdAt,
    updatedAt,
    parents,
    children,
    weight,
    app,
    avatar,
    title,
    background,
  } = clientWObj;
  const fields = [
    {
      name: 'name',
      body: name,
    },
  ];
  if (avatar) {
    fields.push({ name: objectFields.avatar, body: avatar });
  }
  if (title) {
    fields.push({ name: objectFields.title, body: title });
  }
  if (background) {
    fields.push({ name: objectFields.background, body: background });
  }
  return {
    author_permlink: id,
    author,
    creator,
    default_name: name,
    object_type: type,
    __v: version,
    rank: rank || 1,
    weight: weight || '',
    parents: parents && parents.length ? parents : [],
    children: children && children.length ? children : [],
    app: app || 'waiviodev/1.0.0',
    community: '',
    createdAt: createdAt || Date.now(),
    updatedAt: updatedAt || Date.now(),
    fields,
  };
};

export default getClientWObj;
