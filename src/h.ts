import * as React from 'react';
import { getHandlers } from './handlers';
import { ScopeConsumer } from './contextProvider';

export type PropsExtensions = {
  selector: string;
  type?: React.ComponentClass<any> | string
}

export function h<P>(
  type: React.ComponentClass<P> | string, 
  props?: (P & PropsExtensions) | string | Array<React.ReactElement<any>>, 
  ...children: Array<React.ReactElement<any>>
): React.ReactElement<P> {
  if (props === undefined && children === undefined) {
    return hCP(type, {} as (P & PropsExtensions), []);
  }
  if (children === undefined && (typeof props === 'string' || Array.isArray(props))) {
    return hC(type, props);
  }
  if (children === undefined && typeof props === 'object' && !Array.isArray(props)) {
    return hP(type, props);
  }
  if (props !== undefined && typeof props !== 'string'
  && !Array.isArray(props) && children !== undefined) {
    return hCP(type, props, children);
  } else {
    throw new Error('Unexpected usage of h() function');
  }
}

function hP<P>(
  type: React.ComponentClass<P> | string,
  props: P & PropsExtensions
): React.ReactElement<P> {
  return internalH(type, props, []);
}

function hC<P>(
  type: React.ComponentClass<P> | string,
  children: string | Array<React.ReactElement<any>>
): React.ReactElement<P> {
  return internalH(type, {} as (P & PropsExtensions), children);
}

function hCP<P>(
  type: React.ComponentClass<P> | string,
  props: P & PropsExtensions,
  children: string | Array<React.ReactElement<any>>
): React.ReactElement<P> {
  return internalH(type, props, children);
}

function internalH<P>(
  type: React.ComponentClass<P> | string,  
  props: React.Props<P> & PropsExtensions,  
  children: string | Array<React.ReactElement<any>>,
): React.ReactElement<P> {
  if (typeof children === 'string') {
    if (props && props.selector) {
      return React.createElement(ScopeConsumer, { ...props, type } as React.Props<P>, children) as React.ReactElement<P>;
    } else {
      return React.createElement(type as React.ComponentClass<P>, (props as (P & PropsExtensions)), children);
    }
  } else {
    if (props && props.selector) {
      let newProps = { type, ...props };
      return React.createElement(ScopeConsumer, { ...props, type } as React.Props<P>, ...children) as React.ReactElement<P>;
    } else {
      return React.createElement(type as React.ComponentClass<P>, (props as (P & PropsExtensions)), ...children);
    }
  }
}
