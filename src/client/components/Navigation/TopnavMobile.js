import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AutoComplete, Icon, Input, Menu, Button } from 'antd';
import classNames from 'classnames';
import {
  resetSearchAutoCompete,
  searchAutoComplete,
  searchObjectsAutoCompete,
  searchObjectTypesAutoCompete,
  searchUsersAutoCompete,
} from '../../search/searchActions';
import { getUserMetadata } from '../../user/usersActions';
import { toggleModal } from '../../../investarena/redux/actions/modalsActions';
import { disconnectBroker } from '../../../investarena/redux/actions/brokersActions';
import {
  getAuthenticateduserMetaData,
  getAutoCompleteSearchResults,
  getIsAuthenticated,
  getIsLoadingNotifications,
  getNightmode,
  getNotifications,
  getScreenSize,
  getSearchObjectsResults,
  getSearchUsersResults,
  isGuestUser,
  searchObjectTypesResults,
} from '../../reducers';
import ModalBroker from '../../../investarena/components/Modals/ModalBroker';
import ModalDealConfirmation from '../../../investarena/components/Modals/ModalDealConfirmation';
import { PARSED_NOTIFICATIONS } from '../../../common/constants/notifications';
import BTooltip from '../BTooltip';
import Avatar from '../Avatar';
import PopoverMenu, { PopoverMenuItem } from '../PopoverMenu/PopoverMenu';
import PopoverContainer from '../Popover';
import Notifications from './Notifications/Notifications';
import LanguageSettings from './LanguageSettings';
import {
  getIsLoadingPlatformState,
  getPlatformNameState,
} from '../../../investarena/redux/selectors/platformSelectors';
import { getFieldWithMaxWeight } from '../../object/wObjectHelper';
import { objectFields } from '../../../common/constants/listOfFields';
import ObjectAvatar from '../ObjectAvatar';
import TopNavigation from './TopNavigation';
import { getTopPosts } from '../../../waivioApi/ApiClient';
import ModalSignUp from '../Authorization/ModalSignUp/ModalSignUp';
import ModalSignIn from '../Authorization/ModalSignIn/ModalSignIn';
import BrokerBalance from './BrokerBalance/BrokerBalance';
import './Topnav.less';

@injectIntl
@withRouter
@connect(
  state => ({
    autoCompleteSearchResults: getAutoCompleteSearchResults(state),
    isAuthenticated: getIsAuthenticated(state),
    searchByObject: getSearchObjectsResults(state),
    searchByUser: getSearchUsersResults(state),
    searchByObjectType: searchObjectTypesResults(state),
    notifications: getNotifications(state),
    userMetaData: getAuthenticateduserMetaData(state),
    loadingNotifications: getIsLoadingNotifications(state),
    screenSize: getScreenSize(state),
    isNightMode: getNightmode(state),
    platformName: getPlatformNameState(state),
    isLoadingPlatform: getIsLoadingPlatformState(state),
    isGuest: isGuestUser(state),
  }),
  {
    disconnectBroker,
    searchObjectsAutoCompete,
    searchAutoComplete,
    getUserMetadata,
    searchUsersAutoCompete,
    searchObjectTypesAutoCompete,
    resetSearchAutoCompete,
    toggleModal,
  },
)
class TopnavMobile extends React.Component {
  static handleScrollToTop() {
    if (window) {
      window.scrollTo(0, 0);
    }
  }

