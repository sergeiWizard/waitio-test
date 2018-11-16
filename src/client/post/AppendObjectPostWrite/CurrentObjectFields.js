import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './CurrentObjectFields.less';

const CurrentObjectFields = ({ wobject, currentField, currentLocaleInList }) => (
  <div className="CurrentObjectFields__field">
    <FormattedMessage id="current_fields1" defaultMessage="Current" />
    <span className="CurrentObjectFields__field__current">{`"${currentField}"`}</span>
    <FormattedMessage id="current_fields2" defaultMessage="fields" />

    {currentLocaleInList.id !== 'auto' && (
      <div>
        <FormattedMessage id="for_lang1" defaultMessage="for" />
        <span className="CurrentObjectFields__field__current">
          {`${currentLocaleInList.nativeName} - ${currentLocaleInList.name}`}
        </span>
        <FormattedMessage id="for_lang2" defaultMessage="language" />
      </div>
    )}
    {_.some(wobject.fields, { name: currentField, locale: currentLocaleInList.id }) ? (
      _.map(
        _.orderBy(
          _.filter(
            wobject.fields,
            field => field.name === currentField && field.locale === currentLocaleInList.id,
          ),
          'weight',
          ['desc'],
        ),
        field => (
          <div key={`${field.body} + ${field.locale}`}>
            <div className="CurrentObjectFields__field__line">
              <div className="CurrentObjectFields__field__body">
                {field.body}({field.weight});
              </div>
            </div>
          </div>
        ),
      )
    ) : (
      <div className="CurrentObjectFields__field__noItems">
        <FormattedMessage id="no_fiends" defaultMessage="There is no added fields with type" />
        <span className="CurrentObjectFields__field__current">{`"${currentField}"`}</span>
      </div>
    )}
  </div>
);
CurrentObjectFields.propTypes = {
  wobject: PropTypes.shape().isRequired,
  currentField: PropTypes.string.isRequired,
  currentLocaleInList: PropTypes.shape().isRequired,
};
CurrentObjectFields.defaultProps = {
  wobject: { fields: [] },
  currentField: 'name',
  currentLocaleInList: { id: '', name: '', nativeName: '' },
};
export default CurrentObjectFields;
