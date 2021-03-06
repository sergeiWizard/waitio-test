import _ from 'lodash';
import React from 'react';
import { Button, Icon, Tag } from 'antd';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import {
  haveAccess,
  hasType,
  accessTypesArr,
  calculateApprovePercent,
  getApprovedField,
} from '../../helpers/wObjectHelper';
import SocialLinks from '../../components/SocialLinks';
import {
  getFieldWithMaxWeight,
  getFieldsCount,
  getInnerFieldWithMaxWeight,
  sortListItemsBy,
  combineObjectMenu,
  getFieldsByName,
} from '../../object/wObjectHelper';
import {
  objectFields,
  TYPES_OF_MENU_ITEM,
  addressFields,
  linkFields,
  getAllowedFieldsByObjType,
} from '../../../common/constants/listOfFields';
import URL from '../../../common/constants/routing';
import OBJECT_TYPE from '../../object/const/objectTypes';
import Proposition from '../../components/Proposition/Proposition';
import { isCoordinatesValid } from '../../components/Maps/mapHelper';
import PicturesCarousel from '../../object/PicturesCarousel';
import IconButton from '../../components/IconButton';
import { getIsAuthenticated, getObjectAlbums, getSuitableLanguage } from '../../reducers';
import DescriptionInfo from './DescriptionInfo';
import CreateImage from '../../object/ObjectGallery/CreateImage';
import RateInfo from '../../components/Sidebar/Rate/RateInfo';
import MapObjectInfo from '../../components/Maps/MapObjectInfo';
import ObjectCard from '../../components/Sidebar/ObjectCard';
import { getClientWObj } from '../../adapters';
import LinkButton from '../../components/LinkButton/LinkButton';
import ExpandingBlock from './ExpandingBlock';
import './ObjectInfo.less';

