import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Eventable } from './Eventable';

// TODO: rip out once @types/react supports new context API
declare module "react" {
  type Provider<T> = React.ComponentType<{
    value: T;
    children?: React.ReactNode;
  }>;
  type Consumer<T> = React.ComponentType<{
    children(value: T): React.ReactNode;
    unstable_observedBits?: number;
  }>;
  interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
  }
  function createContext<T>(defaultValue: T, calculateChangedBits?: (prev: T, next: T) => number): Context<T>;
}

const { Provider, Consumer } = React.createContext(null);

export { Provider as ScopeProvider };

export const ScopeConsumer = (props) => (
  <Consumer>
    {( scope ) => (
      <Eventable scope={ scope } {...props} />
    )}
  </Consumer>
);