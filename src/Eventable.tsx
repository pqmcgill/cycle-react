import * as React from 'react';
import { getHandlers, Handlers } from './handlers';

export type EventableProps = {
  scope?: string;
  selector?: string;
  _elementType?: React.ComponentClass<any>;
}

export class Eventable extends React.Component<EventableProps> {

  private _elementType: React.ComponentClass<any> | undefined;

  private mappedProps: EventableProps;

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
    const handlerProps = this.incorporateHandlers(finalScope);
    this._elementType = props._elementType;
    const mappedProps = { 
      ...props, 
      ...handlerProps,
    };
    delete mappedProps._elementType;
    this.mappedProps = mappedProps;
  }

  render(): React.ReactNode {
    return React.createElement(
      this._elementType, 
      this.mappedProps, 
      this.props.children
    )
  }
}
