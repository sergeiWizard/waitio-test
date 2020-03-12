// eslint-disable-next-line import/prefer-default-export
export const initialState = {
  userName: 'asd09',
  user: {
    active: {},
    balance: '118.710 STEEM',
    can_vote: true,
    name: 'asd09',
  },
};

export const initialStateToDidMount = {
  campaigns: [],
  budgetTotal: {},
};

export const stateToComponentDidMount = {
  budgetTotal: {
    remaining: 6.95,
    sum_budget: 6.96,
    sum_payable: 0.01,
    sum_reserved: 0,
  },
  campaigns: [
    {
      _id: '5e678a1ff9c2cb174722106c',
      activation_permlink: 'activate-monterey-hkvru6omohm',
      budget: 0.01,
      completed: 1,
      name: 'CapaZeka',
      remaining: 0,
      reserved: 0,
      reward: 0.01,
      status: 'active',
      type: 'reviews',
    },
    {
      id: '5e620da2fb97af17249e3f95',
      activation_permlink: 'activate-monterey-ln7osqo19e',
      budget: 0.01,
      completed: 0,
      name: 'TstCampa',
      remaining: 0,
      reserved: 0,
      reward: 0.1,
      status: 'expired',
      type: 'reviews',
    },
  ],
};
