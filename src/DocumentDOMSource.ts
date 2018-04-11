import xs, { Stream, Producer } from 'xstream';
import { ReactSource } from './ReactSource';

export class DocumentDOMSource implements ReactSource {
  constructor() {}

  public select(selector: string): DocumentDOMSource {
    return this;
  }

  public event(eventType: string): Stream<Event> {
    return xs.create({
      next: null,
      start(listener) {
        this.next = function(event) {
          listener.next(event);
        }
        document.addEventListener(eventType, this.next);
      },
      stop() {
        document.removeEventListener(eventType, this.next);
      }
    } as Producer<Event>);
  }
}