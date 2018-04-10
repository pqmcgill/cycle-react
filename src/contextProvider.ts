import { h } from './h';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getHandlers, Handlers } from './handlers';

export interface ProviderProps {
  scope: string;
}

export interface ProviderContext {
  scope: string;
}

export interface EventableProps {
  selector: string;
  type: React.ComponentClass<any>;
}

export function incorporateHandlers(scopedSelector: string): Object {
  const handlers: Handlers = getHandlers(scopedSelector);
  const handlerEventTypes = Object.keys(handlers);
  const handlerProps = handlerEventTypes.reduce(
    (_props: Object, eventType: string): Object => {
      const onFoo = `on${eventType[0].toUpperCase()}${eventType.slice(1)}`;
      return {
        ..._props,
        [onFoo]: (evt: any) => {
          handlers[eventType].shamefullySendNext(evt);
        }
      };
    }, {}
  );
  return handlerProps;
}

export default class IsolatedScopeProvider extends React.Component<ProviderProps, any> {
  
  getChildContext(): ProviderContext {
    return {
      scope: this.props.scope
    };
  }

  render(): React.ReactNode {
    return this.props.children
  }
}

export class Eventable extends React.Component<EventableProps, ProviderContext> {

  private type: React.ComponentClass<any> | undefined;

  private mappedProps: EventableProps;

  constructor(props: EventableProps, context: ProviderContext) {
    super(props, context);
    let finalScope = context.scope ? `${props.selector}_${context.scope}` : props.selector;
    const handlerProps = incorporateHandlers(finalScope);
    this.type = props.type;
    const mappedProps = { 
      ...props, 
      ...handlerProps,
    };
    delete mappedProps.type;
    this.mappedProps = mappedProps;
  }

  render(): React.ReactNode {
    return React.createElement(this.type as React.ComponentClass<any>, this.mappedProps, this.props.children)
  }
}
