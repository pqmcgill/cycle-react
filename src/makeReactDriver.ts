import { Stream } from 'xstream';
import { ReactElement } from 'react';
import { render } from 'react-dom';
import { MainReactSource, ReactSource } from './ReactSource';

export type Driver = (vtree$: Stream<ReactElement<any>>) => ReactSource;

export function makeReactDriver(element: string): Driver {
  return function reactDriver(vtree$) {
    vtree$.addListener({
      next(vtree: ReactElement<any>) {
        console.log(vtree);
        render(
          vtree,
          document.querySelector(element)
        )
      }
    });

    return new MainReactSource();
  }
}
