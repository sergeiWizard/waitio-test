// eslint-disable-next-line import/prefer-default-export
export const initialState = {
  assigned: null,
  isModalDetailsOpen: true,
  isReserved: false,
  isReviewDetails: false,
  loading: false,
  objectDetails: {
    __v: 0,
    _id: '5e5e6a33fb97af17249e3f7f',
    activation_permlink: 'activate-monterey-7y5q4n886t5',
    agreementObjects: [],
    app: 'waiviodev',
    blacklist_users: [],
    budget: 1,
    commissionAgreement: 0.05,
    compensationAccount: '',
    count_objects: 1,
    count_reservation_days: 7,
    count_users: 0,
    createdAt: '2020-03-03T14:31:15.970Z',
    existAssigns: [],
    expired_at: '2020-03-07T14:31:11.877Z',
    frequency_assign: 0,
    frequency_exceed: false,
    guide: {
      alias: 'Alex Grigurko',
      name: 'alexeygrigurko',
      totalPayed: 1.819,
      wobjects_weight: 1496742.3025625013,
    },
    is_sponsor_blacklist: false,
    match_bots: [],
    max_assign_count: 1,
    name: 'Testing123',
    objects: [
      {
        assigned: null,
        count_users: 0,
        object: {},
        permlink: null,
      },
    ],
    payments: [],
    requiredObject: 'testing123',
    required_object: {},
    requirement_filters: {
      can_assign_by_budget: true,
      can_assign_by_current_day: true,
      expertise: false,
      followers: true,
      freeReservation: true,
      frequency: true,
      not_blacklisted: true,
      posts: true,
    },
    requirements: {
      minPhotos: 0,
      receiptPhoto: false,
    },
    reservation_timetable: {},
    reserved_users: [],
    reward: 0.001,
    sponsors_blacklist: [],
    status: 'active',
    type: 'reviews',
    updatedAt: '2020-03-03T14:31:25.908Z',
    userRequirements: {
      minExpertise: 1,
      minFollowers: 2,
      minPosts: 3,
    },
    usersLegalNotice: '',
    whitelist_users: [],
  },
  proposedWobj: {
    __v: 0,
    _id: '5cf76fdb9619f621832a05ca',
    app: 'waiviodev/1.0.0',
    author: 'x6oc5',
    author_permlink: 'testnet',
  },
  requiredObjectName: 'testing123',
};

export const stateForActiveReserve = {
  assigned: false,
  isModalDetailsOpen: true,
  isReserved: false,
  isReviewDetails: false,
  loading: false,
  objectDetails: {
    __v: 0,
    _id: '5e5e6a33fb97af17249e3f7f',
    activation_permlink: 'activate-monterey-7y5q4n886t5',
    agreementObjects: ['something for test'],
    app: 'waiviodev',
    blacklist_users: [],
    budget: 1,
    commissionAgreement: 0.05,
    compensationAccount: '',
    count_objects: 1,
    count_reservation_days: 7,
    count_users: 0,
    createdAt: '2020-03-03T14:31:15.970Z',
    existAssigns: [],
    expired_at: '2020-03-07T14:31:11.877Z',
    frequency_assign: 0,
    frequency_exceed: false,
    guide: {
      alias: 'Alex Grigurko',
      name: 'alexeygrigurko',
      totalPayed: 1.819,
      wobjects_weight: 1496742.3025625013,
    },
    is_sponsor_blacklist: false,
    match_bots: [],
    max_assign_count: 1,
    name: 'Testing123',
    objects: [
      {
        assigned: null,
        count_users: 0,
        object: {},
        permlink: null,
      },
    ],
    payments: [],
    requiredObject: 'testing123',
    required_object: {},
    requirement_filters: {
      can_assign_by_budget: true,
      can_assign_by_current_day: true,
      expertise: false,
      followers: true,
      freeReservation: true,
      frequency: true,
      not_blacklisted: true,
      posts: true,
    },
    requirements: {},
    reservation_timetable: {},
    reserved_users: [],
    reward: 0.001,
    sponsors_blacklist: [],
    status: 'active',
    type: 'reviews',
    updatedAt: '2020-03-03T14:31:25.908Z',
    userRequirements: {},
    usersLegalNotice: '',
    whitelist_users: [],
  },
  proposedWobj: {
    __v: 0,
    _id: '5cf76fdb9619f621832a05ca',
    app: 'waiviodev/1.0.0',
    author: 'x6oc5',
    author_permlink: 'testnet',
  },
  requiredObjectName: 'testing123',
};

