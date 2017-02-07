import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../actions';

class Image extends React.Component {
  handleChange() {
    const { dispatch } = this.props;
    dispatch(increment());
  }

  render() {
    const { phase } = this.props;

    return (
      <div>
        {phase === 0 &&
          <div>
            <input
              type="file"
              id="dummy"
              onChange={() => { this.handleChange(); }}
            />
          </div>
        }

        {phase !== 0 && console.log(phase) &&
          <canvas />
        }
      </div>
    );
  }
}

Image.propTypes = {
  phase: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { phase } = state;

  return {
    phase,
  };
};

export default connect(mapStateToProps)(Image);