@withRouter
@connect(state => ({
  albums: getObjectAlbums(state),
  isAuthenticated: getIsAuthenticated(state),
  usedLocale: getSuitableLanguage(state),
}))
class ObjectInfo extends React.Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    wobject: PropTypes.shape().isRequired,
    userName: PropTypes.string.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    albums: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    usedLocale: PropTypes.string.isRequired,
    history: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    getAreaSearchData: () => {},
    userLocation: {},
    center: [],
  };

  state = {
    selectedField: null,
    showModal: false,
    showMore: {},
  };

  getLink = link => {
    if (link && link.indexOf('http://') === -1 && link.indexOf('https://') === -1) {
      return `http://${link}`;
    }
    return link;
  };

  getFieldLayout = (fieldName, params) => {
    switch (fieldName) {
      case objectFields.phone:
        return (
          <div key={params.number} className="flex">
            <div className="self-start">
              <Icon type="phone" className="text-icon tel" />
            </div>
            <div className="flex flex-column">
              {Boolean(params.body) && <div className="phone-title">{params.body}</div>}
              <a href={`tel:${params.number}`}>{params.number}</a>
            </div>
          </div>
        );
      default:
        break;
    }
    return null;
  };

  handleSelectField = field => () => this.setState({ selectedField: field });

  handleToggleModal = () => this.setState(prevState => ({ showModal: !prevState.showModal }));

  renderCategoryItems = (categoryItems, category) => {
    if (!_.isEmpty(categoryItems)) {
      const onlyFiveItems = categoryItems.filter((f, i) => i < 5);
      const tagArray = this.state.showMore[category] ? categoryItems : onlyFiveItems;

      return (
        <div>
          {tagArray.map(item => (
            <Tag color="orange">
              <Link to={`/object/${item.name}`}>{item.name}</Link>
            </Tag>
          ))}
          {categoryItems.length > 5 && !this.state.showMore[category] && (
            <span
              role="presentation"
              className="show-more"
              onClick={() =>
                this.setState({
                  showMore: {
                    [category]: true,
                  },
                })
              }
            >
              <FormattedMessage id="show_more" defaultMessage="Show more" />
              ...
            </span>
          )}
        </div>
      );
    }

    return null;
  };

  renderTagCategories = tagCategories => {
    const filteredTagCategories =
      tagCategories &&
      tagCategories.filter(
        category =>
          calculateApprovePercent(category.active_votes) >= 70 && category.categoryItems.length,
      );
    if (filteredTagCategories) {
      return filteredTagCategories.map(item => (
        <div key={item.id}>
          {`${item.body}:`}
          <br />
          {this.renderCategoryItems(item.categoryItems, item.body)}
        </div>
      ));
    }
    return null;
  };

  render() {
    const { location, wobject, userName, albums, isAuthenticated, usedLocale } = this.props;
    const isEditMode = isAuthenticated ? this.props.isEditMode : false;
    const { showModal, selectedField } = this.state;
    const { status, website, newsFilter } = wobject;
    const renderFields = getAllowedFieldsByObjType(wobject.type);
    const isRenderGallery = ![OBJECT_TYPE.LIST, OBJECT_TYPE.PAGE].includes(wobject.type);
    const isRenderMenu = isRenderGallery;

    let names = [];
    let addressArr = [];
    let address = '';
    let description = '';
    let price = '';
    let workTime = '';
    let avatar = '';
    let short = '';
    let background = '';
    let photosCount = 0;
    let tagCategories = [];
    let phones = [];
    let email = '';
    let menuItems = [];
    let menuLists = null;
    let menuPages = null;
    const button = getApprovedField(wobject, 'button', usedLocale);
    const map = getApprovedField(wobject, 'map', usedLocale);
    const parent = getApprovedField(wobject, 'parent', usedLocale);

    if (_.size(wobject) > 0) {
      names = getFieldsByName(wobject, objectFields.name)
        .filter(
          nameFld =>
            nameFld.body !== wobject.name && calculateApprovePercent(nameFld.active_votes) >= 70,
        )
        .map(nameFld => <div key={nameFld.permlink}>{nameFld.body}</div>);

      const adressFields = getInnerFieldWithMaxWeight(wobject, objectFields.address);
      addressArr = adressFields
        ? Object.values(addressFields).map(fieldName => adressFields[fieldName])
        : [];
      address = _.compact(addressArr).join(', ');

      description = getFieldWithMaxWeight(wobject, objectFields.description);
      avatar = getInnerFieldWithMaxWeight(wobject, objectFields.avatar);
      background = getFieldWithMaxWeight(wobject, objectFields.background);

      short = getFieldWithMaxWeight(wobject, objectFields.title);

      workTime = getFieldWithMaxWeight(wobject, objectFields.workTime);

      email = getFieldWithMaxWeight(wobject, objectFields.email);

      price = getFieldWithMaxWeight(wobject, objectFields.price);

      menuItems = _.uniqBy(_.get(wobject, 'menuItems', []), 'author_permlink');

      menuItems = menuItems.map(item => {
        const matchField = _.get(wobject, 'fields', []).find(field => field.alias === item.alias);
        const activeVotes = matchField ? matchField.active_votes : [];

        return {
          ...item,
          active_votes: [...activeVotes],
        };
      });
      menuLists =
        menuItems.length && menuItems.some(item => item.object_type === OBJECT_TYPE.LIST)
          ? menuItems.filter(item => calculateApprovePercent(item.active_votes) >= 70)
          : null;

      menuPages =
        menuItems.length && menuItems.some(item => item.object_type === OBJECT_TYPE.PAGE)
          ? menuItems.filter(
              item =>
                item.object_type === OBJECT_TYPE.PAGE &&
                calculateApprovePercent(item.active_votes) >= 70,
            )
          : null;

      photosCount = wobject.photos_count;

      tagCategories = wobject.tagCategories;

      const filteredPhones = wobject.fields.filter(
        field =>
          field.name === objectFields.phone && calculateApprovePercent(field.active_votes) >= 70,
      );
      phones = _.orderBy(filteredPhones, ['weight'], ['desc']);
    }

    const linkField = getInnerFieldWithMaxWeight(wobject, objectFields.link);
    let profile = linkField
      ? {
          facebook: linkField[linkFields.linkFacebook] || '',
          twitter: linkField[linkFields.linkTwitter] || '',
          youtube: linkField[linkFields.linkYouTube] || '',
          instagram: linkField[linkFields.linkInstagram] || '',
          github: linkField[linkFields.linkGitHub] || '',
        }
      : {};

    profile = _.pickBy(profile, _.identity);
    const accessExtend = haveAccess(wobject, userName, accessTypesArr[0]) && isEditMode;
    const album = _.filter(albums, _.iteratee(['id', wobject.author_permlink]));
    const hasGalleryImg = wobject.preview_gallery && wobject.preview_gallery[0];

    const isRenderMap =
      map && map.latitude && map.longitude && isCoordinatesValid(map.latitude, map.longitude);
    // name - name of field OR type of menu-item (TYPES_OF_MENU_ITEM)
    const listItem = (name, content) => {
      const fieldsCount = getFieldsCount(wobject, name);
      const shouldDisplay = renderFields.includes(name) || _.includes(TYPES_OF_MENU_ITEM, name);
      return shouldDisplay && (content || accessExtend) ? (
        <div className="field-info">
          <React.Fragment>
            {accessExtend && (
              <div className="field-info__title">
                <Proposition
                  objectID={wobject.author_permlink}
                  fieldName={name}
                  objName={wobject.name}
                  handleSelectField={this.handleSelectField}
                  selectedField={selectedField}
                  linkTo={
                    name === objectFields.pageContent
                      ? `/object/${wobject.author_permlink}/${OBJECT_TYPE.PAGE}`
                      : ''
                  }
                />
                {fieldsCount}
              </div>
            )}
            {content ? (
              <div
                className={`field-info__content ${name}-field-${isEditMode ? 'edit' : 'view'}`}
                data-test={`${name}-field-view`}
              >
                {content}
              </div>
            ) : null}
          </React.Fragment>
        </div>
      ) : null;
    };

    const getMenuSectionLink = item => {
      let menuItem = (
        <LinkButton
          className={classNames('menu-btn', {
            active: location.hash.slice(1).split('/')[0] === item.author_permlink,
          })}
          to={`/object/${wobject.author_permlink}/${URL.SEGMENT.MENU}#${item.author_permlink}`}
        >
          {item.alias || item.name || getFieldWithMaxWeight(item, objectFields.name)}
        </LinkButton>
      );
      switch (item.id) {
        case TYPES_OF_MENU_ITEM.BUTTON:
          menuItem = (
            <Button
              className="LinkButton menu-btn field-button"
              href={this.getLink(item.link)}
              target={'_blank'}
              block
            >
              {item.title}
            </Button>
          );
          break;
        case TYPES_OF_MENU_ITEM.NEWS:
          menuItem = (
            <LinkButton
              className={classNames('menu-btn', {
                active: location.pathname === `/object/${wobject.author_permlink}`,
              })}
              to={`/object/${wobject.author_permlink}`}
            >
              <FormattedMessage id="news" defaultMessage="News" />
            </LinkButton>
          );
          break;
        default:
          break;
      }
      return (
        <div className="object-sidebar__menu-item" key={item.id || item.author_permlink}>
          {menuItem}
        </div>
      );
    };
    const menuSection = (
      <React.Fragment>
        {isEditMode && (
          <div className="object-sidebar__section-title">
            <FormattedMessage id="menu" defaultMessage="Menu" />
          </div>
        )}
        <div className="object-sidebar__menu-items">
          {isEditMode && (
            <React.Fragment>
              {listItem(
                TYPES_OF_MENU_ITEM.LIST,
                menuLists && menuLists.map(item => getMenuSectionLink(item)),
              )}
              {listItem(
                TYPES_OF_MENU_ITEM.PAGE,
                menuPages && menuPages.map(item => getMenuSectionLink(item)),
              )}
              {listItem(
                objectFields.button,
                button &&
                  button.title &&
                  button.link &&
                  getMenuSectionLink({ id: TYPES_OF_MENU_ITEM.BUTTON, ...button }),
              )}
              {listItem(
                objectFields.newsFilter,
                newsFilter && getMenuSectionLink({ id: TYPES_OF_MENU_ITEM.NEWS }),
              )}
            </React.Fragment>
          )}
          {!isEditMode &&
            menuLists &&
            sortListItemsBy(
              combineObjectMenu(
                menuLists.map(menuItem => getClientWObj(menuItem, usedLocale)),
                {
                  button,
                  news: Boolean(newsFilter),
                },
              ),
              !_.isEmpty(wobject.sortCustom) ? 'custom' : '',
              wobject && wobject.sortCustom,
            ).map(item => getMenuSectionLink(item))}
          {!_.isEmpty(menuLists) && listItem(objectFields.sorting, null)}
        </div>
      </React.Fragment>
    );

    const listSection = (
      <React.Fragment>
        <div className="object-sidebar__section-title">
          <FormattedMessage id="list" defaultMessage="List" />
        </div>
        {listItem(objectFields.sorting, null)}
      </React.Fragment>
    );

    const settingsSection = (
      <React.Fragment>
        <div className="object-sidebar__section-title">
          <FormattedMessage id="settings" defaultMessage="Settings" />
        </div>
        {listItem(
          objectFields.avatar,
          avatar ? (
            <div className="field-avatar">
              <img src={avatar} alt="pic" />
            </div>
          ) : null,
        )}
        {listItem(objectFields.title, short)}
        {listItem(
          objectFields.background,
          background ? (
            <div className="field-background">
              <img src={background} alt="pic" />
            </div>
          ) : null,
        )}
        {listItem(
          objectFields.status,
          status && status.title && (
            <div className="field-status">
              <span className="field-status__title">{status.title}</span>
            </div>
          ),
        )}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {wobject && wobject.name && (
          <div className="object-sidebar">
            {listItem(
              objectFields.parent,
              parent ? (
                <ObjectCard key={parent.author_permlink} wobject={parent} showFollow={false} />
              ) : null,
            )}
            {hasType(wobject, OBJECT_TYPE.PAGE) && listItem(objectFields.pageContent, null)}
            {isRenderMenu && menuSection}
            {isEditMode && (
              <div className="object-sidebar__section-title">
                <FormattedMessage id="about" defaultMessage="About" />
              </div>
            )}
            {listItem(
              objectFields.name,
              !isEditMode && names.length > 0 && (
                <React.Fragment>
                  <span className="field-icon">{'\u2217'}</span>
                  <ExpandingBlock className="object-sidebar__names" entities={names} minLines={4} />
                </React.Fragment>
              ),
            )}
            {listItem(objectFields.description, <DescriptionInfo description={description} />)}
            {listItem(
              objectFields.rating,
              <RateInfo username={userName} authorPermlink={wobject.author_permlink} />,
            )}
            {listItem(objectFields.tagCategory, this.renderTagCategories(tagCategories))}
            {listItem(objectFields.categoryItem, null)}
            {isRenderGallery && (hasGalleryImg || accessExtend) ? (
              <div className="field-info">
                {accessExtend && (
                  <div className="proposition-line">
                    <Link
                      to={{ pathname: `/object/${wobject.author_permlink}/gallery` }}
                      onClick={() => this.handleSelectField('gallery')}
                    >
                      <IconButton
                        icon={<Icon type="plus-circle" />}
                        onClick={this.handleToggleModal}
                      />
                      <div
                        className={`icon-button__text ${
                          selectedField === 'gallery' ? 'field-selected' : ''
                        }`}
                      >
                        <FormattedMessage id="object_field_gallery" defaultMessage="Gallery" />
                      </div>
                    </Link>
                    <span className="proposition-line__text">{photosCount}</span>
                    {showModal && (
                      <CreateImage
                        albums={albums}
                        selectedAlbum={album[0]}
                        showModal={showModal}
                        hideModal={this.handleToggleModal}
                      />
                    )}
                  </div>
                )}
                {hasGalleryImg && (
                  <PicturesCarousel
                    pics={wobject.preview_gallery}
                    objectID={wobject.author_permlink}
                  />
                )}
              </div>
            ) : null}
            {listItem(
              objectFields.price,
              price ? (
                <React.Fragment>
                  {!isEditMode && <span className="field-icon">$</span>}
                  <span className="price-value">{price}</span>
                </React.Fragment>
              ) : null,
            )}
            {workTime &&
              listItem(
                objectFields.workTime,
                <div className="field-work-time">
                  <Icon type="clock-circle-o" className="text-icon text-icon--time" />
                  {workTime}
                </div>,
              )}
            {listItem(
              objectFields.address,
              address && (
                <React.Fragment>
                  <span>
                    <Icon type="environment-o" className="text-icon coordinates" />
                    {address}
                    {isRenderMap && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${map.latitude},${map.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="address-link"
                      >
                        <i className="iconfont icon-send PostModal__icon" />
                      </a>
                    )}
                  </span>
                </React.Fragment>
              ),
            )}
            {listItem(
              objectFields.map,
              isRenderMap && (
                <MapObjectInfo
                  mapHeigth={200}
                  center={[Number(map.latitude), Number(map.longitude)]}
                  width={270}
                  wobject={wobject}
                  history={this.props.history}
                />
              ),
            )}
            {listItem(
              objectFields.website,
              website && website.title && website.link && (
                <div className="field-website">
                  <span className="field-website__title">
                    <i className="iconfont icon-link text-icon link" />
                    <a target="_blank" rel="noopener noreferrer" href={this.getLink(website.link)}>
                      {website.title}
                    </a>
                  </span>
                </div>
              ),
            )}
            {listItem(
              objectFields.phone,
              <div className="field-info">
                {accessExtend ? (
                  <React.Fragment>
                    {phones.length <= 3 ? (
                      phones
                        .slice(0, 3)
                        .map(({ body, number }) =>
                          this.getFieldLayout(objectFields.phone, { body, number }),
                        )
                    ) : (
                      <React.Fragment>
                        {phones
                          .slice(0, 2)
                          .map(({ body, number }) =>
                            this.getFieldLayout(objectFields.phone, { body, number }),
                          )}
                        <Link
                          to={`/object/${wobject.author_permlink}/updates/${objectFields.phone}`}
                          onClick={() => this.handleSelectField(objectFields.phone)}
                        >
                          <FormattedMessage id="show_more_tags" defaultMessage="show more">
                            {value => <div className="phone">{value}</div>}
                          </FormattedMessage>
                        </Link>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {phones
                      .slice(0, 3)
                      .map(({ body, number }) =>
                        this.getFieldLayout(objectFields.phone, { body, number }),
                      )}
                  </React.Fragment>
                )}
              </div>,
            )}
            {listItem(
              objectFields.email,
              email && (
                <div className="field-info">
                  {accessExtend ? (
                    <div className="email">
                      <Icon type="mail" className="text-icon email" /> {email}
                    </div>
                  ) : (
                    <React.Fragment>
                      <Icon type="mail" className="text-icon email" />
                      <a href={`mailto:${email}`}> {email}</a>
                    </React.Fragment>
                  )}
                </div>
              ),
            )}
            {listItem(objectFields.link, <SocialLinks profile={profile} />)}
            {accessExtend && hasType(wobject, OBJECT_TYPE.LIST) && listSection}
            {accessExtend && settingsSection}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ObjectInfo;
