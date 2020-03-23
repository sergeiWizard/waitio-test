import React from 'react';
import PropTypes from 'prop-types';
import ObjectInfo from './ObjectInfo';

const LeftObjectProfileSidebar = ({ isEditMode, wobject, userName }) => {
  const goToCampaign = WobjPermlink => {
    this.props.history.push(`/rewards/active/${WobjPermlink}`);
  };
  return (
    <ObjectInfo
      isEditMode={isEditMode}
      wobject={wobject}
      userName={userName}
      onMarkerClick={goToCampaign}
    />
  );
};

LeftObjectProfileSidebar.propTypes = {
  wobject: PropTypes.shape().isRequired,
  userName: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
};

LeftObjectProfileSidebar.defaultProps = {
  isEditMode: false,
};
export default LeftObjectProfileSidebar;
