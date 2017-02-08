import { IMAGE_SIZE } from '../actions';

const image = (state = {
  width: 0,
  height: 0,
}, action) => {
  switch (action.type) {
    case IMAGE_SIZE:
      return {
        ...state,
        width: action.hash.width,
        height: action.hash.height,
      };
    default:
      return state;
  }
};

export default image;