  static propTypes = {
    /* from decorators */
    intl: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
    /* from connect */
    autoCompleteSearchResults: PropTypes.oneOfType([
      PropTypes.shape(),
      PropTypes.arrayOf(PropTypes.shape()),
    ]),
    isAuthenticated: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.shape()),
    userMetaData: PropTypes.shape(),
    loadingNotifications: PropTypes.bool,
    searchAutoComplete: PropTypes.func.isRequired,
    getUserMetadata: PropTypes.func.isRequired,
    resetSearchAutoCompete: PropTypes.func.isRequired,
    platformName: PropTypes.string.isRequired,
    screenSize: PropTypes.string,
    toggleModal: PropTypes.func.isRequired,
    disconnectBroker: PropTypes.func.isRequired,
    /* passed props */
    username: PropTypes.string,
    onMenuItemClick: PropTypes.func,
    searchObjectsAutoCompete: PropTypes.func.isRequired,
    searchUsersAutoCompete: PropTypes.func.isRequired,
    searchObjectTypesAutoCompete: PropTypes.func.isRequired,
    searchByObject: PropTypes.arrayOf(PropTypes.shape()),
    searchByUser: PropTypes.arrayOf(PropTypes.shape()),
    searchByObjectType: PropTypes.arrayOf(PropTypes.shape()),
    openChat: PropTypes.func.isRequired,
    messagesCount: PropTypes.number,
    isGuest: PropTypes.bool,
  };

  static defaultProps = {
    autoCompleteSearchResults: {},
    searchByObject: [],
    searchByUser: [],
    searchByObjectType: [],
    notifications: [],
    username: undefined,
    onMenuItemClick: () => {},
    userMetaData: {},
    loadingNotifications: false,
    screenSize: 'medium',
    messagesCount: 0,
    isGuest: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchBarActive: false,
      popoverMobileMenuVisible: false,
      popoverProfileVisible: false,
      burgerMenuVisible: false,
      popoverBrokerVisible: false,
      searchBarValue: '',
      notificationsPopoverVisible: false,
      selectedPage: '',
      hotNewsPopoverVisible: false,
      searchData: '',
      currentItem: 'All',
      dropdownOpen: false,
      selectColor: false,
      dailyChosenPost: '',
      weeklyChosenPost: '',
      scrolling: false,
      visible: false,
    };
    this.handleMoreMenuSelect = this.handleMoreMenuSelect.bind(this);
    this.handleBrokerMenuSelect = this.handleBrokerMenuSelect.bind(this);
    this.handleMobileMenuVisibleChange = this.handleMobileMenuVisibleChange.bind(this);
    this.handleProfileMenuVisibleChange = this.handleProfileMenuVisibleChange.bind(this);
    this.handleBrokerMenuVisibleChange = this.handleBrokerMenuVisibleChange.bind(this);
    this.handleNotificationsPopoverVisibleChange = this.handleNotificationsPopoverVisibleChange.bind(
      this,
    );
    this.handleCloseNotificationsPopover = this.handleCloseNotificationsPopover.bind(this);
    this.handleSelectOnAutoCompleteDropdown = this.handleSelectOnAutoCompleteDropdown.bind(this);
    this.handleAutoCompleteSearch = this.handleAutoCompleteSearch.bind(this);
    this.handleSearchForInput = this.handleSearchForInput.bind(this);
    this.handleOnChangeForAutoComplete = this.handleOnChangeForAutoComplete.bind(this);
    this.hideAutoCompleteDropdown = this.hideAutoCompleteDropdown.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
  }

  componentDidMount() {
    if (window && window.screen.width < 768) {
      window.addEventListener('scroll', this.handleScroll);
      this.prevScrollpos = window.pageYOffset;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchBarValue !== this.state.searchBarValue &&
      this.state.searchBarValue !== ''
    ) {
      this.debouncedSearchByUser(this.state.searchBarValue);
      this.debouncedSearchByObjectTypes(this.state.searchBarValue);
    }
  }

  componentWillUnmount() {
    this.setState({ popoverBrokerVisible: false });
    if (window) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  getTranformSearchCountData = searchResults => {
    const { objectTypesCount, wobjectsCounts, usersCount } = searchResults;
    const wobjectAllCount = wobjectsCounts
      ? wobjectsCounts.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0)
      : null;
    const countAllSearch = objectTypesCount + usersCount + wobjectAllCount;
    const countArr = [{ name: 'All', count: countAllSearch }];
    if (!_.isEmpty(wobjectsCounts)) {
      _.forEach(wobjectsCounts, current => {
        const obj = {};
        obj.name = current.object_type;
        obj.count = current.count;
        obj.type = 'wobject';
        countArr.push(obj);
      });
    }
    if (objectTypesCount) {
      countArr.push({ name: 'Types', count: objectTypesCount, type: 'type' });
    }
    if (usersCount) {
      countArr.push({ name: 'Users', count: usersCount, type: 'user' });
    }
    return countArr;
  };

  static markers = {
    USER: 'user',
    WOBJ: 'wobj',
    TYPE: 'type',
    SELECT_BAR: 'searchSelectBar',
  };

  handleMoreMenuSelect(key) {
    this.setState({ popoverProfileVisible: false }, () => {
      this.props.onMenuItemClick(key);
    });
  }

  handleBurgerMenuSelect = key =>
    this.setState({ burgerMenuVisible: false }, () => {
      this.props.onMenuItemClick(key);
    });

  handleBrokerMenuSelect(key) {
    switch (key) {
      case 'deposit':
        this.setState({ popoverBrokerVisible: false, isModalDeposit: true });
        break;
      case 'broker-disconnect':
        this.setState({ popoverBrokerVisible: false }, () => {
          this.props.disconnectBroker('broker');
        });
        break;
      default:
        break;
    }
  }

  handleMobileMenuVisibleChange() {
    this.setState({ popoverMobileMenuVisible: !this.state.popoverMobileMenuVisible });
  }

  handleProfileMenuVisibleChange(visible) {
    this.setState({ popoverProfileVisible: visible });
  }

  handleBurgerMenuVisibleChange = visible => this.setState({ burgerMenuVisible: visible });

  handleBrokerMenuVisibleChange(visible) {
    this.setState({ popoverBrokerVisible: visible });
  }

  handleHotNewsPopoverVisibleChange = async () => {
    this.setState(prevState => ({ hotNewsPopoverVisible: !prevState.hotNewsPopoverVisible }));
    if (_.isEmpty(this.state.dailyChosenPost)) {
      getTopPosts()
        .then(data => {
          if (!_.isEmpty(data.daily_chosen_post) && !_.isEmpty(data.weekly_chosen_post)) {
            this.setState({
              dailyChosenPost: data.daily_chosen_post,
              weeklyChosenPost: data.weekly_chosen_post,
            });
          }
        })
        .catch(error => console.error(error));
    }
  };

  handleNotificationsPopoverVisibleChange(visible) {
    if (visible) {
      this.setState({ notificationsPopoverVisible: visible });
    } else {
      this.handleCloseNotificationsPopover();
    }
  }

  handleCloseNotificationsPopover() {
    this.setState({
      notificationsPopoverVisible: false,
    });
  }

  handleClickMenu = e => this.setState({ selectedPage: e.key });

  handleScroll = () => {
    const currentScrollPos = window && window.pageYOffset;
    const visible = this.prevScrollpos < currentScrollPos;

    this.prevScrollpos = currentScrollPos;

    if (this.state.visible !== visible) {
      this.setState({ visible });
    }
  };

  menuForLoggedOut = () => {
    const { location } = this.props;
    const { searchBarActive } = this.state;
    const next = location.pathname.length > 1 ? location.pathname : '';

    return (
      <div
        className={classNames('Topnav__menu-container Topnav__menu-logedout', {
          'Topnav__mobile-hidden': searchBarActive,
        })}
      >
        <Menu className="Topnav__menu" mode="horizontal">
          <Menu.Item className="Topnav__menu-item Topnav__menu-item--logedout" key="signup">
            <ModalSignUp isButton={false} />
          </Menu.Item>
          <Menu.Item
            className="Topnav__menu-item Topnav__menu-item--logedout"
            key="divider"
            disabled
          >
            |
          </Menu.Item>
          <Menu.Item className="Topnav__menu-item Topnav__menu-item--logedout" key="login">
            <ModalSignIn next={next} />
          </Menu.Item>
          <Menu.Item className="Topnav__menu-item Topnav__menu-item--logedout" key="language">
            <LanguageSettings />
          </Menu.Item>
        </Menu>
      </div>
    );
  };

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  burgerMenu = logStatus => {
    const isLoggedOut = logStatus === 'loggedOut';
    console.log('click')

    const {
      intl,
      username,
      userMetaData,
      notifications,
      loadingNotifications,
      isGuest,
      openChat,
      messagesCount,
      isAuthenticated,
      autoCompleteSearchResults
    } = this.props;

    const {
      notificationsPopoverVisible,
      searchBarActive,
      dropdownOpen
    } = this.state;

    const dropdownOptions = this.prepareOptions(autoCompleteSearchResults);

    const lastSeenTimestamp = _.get(userMetaData, 'notifications_last_timestamp');
    const notificationsCount = _.isUndefined(lastSeenTimestamp)
      ? _.size(notifications)
      : _.size(
        _.filter(
          notifications,
          notification =>
            lastSeenTimestamp < notification.timestamp &&
            _.includes(PARSED_NOTIFICATIONS, notification.type),
        ),
      );
    const displayBadge = notificationsCount > 0;
    const notificationsCountDisplay = notificationsCount > 99 ? '99+' : notificationsCount;

    return (
      <Menu
        className='TopnavMobile__menu-ant'
        style={{width: 256}}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline">

        <Menu.ItemGroup className='TopnavMobile__user' key='user-and-wallets'>
          <Menu.Item key="user">
            <Link className="TopnavMobile__user" to={`/@${username}`} onClick={TopnavMobile.handleScrollToTop}>
              <Avatar username={username} size={36} />
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup className='TopnavMobile__search' key='search-bar'>
          <Menu.Item>
            <AutoComplete
              dropdownClassName="Topnav__search-dropdown-container"
              dataSource={dropdownOptions}
              onSearch={this.handleAutoCompleteSearch}
              onSelect={this.handleSelectOnAutoCompleteDropdown}
              onChange={this.handleOnChangeForAutoComplete}
              defaultActiveFirstOption={false}
              dropdownMatchSelectWidth={false}
              optionLabelProp="value"
              dropdownStyle={{ color: 'red' }}
              value={this.state.searchBarValue}
              open={dropdownOpen}
              onFocus={this.handleOnFocus}
            >
              <Input
                ref={ref => {
                  this.searchInputRef = ref;
                }}
                onPressEnter={this.handleSearchForInput}
                placeholder={intl.formatMessage({
                  id: 'search_placeholder',
                  defaultMessage: 'What are you looking for?',
                })}
                autoCapitalize="off"
                autoCorrect="off"
              />
            </AutoComplete>
          </Menu.Item>
        </Menu.ItemGroup>



        <Menu className='TopnavMobile__widgets-bar' key='widgets-bar' style={{ border: "none" }}>
          <Menu.Item className="Topnav__menu-item" key="hot">
            {this.hotNews()}
          </Menu.Item>
          <Menu.Item className="Topnav__menu-item" key="write">
            <BTooltip
              placement="bottom"
              title={intl.formatMessage({ id: 'write_post', defaultMessage: 'Write post' })}
              overlayClassName="Topnav__notifications-tooltip"
              mouseEnterDelay={1}
            >
              <Link to="/editor" className="Topnav__link Topnav__link--action">
                <i className="iconfont icon-write" />
              </Link>
            </BTooltip>
          </Menu.Item>

          <Menu.Item className='Topnav__menu-item' key='chat'>
            {this.props.username && (
              <div className="TopnavMobile__chat" key="more">
                {!messagesCount ? (
                  <Icon type="message" className="icon-chat" onClick={openChat} />
                ) : (
                  <div className="TopnavMobile__chat-button" onClick={openChat} role="presentation">
                    {messagesCount > 99 ? '99+' : messagesCount}
                  </div>
                )}
              </div>
            )}
          </Menu.Item>

          <Menu.Item className="Topnav__menu-item" key="notifications">
            <BTooltip
              placement="bottom"
              title={intl.formatMessage({ id: 'notifications', defaultMessage: 'Notifications' })}
              overlayClassName="Topnav__notifications-tooltip"
              mouseEnterDelay={1}
            >
              <PopoverContainer
                placement="bottomRight"
                trigger="click"
                content={
                  <Notifications
                    notifications={notifications}
                    onNotificationClick={this.handleCloseNotificationsPopover}
                    st-card__chart
                    currentAuthUsername={username}
                    lastSeenTimestamp={lastSeenTimestamp}
                    loadingNotifications={loadingNotifications}
                    getUpdatedUserMetadata={this.props.getUserMetadata}
                  />
                }
                visible={notificationsPopoverVisible}
                onVisibleChange={this.handleNotificationsPopoverVisibleChange}
                overlayClassName="Notifications__popover-overlay"
                title={intl.formatMessage({ id: 'notifications', defaultMessage: 'Notifications' })}
              >
                <a className="Topnav__link Topnav__link--light Topnav__link--action">
                  {displayBadge ? (
                    <div className="Topnav__notifications-count">{notificationsCountDisplay}</div>
                  ) : (
                    <i className="iconfont icon-remind" />
                  )}
                </a>
              </PopoverContainer>
            </BTooltip>
          </Menu.Item>
        </Menu>

        <Menu className='TopnavMobile__menu-wrap' key='menu-items' style={{color: 'white'}}>
          <Menu.Item key='myFeed'>
            <FormattedMessage id="my_feed" defaultMessage="My feed" />
          </Menu.Item>
          <Menu.Item key='discover-objects'>
            <FormattedMessage id="discover" defaultMessage="Discover" />
          </Menu.Item>
          <Menu.Item key='discover-objects'>
            <FormattedMessage id="quick_forecast" defaultMessage="Forecast" />
          </Menu.Item>
          <Menu.Item key='activity'>
            <FormattedMessage id="activity" defaultMessage="Activity" />
          </Menu.Item>
          <Menu.Item key='bookmarks'>
            <FormattedMessage id="bookmarks" defaultMessage="Bookmarks" />
          </Menu.Item>
          <Menu.Item key='drafts'>
            <FormattedMessage id="drafts" defaultMessage="Drafts" />
          </Menu.Item>
          <Menu.Item key='settings'>
            <FormattedMessage id="settings" defaultMessage="Settings" />
          </Menu.Item>
          <Menu.Item key='replies'>
            <FormattedMessage id="replies" defaultMessage="Replies" />
          </Menu.Item>
          <Menu.Item key='wallet'>
            <FormattedMessage id="wallet" defaultMessage="Wallet" />
          </Menu.Item>
          <Menu.Item key='about'>
            <FormattedMessage id="about" defaultMessage="About" />
          </Menu.Item>
          <Menu.Item key='logout'>
            <FormattedMessage id="logout" defaultMessage="Logout" />
          </Menu.Item>
        </Menu>
      </Menu>
    );
  };

  hotNews = () => {
    const { intl } = this.props;
    const { hotNewsPopoverVisible, dailyChosenPost, weeklyChosenPost } = this.state;
    return (
      <BTooltip
        placement="bottom"
        title={intl.formatMessage({ id: 'hot_news', defaultMessage: 'Hot news' })}
        overlayClassName="Topnav__notifications-tooltip"
        mouseEnterDelay={1}
      >
        <PopoverContainer
          placement="bottomRight"
          trigger="click"
          content={
            <div className="Topnav__hot-news">
              {!_.isEmpty(dailyChosenPost) && (
                <Link
                  to={`/@${dailyChosenPost.author}/${dailyChosenPost.permlink}`}
                  className="Topnav__hot-news-item"
                  onClick={this.handleHotNewsPopoverVisibleChange}
                >
                  {dailyChosenPost.title}
                </Link>
              )}
              {!_.isEmpty(weeklyChosenPost) && (
                <Link
                  to={`/@${weeklyChosenPost.author}/${weeklyChosenPost.permlink}`}
                  className="Topnav__hot-news-item"
                  onClick={this.handleHotNewsPopoverVisibleChange}
                >
                  {weeklyChosenPost.title}
                </Link>
              )}
              <Link
                to="/economical-calendar"
                className="Topnav__hot-news-item"
                onClick={this.handleHotNewsPopoverVisibleChange}
              >
                Economical calendar
              </Link>
            </div>
          }
          visible={hotNewsPopoverVisible}
          onVisibleChange={this.handleHotNewsPopoverVisibleChange}
          overlayClassName="Notifications__popover-overlay"
          title={intl.formatMessage({ id: 'hot_news', defaultMessage: 'Hot news' })}
        >
          <Icon type="fire" className="iconfont fire-icon" />
        </PopoverContainer>
      </BTooltip>
    );
  };

  menuForLoggedIn = () => {
    const { searchBarActive } = this.state;
    const brandLogoPath = '/images/icons/ia-logo-mobile.png';
    return (
      <div
        className={classNames('Topnav__menu-container', {
          'Topnav__mobile-hidden': searchBarActive,
        })}
      >
        <ModalBroker />

        <div className="Topnav__menu-more">
          <Link to="/" className="Topnav__brand">
            <img alt="InvestArena" src={brandLogoPath} className="Topnav__brand-icon" />
          </Link>

          <a onClick={this.toggleVisible} className="Topnav__link Topnav__link--menu">
            <Icon type="menu" className="icon-menu" />
            {this.state.visible && this.burgerMenu()}
          </a>
        </div>

      </div>
    );
  };

  content = () => (this.props.username ? this.menuForLoggedIn() : this.menuForLoggedOut());

  handleMobileSearchButtonClick = () => {
    const { searchBarActive } = this.state;
    this.setState({ searchBarActive: !searchBarActive }, () => {
      this.searchInputRef.input.focus();
    });
  };

  hideAutoCompleteDropdown() {
    this.setState({ searchBarActive: false }, this.props.resetSearchAutoCompete);
  }

  handleSearchForInput(event) {
    const value = event.target.value;
    this.hideAutoCompleteDropdown();
    this.props.history.push({
      pathname: '/discover-objects',
      search: `search=${value}`,
      state: {
        query: value,
      },
    });
  }

  handleSearchAllResultsClick = () => {
    const { searchData, searchBarValue } = this.state;
    this.handleOnBlur();
    let redirectUrl = '';
    switch (searchData.type) {
      case 'wobject':
        redirectUrl = `/discover-objects/${searchData.subtype}?search=${searchBarValue}`;
        break;
      case 'user':
        redirectUrl = `/search?q=${searchBarValue}`;
        break;
      case 'type':
      default:
        redirectUrl = `/discover-objects?search=${searchBarValue}`;
        break;
    }
    this.props.history.push(redirectUrl);
  };

  debouncedSearch = _.debounce(value => this.props.searchAutoComplete(value, 3, 15), 300);
  debouncedSearchByObject = _.debounce((searchString, objType) =>
    this.props.searchObjectsAutoCompete(searchString, objType),
  );
  debouncedSearchByUser = _.debounce(searchString =>
    this.props.searchUsersAutoCompete(searchString),
  );
  debouncedSearchByObjectTypes = _.debounce(searchString =>
    this.props.searchObjectTypesAutoCompete(searchString),
  );

  handleAutoCompleteSearch(value) {
    this.debouncedSearch(value);
    this.setState({ dropdownOpen: true });
  }

  handleSelectOnAutoCompleteDropdown(value, data) {
    if (data.props.marker === Topnav.markers.SELECT_BAR) {
      const optionValue = value.split('#')[1];
      if (value === `${Topnav.markers.SELECT_BAR}#All`) {
        this.setState({
          searchData: '',
          dropdownOpen: true,
          currentItem: optionValue,
        });
        return;
      }

      const nextState = {
        searchData: {
          subtype: optionValue,
          type: data.props.type,
        },
        dropdownOpen: true,
        currentItem: optionValue,
      };
      if (data.props.type === 'wobject') {
        this.setState(nextState);
        this.debouncedSearchByObject(this.state.searchBarValue, optionValue);
        return;
      }

      if (data.props.type === 'user' || data.props.type === 'type') {
        this.setState(nextState);
        return;
      }
    }

    let redirectUrl = '';
    switch (data.props.marker) {
      case Topnav.markers.USER:
        redirectUrl = `/@${value.replace('user', '')}`;
        break;
      case Topnav.markers.WOBJ:
        redirectUrl = `/object/${value.replace('wobj', '')}`;
        break;
      default:
        redirectUrl = `/discover-objects/${value.replace('type', '')}`;
    }

    this.props.history.push(redirectUrl);
    this.setState({ dropdownOpen: false });
    this.hideAutoCompleteDropdown();
  }

  handleOnChangeForAutoComplete(value, data) {
    if (
      data.props.marker === Topnav.markers.TYPE ||
      data.props.marker === Topnav.markers.USER ||
      data.props.marker === Topnav.markers.WOBJ
    )
      this.setState({ searchBarValue: '' });
    else if (data.props.marker !== Topnav.markers.SELECT_BAR) {
      this.setState({ searchBarValue: value, searchData: '', currentItem: 'All' });
    }
  }

  usersSearchLayout(accounts) {
    return (
      <AutoComplete.OptGroup
        key="usersTitle"
        label={this.renderTitle(
          this.props.intl.formatMessage({
            id: 'users_search_title',
            defaultMessage: 'Users',
          }),
          _.size(accounts),
        )}
      >
        {_.map(accounts, option => (
          <AutoComplete.Option
            marker={Topnav.markers.USER}
            key={`user${option.account}`}
            value={`user${option.account}`}
            className="Topnav__search-autocomplete"
          >
            <div className="Topnav__search-content-wrap">
              <Avatar username={option.account} size={40} />
              <div className="Topnav__search-content">{option.account}</div>
            </div>
          </AutoComplete.Option>
        ))}
      </AutoComplete.OptGroup>
    );
  }

  wobjectSearchLayout(wobjects) {
    return (
      <AutoComplete.OptGroup
        key="wobjectsTitle"
        label={this.renderTitle(
          this.props.intl.formatMessage({
            id: 'wobjects_search_title',
            defaultMessage: 'Objects',
          }),
          _.size(wobjects),
        )}
      >
        {_.map(wobjects, option => {
          const wobjName = getFieldWithMaxWeight(option, objectFields.name);
          const parent = option.parent;
          return wobjName ? (
            <AutoComplete.Option
              marker={Topnav.markers.WOBJ}
              key={`wobj${wobjName}`}
              value={`wobj${option.author_permlink}`}
              className="Topnav__search-autocomplete"
            >
              <div className="Topnav__search-content-wrap">
                <ObjectAvatar item={option} size={40} />
                <div>
                  <div className="Topnav__search-content">{wobjName}</div>
                  {parent && (
                    <div className="Topnav__search-content-small">
                      {getFieldWithMaxWeight(parent, objectFields.name)}
                    </div>
                  )}
                </div>
              </div>
              <div className="Topnav__search-content-small">{option.object_type}</div>
            </AutoComplete.Option>
          ) : null;
        })}
      </AutoComplete.OptGroup>
    );
  }

  wobjectTypeSearchLayout(objectTypes) {
    return (
      <AutoComplete.OptGroup
        key="typesTitle"
        label={this.renderTitle(
          this.props.intl.formatMessage({
            id: 'wobjectType_search_title',
            defaultMessage: 'Types',
          }),
          _.size(objectTypes),
        )}
      >
        {_.map(objectTypes, option => (
          <AutoComplete.Option
            marker={Topnav.markers.TYPE}
            key={`type${option.name}`}
            value={`type${option.name}`}
            className="Topnav__search-autocomplete"
          >
            {option.name}
          </AutoComplete.Option>
        ))}
      </AutoComplete.OptGroup>
    );
  }

  prepareOptions(searchResults) {
    const { searchData } = this.state;
    const { searchByObject, searchByUser, searchByObjectType } = this.props;
    const dataSource = [];
    if (!_.isEmpty(searchResults)) {
      dataSource.push(this.searchSelectBar(searchResults));
    }
    if (!searchData) {
      if (!_.isEmpty(searchResults.wobjects))
        dataSource.push(this.wobjectSearchLayout(searchResults.wobjects.slice(0, 5)));
      if (!_.isEmpty(searchResults.users))
        dataSource.push(this.usersSearchLayout(searchResults.users));
      if (!_.isEmpty(searchResults.objectTypes))
        dataSource.push(this.wobjectTypeSearchLayout(searchResults.objectTypes));
    } else {
      if (searchData.type === 'wobject') {
        dataSource.push(this.wobjectSearchLayout(searchByObject.slice(0, 15)));
      }
      if (searchData.type === 'user') {
        dataSource.push(this.usersSearchLayout(searchByUser.slice(0, 15)));
      }
      if (searchData.type === 'type') {
        dataSource.push(this.wobjectTypeSearchLayout(searchByObjectType));
      }
    }
    return dataSource;
  }

  searchSelectBar = searchResults => {
    const options = this.getTranformSearchCountData(searchResults);
    return (
      <AutoComplete.OptGroup key={Topnav.markers.SELECT_BAR} label=" ">
        {_.map(options, option => (
          <AutoComplete.Option
            marker={Topnav.markers.SELECT_BAR}
            key={`type${option.name}`}
            value={`${Topnav.markers.SELECT_BAR}#${option.name}`}
            type={option.type}
            className={this.changeItemClass(option.name)}
          >
            {`${option.name}(${option.count})`}
          </AutoComplete.Option>
        ))}
      </AutoComplete.OptGroup>
    );
  };

  toggleModalBroker = () => {
    this.props.toggleModal('broker');
  };

  toggleModalDeposit = () => {
    this.setState({ isModalDeposit: !this.state.isModalDeposit });
  };

  changeItemClass = key =>
    classNames('ant-select-dropdown-menu-item', {
      'Topnav__search-selected-active': this.state.currentItem === key,
    });

  handleOnBlur = () => {
    this.setState({
      dropdownOpen: false,
    });
  };

  handleClearSearchData = () =>
    this.setState(
      {
        searchData: '',
        searchBarValue: '',
      },
      this.props.resetSearchAutoCompete,
    );

  handleOnFocus = () => this.setState({ dropdownOpen: true });

  scrollHandler = () => {
    this.setState({ scrolling: !this.state.scrolling });
  };

  renderTitle = title => <span>{title}</span>;

  render() {
    const {
      intl,
      isAuthenticated,
      screenSize,
      platformName,
    } = this.props;

    const isMobile = screenSize === 'xsmall' || screenSize === 'small';
    return (
      <div
        className='Topnav'
      >
        <ModalDealConfirmation />





        <div className="Topnav__right-bottom">
          {this.content()}
          {isAuthenticated && (
            <div
              className={classNames('Topnav__broker', {
                'justify-end': platformName === 'widgets',
              })}
            >
              {platformName === 'widgets' ? (
                <div className="st-header-broker-balance-pl-wrap">
                  <Button type="primary" onClick={this.toggleModalBroker}>
                    {intl.formatMessage({
                      id: 'headerAuthorized.connectToBeaxy',
                      defaultMessage: 'Connect to beaxy',
                    })}
                  </Button>
                </div>
              ) : (
                <BrokerBalance />
              )}
            </div>
          )}
        </div>



      </div>
    );
  }
}

export default TopnavMobile;
