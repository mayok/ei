import { CHANGE_STATE_TO } from '../actions';

const changeStateTo = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_STATE_TO:
      return action.bool;
    default:
      return state;
  }
};

export default changeStateTo;
