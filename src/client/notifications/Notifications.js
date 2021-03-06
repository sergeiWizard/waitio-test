import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as notificationConstants from '../../common/constants/notifications';
import { getUserMetadata } from '../user/usersActions';
import { getNotifications } from '../user/userActions';
import {
  getAuthenticatedUserMetaData,
  getNotifications as getNotificationsState,
  getIsLoadingNotifications,
  getAuthenticatedUserName,
} from '../reducers';
import requiresLogin from '../auth/requiresLogin';
import NotificationReply from '../components/Navigation/Notifications/NotificationReply';
import NotificationMention from '../components/Navigation/Notifications/NotificationMention';
import NotificationFollowing from '../components/Navigation/Notifications/NotificationFollowing';
import NotificationVote from '../components/Navigation/Notifications/NotificationVote';
import NotificationReblog from '../components/Navigation/Notifications/NotificationReblog';
import NotificationTransfer from '../components/Navigation/Notifications/NotificationTransfer';
import NotificationVoteWitness from '../components/Navigation/Notifications/NotificationVoteWitness';
import Loading from '../components/Icon/Loading';
import './Notifications.less';

class Notifications extends React.Component {
  static propTypes = {
    loadingNotifications: PropTypes.bool.isRequired,
    getUpdatedUserMetadata: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.shape()),
    currentAuthUsername: PropTypes.string,
    userMetaData: PropTypes.shape(),
  };

  static defaultProps = {
    notifications: [],
    currentAuthUsername: '',
    userMetaData: {},
  };

  componentDidMount() {
    const { userMetaData, notifications, currentAuthUsername } = this.props;

    if (_.isEmpty(userMetaData)) {
      this.props.getUpdatedUserMetadata();
    }

    if (_.isEmpty(notifications)) {
      this.props.getNotifications(currentAuthUsername);
    }
  }

  render() {
    const { notifications, currentAuthUsername, userMetaData, loadingNotifications } = this.props;
    const lastSeenTimestamp = _.get(userMetaData, 'notifications_last_timestamp');

    return (
      <div className="NotificationsPage">
        <div className="NotificationsPage__title">
          <h1>
            <FormattedMessage id="notifications" defaultMessage="Notifications" />
          </h1>
        </div>
        <div className="NotificationsPage__content">
          {loadingNotifications && (
            <div className="NotificationsPage__loading">
              <Loading />
            </div>
          )}
          {_.map(notifications, (notification, index) => {
            const key = `${index}${notification.timestamp}`;
            const read = lastSeenTimestamp >= notification.timestamp;
            switch (notification.type) {
              case notificationConstants.REPLY:
                return (
                  <NotificationReply
                    key={key}
                    notification={notification}
                    currentAuthUsername={currentAuthUsername}
                    read={read}
                  />
                );
              case notificationConstants.FOLLOW:
                return <NotificationFollowing key={key} notification={notification} read={read} />;
              case notificationConstants.MENTION:
                return <NotificationMention key={key} notification={notification} read={read} />;
              case notificationConstants.VOTE:
                return (
                  <NotificationVote
                    key={key}
                    notification={notification}
                    read={read}
                    currentAuthUsername={currentAuthUsername}
                  />
                );
              case notificationConstants.REBLOG:
                return (
                  <NotificationReblog
                    key={key}
                    notification={notification}
                    read={read}
                    currentAuthUsername={currentAuthUsername}
                  />
                );
              case notificationConstants.TRANSFER:
                return <NotificationTransfer key={key} notification={notification} read={read} />;
              case notificationConstants.WITNESS_VOTE:
                return (
                  <NotificationVoteWitness key={key} notification={notification} read={read} />
                );
              default:
                return null;
            }
          })}
          {_.isEmpty(notifications) && !loadingNotifications && (
            <div className="Notification Notification__empty">
              <FormattedMessage
                id="notifications_empty_message"
                defaultMessage="You currently have no notifications."
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    notifications: getNotificationsState(state),
    userMetaData: getAuthenticatedUserMetaData(state),
    currentAuthUsername: getAuthenticatedUserName(state),
    loadingNotifications: getIsLoadingNotifications(state),
  }),
  {
    getUpdatedUserMetadata: getUserMetadata,
    getNotifications,
  },
)(requiresLogin(Notifications));
