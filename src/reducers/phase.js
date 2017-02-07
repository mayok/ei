import { INCREMENT } from '../actions';

const phase = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

export default phase;
