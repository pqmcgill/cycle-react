import * as React from 'react';
import { getHandlers, Handlers } from './handlers';

export type EventableProps = {
  scope?: string;
  selector?: string;
  _elementType?: React.ComponentClass<any>;
}

export type EventableState = {
  mappedProps: any,
  handlerProps: any,
  _elementType: any
}

export class Eventable extends React.Component<EventableProps, EventableState> {

  private _elementType: React.ComponentClass<any> | undefined;

  private handlerProps: any;

  private incorporateHandlers = function incorporateHandlers(scopedSelector: string): Object {
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

  constructor(props: EventableProps) {
    super(props);
    let finalScope: string;
    if (props.scope) {
      finalScope = `${props.selector}_${props.scope}`;
    } else {
      finalScope = props.selector;
    }
    this.state = {
      handlerProps: this.incorporateHandlers(finalScope),
      mappedProps: {},
      _elementType: props._elementType
    };
  }

  static getDerivedStateFromProps(props, state) {
    const mappedProps = {
      ...props,
      ...state.handlerProps,
    };
    delete mappedProps._elementType;
    return {
      mappedProps
    };    
  }

  public render(): React.ReactNode {
    return React.createElement(
      this.state._elementType,
      this.state.mappedProps,
      this.props.children
    )
  }
}
