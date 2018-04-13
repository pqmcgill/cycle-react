import { Stream } from 'xstream';
import { ReactElement } from 'react';
import { render } from 'react-dom';
import { MainReactSource, ReactSource } from './ReactSource';

export type Driver = (vtree$: Stream<ReactElement<any>>) => ReactSource;

export function makeReactDriver(element: string | Element): Driver {
  let _el;
  if (typeof(element) === 'string') {
    _el = document.querySelector(element);
  } else {
    _el = element;
  }
  return function reactDriver(vtree$) {
    vtree$.addListener({
      next(vtree: ReactElement<any>) {
        render(
          vtree,
          _el
        )
      }
    });

    return new MainReactSource();
  }
}
