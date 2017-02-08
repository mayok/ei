export const CHANGE_STATE_TO = 'CHANGE_STATE_TO';
export const IMAGE_SIZE = 'IMAGE_SIZE';

export const changeStateTo = bool => ({
  type: CHANGE_STATE_TO,
  bool,
});

export const imageSize = hash => ({
  type: IMAGE_SIZE,
  hash,
});
