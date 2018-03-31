import xs, { Stream } from 'xstream';
import { createElement, ReactElement } from 'react';
import { getHandler } from './handlers';
import Provider from './contextProvider';

export interface ReactSource {
    select(selector: string): ReactSource;
    event(eventType: string): Stream<any>
}

export class MainReactSource {
  private scope?: string;
  private selector: string;

  constructor(selector?: string, scope?: string) {
    this.scope = scope;
    this.selector = selector || '';
  }

  select(selector: string): ReactSource {
    return new MainReactSource(selector, this.scope);
  }

  event(eventType: string): Stream<any> {
    if (!this.selector.length) {
      return xs.empty();
    } else {
      return getHandler(this.getNamespacedSelector(), eventType);
    }
  }

  getNamespacedSelector(): string {
    return this.scope ? `${this.selector}_${this.scope}` : this.selector;
  }

  isolateSource(source: ReactSource, namespace: string): ReactSource {
    return new MainReactSource(this.selector, namespace);
  }

  isolateSink(sink: Stream<ReactElement<any>>, namespace: string): Stream<ReactElement<any>> {
    return sink.map(vtree => {
      return createElement(Provider, { scope: namespace }, vtree);
    })
  }
}
