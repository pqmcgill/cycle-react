import xs, { Stream } from 'xstream';
import { ReactSource } from './reactSource';

export type MockConfig = {
  [name: string]: Stream<any> | MockConfig;
};

export class MockedReactSource implements ReactSource {
  private mockConfig: MockConfig;

  constructor(mockConfig: MockConfig) {
    this.mockConfig = mockConfig;
  }

  public select(selector: string): MockedReactSource {
    const mockConfigForSelector = this.mockConfig[selector] || {};
    return new MockedReactSource(mockConfigForSelector as MockConfig);
  }

  public event(eventType: string): Stream<any> {
    return this.mockConfig[eventType] as Stream<any> || xs.empty();
  }
}

export function mockReactSource(mockConfig: MockConfig): MockedReactSource {
  return new MockedReactSource(mockConfig);
}