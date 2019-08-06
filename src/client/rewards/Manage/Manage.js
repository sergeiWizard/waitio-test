import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import './Manage.less';
import * as ApiClient from '../../../waivioApi/ApiClient';
import CampaingRewardsTable from './CampaingRewardsTable/CampaingRewardsTable';
import BalanceTable from './BalanceTable/BalanceTable';

@injectIntl
class Manage extends React.Component {
  static propTypes = {
    userName: PropTypes.string,
    intl: PropTypes.shape(),
  };
  static defaultProps = {
    userName: '',
    intl: {},
  };
  state = {
    campaigns: [],
    budgetTotal: {},
  };

  componentDidMount() {
    const { userName } = this.props;
    if (userName) {
      ApiClient.getCampaignsByGuideName(userName).then(data => {
        this.setState({
          budgetTotal: data.dashboard.budget_total,
          campaigns: data.dashboard.campaigns,
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { userName } = this.props;
    if (userName !== prevProps.userName) {
      ApiClient.getCampaignsByGuideName(userName).then(data => {
        this.setState({
          budgetTotal: data.dashboard.budget_total,
          campaigns: data.dashboard.campaigns,
        });
      });
    }
  }

  balanceContent = () => {
    const { intl } = this.props;
    return (
      <React.Fragment>
        <div>
          {intl.formatMessage({
            id: 'campaignsBeSuspended',
            defaultMessage: `All campaigns will be suspended if:`,
          })}
        </div>
        <div>
          {intl.formatMessage({
            id: 'accountsPayableExeed',
            defaultMessage: `* accounts payable exeed 30 days`,
          })}
        </div>
        <div>
          {intl.formatMessage({
            id: 'remainingBalanceIsNotSufficient',
            defaultMessage: `** the remaining balance i snot sufficient to cover outstanding obligations`,
          })}
        </div>
      </React.Fragment>
    );
  };

  rewardsCampaignContent = () => {
    const { intl } = this.props;
    return (
      <React.Fragment>
        <div>
          {intl.formatMessage({
            id: 'onlyInactiveCampaogns',
            defaultMessage: `*** Only inactive campaogns can be edited`,
          })}
        </div>
        <div>
          {intl.formatMessage({
            id: 'campaignBudgetsCalcualted',
            defaultMessage: `**** Campaign budgets calcualted from the 1st day of each month`,
          })}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { intl } = this.props;
    const { budgetTotal, campaigns } = this.state;
    const balanceContent = this.balanceContent();
    const rewardsCampaignContent = this.rewardsCampaignContent();
    return (
      <div className="Manage">
        <div className="Manage__account-balance-wrap">
          <div className="Manage__account-balance-wrap-title">
            {intl.formatMessage({
              id: 'rewardAccountBalance',
              defaultMessage: `Account balance (SBD)`,
            })}
          </div>
          <BalanceTable intl={intl} budgetTotal={budgetTotal} />
          <div className="Manage__account-balance-wrap-text-content">{balanceContent}</div>
          <div className="Manage__rewards-campaign-wrap">
            <div className="Manage__rewards-campaign-wrap-title">
              {intl.formatMessage({
                id: 'manageRewardsCampaign',
                defaultMessage: `Manage rewards campaign`,
              })}
            </div>
            <CampaingRewardsTable intl={intl} campaigns={campaigns} />
            <div className="Manage__rewards-campaign-wrap-text-content">
              {rewardsCampaignContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Manage;
