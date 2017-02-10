// container
export const container = {
  normal: {
    width: '80%',
    margin: '0 auto',
    padding: '10px 0 0',
  },
  relative: {
    position: 'relative',
  },
};

// Button
const buttonBase = {
  display: 'block',
  margin: '0 auto',
  padding: '.45rem 1.8rem',
  border: 'none',
  borderRadius: 3,
  color: 'black',
  background: '#ececec',
  fontSize: '1.8rem',
};

export const button = {
  palev: {
    ...buttonBase,
    border: '2px solid palevioletred',
    color: 'white',
    background: 'palevioletred',
  },
  primary: {
    ...buttonBase,
    border: '2px solid #337ab7',
    color: 'white',
    background: '#337ab7',
  },
};

// Input
const text = {
  display: 'block',
  textShadow: '2px 2px #393939',
  border: 'none',
  outline: 'none',
  color: 'white',
  background: 'rgba(0,0,0,0)',
  fontFamily: 'Noto Sans Japanese',
  fontSize: '1.8rem',
  fontWeight: '700',
};
export const input = {
  name: {
    ...text,
    maxWidth: 200,
    margin: '.9rem 0 .2rem',
  },
  hidden: {
    display: 'none',
  },
};

export const textarea = {
  ...text,
  width: '100%',
  height: '7.5rem',
  lineHeight: 1.45,
  overflowWrap: 'break-word',
  resize: 'none',
  overflow: 'hidden',
};

export const textWindow = {
  position: 'absolute',
  bottom: 0,
  width: 960,
  background: '#EF75BC',
  opacity: 0.2,
};

export const textBox = {
  padding: '1.8rem 0 0',
  position: 'absolute',
  bottom: 0,
  width: 960,
  height: 960,
};

export const canvas = {
  margin: '0 auto',
  width: 960,
};