export const stateForReservePastPress = {
  assigned: true,
  isModalDetailsOpen: true,
  isReserved: false,
  isReviewDetails: true,
  loading: false,
  objectDetails: {
    __v: 0,
    _id: '5e5e6a33fb97af17249e3f7f',
    activation_permlink: 'activate-monterey-7y5q4n886t5',
    agreementObjects: [],
    app: 'waiviodev',
    blacklist_users: [],
    budget: 1,
    commissionAgreement: 0.05,
    compensationAccount: '',
    count_objects: 1,
    count_reservation_days: 7,
    count_users: 0,
    createdAt: '2020-03-03T14:31:15.970Z',
    existAssigns: [],
    expired_at: '2020-03-07T14:31:11.877Z',
    frequency_assign: 0,
    frequency_exceed: false,
    guide: {
      alias: 'Alex Grigurko',
      name: 'alexeygrigurko',
      totalPayed: 1.819,
      wobjects_weight: 1496742.3025625013,
    },
    is_sponsor_blacklist: false,
    match_bots: [],
    max_assign_count: 1,
    name: 'Testing123',
    objects: [
      {
        assigned: null,
        count_users: 0,
        object: {},
        permlink: null,
      },
    ],
    payments: [],
    requiredObject: 'testing123',
    required_object: {},
    requirement_filters: {
      can_assign_by_budget: true,
      can_assign_by_current_day: true,
      expertise: false,
      followers: true,
      freeReservation: true,
      frequency: true,
      not_blacklisted: true,
      posts: true,
    },
    requirements: {},
    reservation_timetable: {},
    reserved_users: [],
    reward: 0.001,
    sponsors_blacklist: [],
    status: 'active',
    type: 'reviews',
    updatedAt: '2020-03-03T14:31:25.908Z',
    userRequirements: {},
    usersLegalNotice: '',
    whitelist_users: [],
  },
  proposedWobj: {
    __v: 0,
    _id: '5cf76fdb9619f621832a05ca',
    app: 'waiviodev/1.0.0',
    author: 'x6oc5',
    author_permlink: 'testnet',
  },
  requiredObjectName: 'testing123',
};

export const stateForFrequency = {
  assigned: false,
  isModalDetailsOpen: true,
  isReserved: false,
  isReviewDetails: false,
  loading: false,
  objectDetails: {
    __v: 0,
    _id: '5e5e6a33fb97af17249e3f7f',
    activation_permlink: 'activate-monterey-7y5q4n886t5',
    agreementObjects: [],
    app: 'waiviodev',
    blacklist_users: [],
    budget: 1,
    commissionAgreement: 0.05,
    compensationAccount: '',
    count_objects: 1,
    count_reservation_days: 7,
    count_users: 0,
    createdAt: '2020-03-03T14:31:15.970Z',
    existAssigns: [],
    expired_at: '2020-03-07T14:31:11.877Z',
    frequency_assign: 1,
    frequency_exceed: false,
    guide: {
      alias: 'Alex Grigurko',
      name: 'alexeygrigurko',
      totalPayed: 1.819,
      wobjects_weight: 1496742.3025625013,
    },
    is_sponsor_blacklist: false,
    match_bots: [],
    max_assign_count: 1,
    name: 'Testing123',
    objects: [
      {
        assigned: null,
        count_users: 0,
        object: {},
        permlink: null,
      },
    ],
    payments: [],
    requiredObject: 'testing123',
    required_object: {},
    requirement_filters: {
      can_assign_by_budget: true,
      can_assign_by_current_day: true,
      expertise: false,
      followers: true,
      freeReservation: true,
      frequency: true,
      not_blacklisted: true,
      posts: true,
    },
    requirements: {},
    reservation_timetable: {},
    reserved_users: [],
    reward: 0.001,
    sponsors_blacklist: [],
    status: 'active',
    type: 'reviews',
    updatedAt: '2020-03-03T14:31:25.908Z',
    userRequirements: {},
    usersLegalNotice: '',
    whitelist_users: [],
  },
  proposedWobj: {
    __v: 0,
    _id: '5cf76fdb9619f621832a05ca',
    app: 'waiviodev/1.0.0',
    author: 'x6oc5',
    author_permlink: 'testnet',
  },
  requiredObjectName: 'testing123',
};

