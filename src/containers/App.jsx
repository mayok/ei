import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeStateTo } from '../actions';

const Container = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0 0;
`;
const ImageContainer = styled.div`
`;
const TextContainer = styled.div`
`;
const ButtonGroup = styled.div`
`;
const Input = styled.input`
  display: none;
`;
const Button = styled.button`
`;

class App extends React.Component {
  handleClick() {
    document.getElementById('dummy').click();
  }

  handleChange() {
    const { dispatch } = this.props;

    const oFiles = document.getElementById('dummy').files;
    const nFiles = oFiles.length;
    if (nFiles > 0) {
      // insert uploaded image to img tag
      const reader = new FileReader();
      reader.onload = ((e) => {
        document.getElementById('image').src = e.target.result;
        // document.getElementById("image").alt = oFiles[0].filename;
      });
      reader.readAsDataURL(oFiles[0]);

      dispatch(changeStateTo(true));
    } else {
      document.getElementById('image').src = '';
      dispatch(changeStateTo(false));
    }
  }

  render() {
    // const { active } = this.props;

    return (
      <Container>
        <ImageContainer>
          <ButtonGroup>
            <Input
              type="file"
              id="dummy"
              onChange={() => { this.handleChange(); }}
            />
            <Button
              onClick={() => { this.handleClick(); }}
            >
              upload image
            </Button>
          </ButtonGroup>
        </ImageContainer>

        <TextContainer />
        <div className="textContainer">
          <img id="image" src="" alt="" />
          <div className="balloon" />
          <div className="textbox">
            <div className="name" />
            <div className="text" />
          </div>
        </div>
      </Container>

    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({ active: state.changeStateTo });

export default connect(null)(App);
