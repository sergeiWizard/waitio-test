import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { getAuthenticatedUser } from '../reducers';
import './Avatar.less';

export function getAvatarURL(username, size = 100, authenticatedUser) {
  const url = 'https://images.hive.blog/u';
  const lastAccountUpdate = !isEmpty(authenticatedUser)
    ? moment(authenticatedUser.updatedAt || authenticatedUser.last_account_update).unix()
    : '';

  if (username && username.includes('waivio_')) {
    return `https://waivio.nyc3.digitaloceanspaces.com/avatar/${username}?${lastAccountUpdate}`;
  }

  if (!isEmpty(authenticatedUser) && authenticatedUser.name === username) {
    return `${url}/${username}/avatar/large?${lastAccountUpdate}`;
  }

  return size > 64 ? `${url}/${username}/avatar` : `${url}/${username}/avatar/small`;
}

const Avatar = ({ username, size }) => {
  let style = {
    minWidth: `${size}px`,
    width: `${size}px`,
    height: `${size}px`,
  };
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const url = getAvatarURL(username, size, authenticatedUser);

  if (username) {
    style = {
      ...style,
      backgroundImage: `url(${url})`,
    };
  }

  return <div className="Avatar" style={style} title={username} />;
};

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  size: 100,
};

export default Avatar;
