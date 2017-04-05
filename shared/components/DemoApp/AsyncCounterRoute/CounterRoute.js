import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

function CounterRoute({ counter }) {
  return (
    <div>
      <h3>Counter</h3>
      <p>
        <em>
          This is a small demo component that contains state.  It's useful for
          testing the hot reloading experience of an asyncComponent.
        </em>
      </p>
      <p>
        Current value: {counter.pretty}
      </p>
      <p>
        <button onClick={counter.inc}>Increment</button>
        {' '}
        <button onClick={counter.dec}>Decrement</button>
      </p>
    </div>
  );
}

CounterRoute.propTypes = {
  // eslint-disable-next-line
  counter: PropTypes.object,
};

export default inject('counter')(observer(CounterRoute));
