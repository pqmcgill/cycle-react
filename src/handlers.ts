import xs, { Stream } from 'xstream';

export type HandlersPerSelector = {
  [selector: string]: Handlers
};

export type Handlers = {
  [eventType: string]: Stream<any>
}

const handlers: HandlersPerSelector = {};

export function getHandlers(selector: string): Handlers {
  handlers[selector] = handlers[selector] || {};
  return handlers[selector];
}

export function getHandler(selector: string, eventType: string): Stream<any> {
  handlers[selector] = handlers[selector] || {};
  handlers[selector][eventType] = handlers[selector][eventType] || xs.create();
  return handlers[selector][eventType];
}
