import React from 'react';
import { connect } from 'react-redux';
import { changeStateTo, imageSize } from '../actions';
import {
  container,
  button,
  input,
  textarea,
  textWindow,
  textBox,
  canvas,
} from '../styles/style';

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

    const m = (...rest) => {
      let res = {};
      rest.forEach((v) => {
        if (v) {
          res = Object.assign({}, res, v);
        }
      });
      return res;
    };

    return React.createElement('div', {
      style: { width: '100%', height: '100%' },
      onClick(e) { b(e); },
    },
      <div style={container.normal}>
        <div className="button-group">
          <input
            style={input.hidden}
            type="file"
            id="dummy"
            onChange={() => { this.handleChange(); }}
          />
          <button
            style={m(
                button.palev,
                this.props.active && { display: 'none' },
              )}
            onClick={() => { handleClick(); }}
          >
              画像を選択してね
            </button>
        </div>

        <div style={container.relative}>
          <div
            style={m(
              canvas,
              this.props.width > 960
                ? {
                  height: `${this.props.height / (this.props.width / 960)}`,
                }
                : {
                  width: this.props.width,
                  height: this.props.height,
                },
            )}
            id="canvas"
          >
            <img style={{ maxWidth: '960px' }} id="image" src="" alt="" />
            {this.props.active &&
            <div>
              <div
                style={m(
                  textWindow,
                  { height: `${this.props.height / 4.2}` },
                  this.props.width < 960 &&
                    { width: this.props.width },
                )}
              />
              <div
                style={m(
                  textBox,
                  { height: `${this.props.height / 4.2}` },
                  this.props.width < 960 &&
                    { width: this.props.width },
                )}
              >
                <div
                  style={{
                    width: '50%',
                    margin: '0 auto',
                  }}
                >
                  <input style={input.name} placeholder="名前" />
                  <textarea style={textarea} placeholder="テキスト" />
                </div>
              </div>
            </div>
              }
          </div>
        </div>

        {this.props.active &&
        <button
          style={button.primary}
          onClick={() => { screenshot(); }}
        >
              完成！
            </button>
          }
        <div
          style={m(
          container.normal,
          this.props.width > 960
            ? { width: 960 }
            : { width: this.props.width },
        )}
        >
          <img id="img" src="" alt="" />
        </div>
      </div>,
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