export const stateForIsEligible = {
  assigned: null,
  isModalDetailsOpen: true,
  isReserved: false,
  isReviewDetails: false,
  loading: false,
  objectDetails: {
    __v: 0,
    _id: '5e5e6a33fb97af17249e3f7f',
    activation_permlink: 'activate-monterey-7y5q4n886t5',
    isReservedSiblingObj: false,
    agreementObjects: [],
    app: 'waiviodev',
    blacklist_users: [],
    budget: 1,
    commissionAgreement: 0.05,
    compensationAccount: '',
    count_objects: 1,
    count_reservation_days: 7,
    count_users: 0,
    createdAt: '2020-03-03T14:31:15.970Z',
    existAssigns: [],
    expired_at: '2020-03-07T14:31:11.877Z',
    frequency_assign: 1,
    frequency_exceed: false,
    guide: {
      alias: 'Alex Grigurko',
      name: 'alexeygrigurko',
      totalPayed: 1.819,
      wobjects_weight: 1496742.3025625013,
    },
    is_sponsor_blacklist: false,
    match_bots: [],
    max_assign_count: 1,
    name: 'Testing123',
    objects: [
      {
        assigned: null,
        count_users: 0,
        object: {},
        permlink: null,
      },
    ],
    payments: [],
    requiredObject: 'testing123',
    required_object: {},
    requirement_filters: {
      can_assign_by_budget: true,
      can_assign_by_current_day: true,
      expertise: true,
      followers: true,
      freeReservation: true,
      frequency: false,
      not_blacklisted: false,
      posts: true,
    },
    requirements: {},
    reservation_timetable: {},
    reserved_users: [],
    reward: 0.001,
    sponsors_blacklist: [],
    status: 'active',
    type: 'reviews',
    updatedAt: '2020-03-03T14:31:25.908Z',
    userRequirements: {},
    usersLegalNotice: '',
    whitelist_users: [],
  },
  proposedWobj: {
    __v: 0,
    _id: '5cf76fdb9619f621832a05ca',
    app: 'waiviodev/1.0.0',
    author: 'x6oc5',
    author_permlink: 'testnet',
  },
  requiredObjectName: 'testing123',
};

export const stateForPostRequirements = {
  assigned: null,
  isModalDetailsOpen: true,
  isReserved: false,
  isReviewDetails: false,
  loading: false,
  objectDetails: {
    __v: 2,
    _id: '5e5e6a33fb97af17249e3f7f',
    activation_permlink: 'activate-monterey-7y5q4n886t5',
    agreementObjects: [],
    app: 'waiviodev',
    blacklist_users: [],
    budget: 0.001,
    commissionAgreement: 0.05,
    compensationAccount: '',
    count_objects: 1,
    count_reservation_days: 7,
    count_users: 1,
    createdAt: '2020-03-03T14:31:15.970Z',
    description: '123',
    existAssigns: [],
    expired_at: '2020-03-07T14:31:11.877Z',
    frequency_assign: 1,
    frequency_exceed: false,
    guide: {
      alias: 'Alex Grigurko',
      name: 'alexeygrigurko',
      totalPayed: 1.819,
      wobjects_weight: 1496742.3025625013,
    },
    is_sponsor_blacklist: false,
    match_bots: ['aggroed', 'fenrir78', 'ace108'],
    max_assign_count: 1,
    name: 'Testing123',
    objects: [
      {
        assigned: null,
        count_users: 1,
        object: {},
        permlink: null,
      },
    ],
    payments: [],
    requiredObject: 'testing123',
    required_object: {},
    requirement_filters: {
      can_assign_by_budget: true,
      can_assign_by_current_day: true,
      expertise: false,
      followers: true,
      freeReservation: true,
      frequency: true,
      not_blacklisted: true,
      posts: true,
    },
    requirements: {
      minPhotos: 1,
      receiptPhoto: true,
    },
    reservation_timetable: {},
    reserved_users: [],
    reward: 0.001,
    sponsors_blacklist: [],
    status: 'active',
    type: 'reviews',
    updatedAt: '2020-03-03T14:31:25.908Z',
    userRequirements: {
      minExpertise: 0,
      minFollowers: 1,
      minPosts: 1,
    },
    usersLegalNotice: '321',
    whitelist_users: [],
  },
  requirements: {
    minPhotos: 1,
    receiptPhoto: true,
  },
  proposedWobj: {
    __v: 0,
    _id: '5cf76fdb9619f621832a05ca',
    app: 'waiviodev/1.0.0',
    author: 'x6oc5',
    author_permlink: 'testnet',
    avatar:
      'https://cdn.steemitimages.com/DQmWxwUb1hpd3X2bSL9VrWbJvNxKXDS2kANWoGTkwi4RdwV/unknown.png',
    children: [],
    community: '',
    count_posts: 34,
    createdAt: '2019-05-15T10:01:37.468Z',
    creator: 'monterey',
    default_name: 2018,
    fields: [
      {
        _id: '5cdbe3834603a26232e7b6e3',
        active_votes: [],
        author: 'vp4g5',
        body: 2018,
        creator: 'monterey',
        locale: 'en-US',
        name: 'name',
        permlink: 'monterey-7pykgovkq0k',
        weight: 1,
      },
    ],
    followersNames: undefined,
    id: 2018,
    is_extending_open: true,
    is_posting_open: true,
    last_posts_count: 0,
    last_posts_counts_by_hours: [],
    latest_posts: [],
    name: 2018,
    object_type: 'hashtag',
    parent: '',
    type: 'hashtag',
    updatedAt: '2020-03-06T08:00:20.269Z',
    userCount: 0,
    weight: 16765894.237999992,
  },
  requiredObjectName: 'testing123',
};
