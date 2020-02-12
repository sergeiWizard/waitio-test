import { connect } from 'react-redux';
import { getOrderedByDateDraftPosts, getIsLoaded } from '../../reducers';
import LastDrafts from '../../components/Sidebar/LastDrafts';

const mapStateToProps = state => {

  return {
    loaded: getIsLoaded(state),
    drafts: getOrderedByDateDraftPosts(state, 4),
  };
};

export default connect(mapStateToProps)(LastDrafts);
