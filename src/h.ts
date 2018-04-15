import React, { ReactElement } from 'react';
import { getHandlers } from './handlers';
import { ScopeConsumer } from './contextProvider';

export { ReactElement };

export type PropsExtensions = {
  selector?: string;
  _elementType?: React.ComponentClass<any> | string
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
  const _children = new Array().concat(children);
    if (props && props.selector) {
      const newProps = { ...props, _elementType: type };
      return React.createElement(
        ScopeConsumer,
        newProps as React.Props<P>,
        ..._children
      ) as React.ReactElement<P>;
    } else {
      return React.createElement(
        type as React.ComponentClass<P>,
        (props as (P & PropsExtensions)),
        ..._children
      );
    }
}
