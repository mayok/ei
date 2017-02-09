import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeStateTo, imageSize } from '../actions';

const Background = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 10px 0 0;
`;
const ImageContainer = styled.div`
  position: relative;
`;
const Canvas = styled.div`
  margin: 0 auto;
  width: ${function width(p) {
    return p.width > 960 ? '960px' : `${p.width}px`;
  }};
  height: ${function height(p) {
    return p.width > 960
      ? `${p.height / (p.width / 960)}px`
      : `${p.height}px`;
  }};
`;
const ButtonGroup = styled.div`
`;
const Input = styled.input`
  display: none;
`;
const Button = styled.button`
  display: ${function display(p) {
    return p.active ? 'none' : 'block';
  }};
  background: ${function bg(p) {
    return p.primary ? '#337ab7' : 'palevioletred';
  }};
  color: white;
  font-size: 1em;
  margin: 0 auto;
  padding: .25em 1em;
  border: 2px solid ${function border(p) {
    return p.primary ? '#337ab7' : 'palevioletred';
  }};
  border-radius: 3px;
`;
const Img = styled.img`
  max-width: 960px;
`;
const TextWindow = styled.div`
  position: absolute;
  bottom: 0;
  width: ${function width(p) {
    return p.width > 960 ? '960px' : `${p.width}px`;
  }};
  height: ${function height(p) {
    return p.width > 960
      ? `${p.height / (p.width / 960) / 4.2}px`
      : `${p.height}px`;
  }};
  background: ${function background(p) { return p.background; }};
  opacity: ${function opacity(p) { return p.opacity; }};
`;
const TextBoxWrapper = styled.div`
  padding: 1em 0 0;
  position: absolute;
  bottom: 0;
  width: ${function width(p) {
    return p.width > 960 ? '960px' : `${p.width}px`;
  }};
  height: ${function height(p) {
    return p.width > 960
      ? `${p.height / (p.width / 960) / 4.2}px`
      : `${p.height}px`;
  }};
`;
const TextBox = styled.div`
  width: 50%;
  margin: 0 auto;
`;
const Name = styled.input`
  display: block;
  margin: .5em 0 .1em;
  max-width: 200px;
  border: none;
  outline: none;
  background: rgba(255,255,255,0);
  color: white;
  text-overflow: ellipsis;
  text-shadow: 2px 2px #393939;
  overflow: hidden;
  white-space: nowrap;
  font-family: "Noto Sans Japanese";
  font-size: 1.8rem;
  font-weight: 700;

`;
const Message = styled.textarea`
  display: block;
  width: 100%;
  height: 7.5rem;
  line-height: 1.45;
  border: none;
  outline: none;
  background: rgba(255,255,255,0);
  color: white;
  text-shadow: 2px 2px #393939;
  overflow-wrap: break-word;
  font-family: "Noto Sans Japanese";
  font-size: 1.8rem;
  font-weight: 700;
  resize: none;
  overflow: hidden;

`;
const Modal = styled.div`
`;

class App extends React.Component {

  handleChange() {
    const { dispatch } = this.props;

    const oFiles = document.getElementById('dummy').files;
    const nFiles = oFiles.length;
    if (nFiles > 0) {
      // get image width and height
      const _ = window.URL || window.webkitURL;
      const img = new Image();
      img.onload = () => {
        dispatch(imageSize({ width: img.width, height: img.height }));
      };
      img.src = _.createObjectURL(oFiles[0]);

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
    const { active, width, height } = this.props;

    const handleClick = () => {
      document.getElementById('dummy').click();
    };
    const screenshot = () => {
      const e = document.getElementById('canvas');
      html2canvas(e, { onrendered(c) {
        const d = c.toDataURL();
        document.getElementById('img').src = d;
      } });
    };
    const b = (e) => {
      // hide modal
      if (e.target.nodeName !== 'IMG') {
        document.getElementById('img').src = '';
      }
    };

    return (
      <Background onClick={(e) => { b(e); }}>
        <Container>
          <ButtonGroup>
            <Input
              type="file"
              id="dummy"
              onChange={() => { this.handleChange(); }}
            />
            <Button onClick={() => { handleClick(); }} active={active}>
              画像を選択してね
            </Button>
          </ButtonGroup>

          <ImageContainer>
            <Canvas id="canvas" width={width} height={height}>
              <Img id="image" src="" alt="" />
              {active &&
                <div>
                  <TextWindow
                    width={width}
                    height={height}
                    opacity={'0.1'}
                    background={'#EF75BC'}
                  />
                  <TextBoxWrapper
                    width={width}
                    height={height}
                  >
                    <TextBox>
                      <Name placeholder="名前" />
                      <Message placeholder="テキスト" />
                    </TextBox>
                  </TextBoxWrapper>
                </div>
              }
            </Canvas>
          </ImageContainer>

          {active &&
            <Button onClick={() => { screenshot(); }} primary>
              完成！
            </Button>
          }
          <Modal>
            <img id="img" src="" alt="" />
          </Modal>
        </Container>
      </Background>
    );
  }
}

App.propTypes = {
  active: React.PropTypes.bool.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { changeStateTo: active, image } = state;
  const {
    width,
    height,
  } = image || {
    width: 0,
    height: 0,
  };

  return {
    active,
    width,
    height,
  };
};

export default connect(mapStateToProps)(App);
