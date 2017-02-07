import React from 'react';
// import { connect } from 'react-redux';
import styled from 'styled-components';
import Image from '../components/Image';
import Word from '../components/Word';

const Container = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0 0;
`;

const App = () => (
  <Container>
    <Image />
    <Word />
  </Container>
);

// App.propTypes = {
// };

// export default connect(mapStateToProps)(App);
export default App;
