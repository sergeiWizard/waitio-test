import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Switch } from 'antd';
import Feed from '../feed/Feed';
import { getIsAuthenticated, getAuthenticatedUser, getFeed } from '../reducers';
import {
  getFeedLoadingFromState,
  getFeedFetchedFromState,
  getFeedHasMoreFromState,
  getFeedFromState,
} from '../helpers/stateHelpers';
import { getUserProfileBlogPosts, getUserProfileBlogPostsWithForecasts } from '../feed/feedActions';
import { showPostModal } from '../app/appActions';
import EmptyUserProfile from '../statics/EmptyUserProfile';
import EmptyUserOwnProfile from '../statics/EmptyUserOwnProfile';
import PostModal from '../post/PostModalContainer';

@withRouter
@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    authenticatedUser: getAuthenticatedUser(state),
    feed: getFeed(state),
  }),
  {
    getUserProfileBlogPosts,
    getUserProfileBlogPostsWithForecasts,
    showPostModal,
  },
)
class UserProfile extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    authenticatedUser: PropTypes.shape().isRequired,
    feed: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    showPostModal: PropTypes.func.isRequired,
    limit: PropTypes.number,
    getUserProfileBlogPosts: PropTypes.func,
    getUserProfileBlogPostsWithForecasts: PropTypes.func,
    intl: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    limit: 10,
    location: {},
    getUserProfileBlogPosts: () => {},
    getUserProfileBlogPostsWithForecasts: () => {},
  };

  state = {
    checked: false,
    skip: 0,
  };

  componentDidMount() {
    const { match, limit } = this.props;
    const { name } = match.params;

    this.props.getUserProfileBlogPosts(name, { limit, initialLoad: true });
  }

  onSwitchChange = isAppFilterOn => {
    const { match, limit } = this.props;
    const { skip } = this.state;
    this.setState({ checked: isAppFilterOn });

    if (isAppFilterOn) {
      this.props.getUserProfileBlogPostsWithForecasts(match.params.name, true, skip, limit);
      this.setState(prevState => ({ skip: prevState.skip + limit }));
    } else {
      this.props.getUserProfileBlogPosts(match.params.name, { limit, initialLoad: true });
    }
  };

  render() {
    const { authenticated, authenticatedUser, feed, limit } = this.props;
    const username = this.props.match.params.name;
    const isOwnProfile = authenticated && username === authenticatedUser.name;
    const content = getFeedFromState('blog', username, feed);
    const isFetching = getFeedLoadingFromState('blog', username, feed);
    const fetched = getFeedFetchedFromState('blog', username, feed);
    const hasMore = getFeedHasMoreFromState('blog', username, feed);
    const loadMoreContentAction = () => {
      const { skip } = this.state;
      if (this.state.checked) {
        this.props.getUserProfileBlogPostsWithForecasts(username, false, skip, limit);
        this.setState(prevState => ({ skip: prevState.skip + limit }));
      } else {
        this.props.getUserProfileBlogPosts(username, { limit, initialLoad: false });
      }
    };

    return (
      <div>
        <div className="profile">
          <div className="feed-layout__switcher">
            <div className="feed-layout__text">
              {this.props.intl.formatMessage({
                id: 'onlyForecasts',
                defaultMessage: 'Only topics with forecasts',
              })}
            </div>
            <Switch
              defaultChecked
              onChange={this.onSwitchChange}
              checked={this.state.checked}
              size="small"
            />
          </div>
          <Feed
            content={content}
            isFetching={isFetching}
            hasMore={hasMore}
            loadMoreContent={loadMoreContentAction}
            showPostModal={this.props.showPostModal}
          />
          {_.isEmpty(content) && fetched && isOwnProfile && <EmptyUserOwnProfile />}
          {_.isEmpty(content) && fetched && !isOwnProfile && <EmptyUserProfile />}
        </div>
        {<PostModal />}
      </div>
    );
  }
}

export default injectIntl(UserProfile);
