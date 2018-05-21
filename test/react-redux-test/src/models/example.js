
export default {

  namespace: 'example',

  state: {
    count: 0
  },


  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    add(state, action) {
      return { ...state, count: ++state.count};
    },
  },

};
