import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';

export const displayLimit = 10;

export const rewardPostContainerData = {
  author: 'monterey',
  permlink: 'test-post',
};
export const preparePropositionReqData = ({
  username,
  match,
  coordinates,
  area,
  radius,
  sort,
  types,
  guideNames,
}) => {
  const reqData = {
    limit: displayLimit,
    requiredObject: match.params.campaignParent || match.params.name,
    currentUserName: username,
    sort,
  };

  if (username) reqData.currentUserName = username;
  if (coordinates && coordinates.length > 0) {
    reqData.coordinates = coordinates;
  }
  if (area && area.length > 0 && radius) {
    reqData.area = area;
    reqData.radius = radius;
  }
  if (types && guideNames) {
    reqData.types = types;
    reqData.guideNames = guideNames;
  }
  switch (match.params.filterKey) {
    case 'active':
      reqData.userName = username;
      reqData.approved = false;
      break;
    case 'history':
      reqData.status = ['inactive', 'expired', 'deleted', 'payed'];
      break;
    case 'reserved':
      reqData.userName = username;
      reqData.approved = true;
      break;
    default:
      break;
  }
  return reqData;
};

export const getTextByFilterKey = (intl, filterKey) => {
  switch (filterKey) {
    case 'active':
    case 'history':
    case 'reserved':
      return `${intl.formatMessage({
        id: 'rewards',
        defaultMessage: 'Rewards',
      })} for`;
    case 'created':
      return `${intl.formatMessage({
        id: 'rewards',
        defaultMessage: 'Rewards',
      })} created by`;
    default:
      return intl.formatMessage({
        id: 'rewards',
        defaultMessage: 'Rewards',
      });
  }
};

export const formatDate = (intl, date) => {
  const dt = new Date(date);
  const day = `0${dt.getDate()}`.slice(-2);
  const month = `0${dt.getMonth() + 1}`.slice(-2);
  const year = dt.getFullYear();

  switch (month) {
    case '01':
      return `${day}-${intl.formatMessage({
        id: 'peyment_jan',
        defaultMessage: 'Jan',
      })}-${year}`;
    case '02':
      return `${day}-${intl.formatMessage({
        id: 'peyment_feb',
        defaultMessage: 'Feb',
      })}-${year}`;
    case '03':
      return `${day}-${intl.formatMessage({
        id: 'peyment_mar',
        defaultMessage: 'Mar',
      })}-${year}`;
    case '04':
      return `${day}-${intl.formatMessage({
        id: 'peyment_apr',
        defaultMessage: 'Apr',
      })}-${year}`;
    case '05':
      return `${day}-${intl.formatMessage({
        id: 'peyment_may',
        defaultMessage: 'May',
      })}-${year}`;
    case '06':
      return `${day}-${intl.formatMessage({
        id: 'peyment_june',
        defaultMessage: 'June',
      })}-${year}`;
    case '07':
      return `${day}-${intl.formatMessage({
        id: 'peyment_july',
        defaultMessage: 'July',
      })}-${year}`;
    case '08':
      return `${day}-${intl.formatMessage({
        id: 'peyment_aug',
        defaultMessage: 'Aug',
      })}-${year}`;
    case '09':
      return `${day}-${intl.formatMessage({
        id: 'peyment_sept',
        defaultMessage: 'Sept',
      })}-${year}`;
    case '10':
      return `${day}-${intl.formatMessage({
        id: 'peyment_oct',
        defaultMessage: 'Oct',
      })}-${year}`;
    case '11':
      return `${day}-${intl.formatMessage({
        id: 'peyment_nov',
        defaultMessage: 'Nov',
      })}-${year}`;
    case '12':
      return `${day}-${intl.formatMessage({
        id: 'peyment_dec',
        defaultMessage: 'Dec',
      })}-${year}`;
    default:
      return ' ';
  }
};

export const convertDigits = number => parseFloat((Math.round(number * 1000) / 1000).toFixed(3));

export const getCurrentUSDPrice = () => {
  const cryptosPriceHistory = useSelector(state => state.app.cryptosPriceHistory);

  if (isEmpty(cryptosPriceHistory)) return !cryptosPriceHistory;
  const currentUSDPrice =
    cryptosPriceHistory &&
    cryptosPriceHistory.hive &&
    cryptosPriceHistory.hive.usdPriceHistory &&
    cryptosPriceHistory.hive.usdPriceHistory.usd;

  return currentUSDPrice;
};

