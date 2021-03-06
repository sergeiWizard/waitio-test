import React, { useState } from 'react';
import { FormattedNumber } from 'react-intl';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { Modal, Tabs } from 'antd';
import DiscoverUser from '../discover/DiscoverUser';
import { getUsers } from '../../waivioApi/ApiClient';
import { getAuthenticatedUserName } from '../reducers';
import './UserReblogModal.less';

const UserReblogModal = ({ visible, userNames, onCancel }) => {
  const [users, setUsers] = useState([]);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const authenticatedUserName = useSelector(getAuthenticatedUserName);
  const loadMoreUsers = () => {
    getUsers({
      listUsers: userNames,
      userName: authenticatedUserName,
      skip: users.length,
      limit: 20,
    }).then(data => {
      setUsers([...users, ...data.users]);
      setHasMoreUsers(data.hasMore);
    });
  };

  return (
    <Modal wrapClassName="UserReblogModal" visible={visible} footer={null} onCancel={onCancel}>
      <Tabs>
        <Tabs.TabPane
          tab={
            <div className="UserReblogModal__header">
              <i className="iconfont icon-share1 share" />
              <FormattedNumber value={userNames.length} />
            </div>
          }
          key="1"
        >
          <Scrollbars autoHide style={{ height: '400px' }}>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMoreUsers}
              hasMore={hasMoreUsers}
              useWindow={false}
            >
              <div className="UserReblogModal__content">
                {users.map(user => (
                  // eslint-disable-next-line no-underscore-dangle
                  <DiscoverUser key={user._id} user={user} isReblogged />
                ))}
              </div>
            </InfiniteScroll>
          </Scrollbars>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default UserReblogModal;

UserReblogModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  userNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCancel: PropTypes.func.isRequired,
};
