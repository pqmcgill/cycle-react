import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Eventable } from './Eventable';

const { Provider, Consumer } = React.createContext(null);

export { Provider as ScopeProvider };

export const ScopeConsumer = (props) => (
  <Consumer>
    {( scope ) => (
      <Eventable scope={ scope } {...props} />
    )}
  </Consumer>
);