export const getDaysLeft = (reserveDate, daysCount) => {
  const currentTime = moment(Date.now()).unix();
  const reservationTime = moment(reserveDate).unix() + daysCount * 86400;
  return parseInt((reservationTime - currentTime) / 86400, 10);
};

export const getFrequencyAssign = objectDetails =>
  objectDetails.frequency_assign
    ? `<ul><li>Have not received a reward from @${objectDetails.guide.name} for reviewing @${objectDetails.requiredObject} in the last ${objectDetails.frequency_assign} days and does not have an active reservation for such a reward at the moment.</li></ul>`
    : '';

export const getAgreementObjects = objectDetails =>
  !isEmpty(objectDetails.agreementObjects)
    ? `including the following: Legal highlights: ${objectDetails.agreementObjects.reduce(
        (acc, obj) => ` ${acc} <a href='/object/${obj}/page'>${obj}</a> `,
        '',
      )}`
    : '';

export const getMatchBots = objectDetails =>
  !isEmpty(objectDetails.match_bots)
    ? objectDetails.match_bots.reduce((acc, bot) => `${acc}, @${bot}`, '')
    : '';

export const getUsersLegalNotice = objectDetails =>
  objectDetails.usersLegalNotice
    ? `<p><b>Legal notice:</b></p><p>${objectDetails.usersLegalNotice}</p>`
    : '';

export const getReceiptPhoto = objectDetails =>
  objectDetails.requirements.receiptPhoto
    ? `<p>Photo of the receipt (without personal details);</p>`
    : '';

export const getDescription = objectDetails =>
  objectDetails.description
    ? `<p>Additional requirements/notes: ${objectDetails.description}</p>`
    : '';

export const getDetailsBody = (
  proposition,
  proposedWobjName,
  proposedAuthorPermlink,
  primaryObjectName,
) => {
  const eligibilityRequirements = `
    <p><b>User eligibility requirements:</b></p>
<p>Only users who meet all eligibility criteria can participate in this rewards campaign.</p>
<ul>
    <li>Minimum Waivio expertise: ${proposition.userRequirements.minExpertise}</li>
    <li>Minimum number of followers: ${proposition.userRequirements.minFollowers}</li>
    <li>Minimum number of posts: ${proposition.userRequirements.minPosts}</li>
</ul>`;
  const frequencyAssign = getFrequencyAssign(proposition);
  const blacklist = `<ul><li>User account is not blacklisted by @${proposition.guide.name} or referenced accounts.</li></ul>`;
  const receiptPhoto = getReceiptPhoto(proposition);
  const postRequirements = `<p><b>Post requirements:</b></p>
<p>For the review to be eligible for the award, all the following requirements must be met:</p>
<ul><li>Minimum ${
    proposition.requirements.minPhotos
  } original photos of <a href="/object/${proposedWobjName}">${proposedWobjName}</a></li> ${receiptPhoto} <li>Link to <a href='/object/${proposedAuthorPermlink}'>${proposedWobjName}</a></li>
<li>Link to <a href="/object/${proposition.requiredObject ||
    proposition.requiredObject.author_permlink}">${primaryObjectName}</a></li></ul> `;
  const description = getDescription(proposition);
  const sponsor = `<p>Sponsor reserves the right to refuse the payment if review is suspected to be fraudulent, spam, poorly written or for other reasons as stated in the agreement.</p>`;
  const agreementObjects = getAgreementObjects(proposition);
  const matchBots = getMatchBots(proposition);
  const rewards = `<p><b>Reward:</b></p>
<p>The amount of the reward is determined in HIVE at the time of reservation. The reward will be paid in the form of a combination of upvotes (Hive Power) and direct payments (liquid HIVE). Only upvotes from registered accounts (@${proposition.guide.name} ${matchBots} ) count towards the payment of rewards. The value of all other upvotes is not subtracted from the specified amount of the reward.</p>`;
  const legal = `<p><b>Legal:</b></p>
<p>By making the reservation, you confirm that you have read and agree to the Terms and Conditions of the Service Agreement <a href="/object/xrj-terms-and-conditions/page">Terms and Conditions of the Service Agreement</a> ${agreementObjects}</p>`;
  const usersLegalNotice = getUsersLegalNotice(proposition);

  return `${eligibilityRequirements} ${frequencyAssign} ${blacklist} ${postRequirements} ${description} ${sponsor} ${rewards} ${legal} ${usersLegalNotice}`;
};
