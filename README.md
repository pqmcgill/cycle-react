# DEPRECATED #
This library was an experiment in combining the best of Cycle.js with the best of React.js. A few months since publishing this library, An officially supported package [@cycle/react](https://github.com/cyclejs/react) was released that solves the exact same problems. Here's an excellent [blog post](https://staltz.com/use-react-in-cyclejs-and-vice-versa.html) that showcases their work. Their implementation is strikingly similar to my own, and I'm quite proud of that fact! This library still functions just as well, but I will no longer be maintaining it as I've got a full plate of other projects to work on. I highly recommend using the official package if you're needing to rely on long-lived support. Thanks!

# cycle-react
Cycle React is a Cycle.js driver that renders React virtual dom elements via sinks, and emits React events via sources.

It is heavily inspired by <a href="https://cycle.js.org/api/dom.html">@cycle/dom</a>, and was built in an effort to provide the wonderful API of the DOM driver while simultaneously providing access to the rich ecosystem of React components.

Using Cycle React allows you to create hybrid Cycle/React applications while providing the best aspects of both worlds.

## Installation

These instructions assume that you already have an existing running Cycle.js application. If you don't, then follow this excellent documentation to get started: <a href="https://cycle.js.org/getting-started.html">Cycle.js Getting Started</a>

Cycle React depends on your application already including two packages: <a href="https://github.com/facebook/react">React</a> and <a href="https://github.com/facebook/react/tree/master/packages/react-dom">React-Dom</a>. Both at >= version 16.3
```bash
# installing peer dependencies
npm install --save react@16.3.0^ react-dom@16.3.0^
```

To install Cycle React itself is simply

```bash
# installing cycle-react
npm install --save @pqmcgill/cycle-react
```

You should now be set to use Cycle React

## Usage

Once you have all of the above packages installed, usage is quite simple.

### Setup

First you will want to import the function `makeReactDriver` from cycle-react. It takes either a document query selector or dom element as input, and returns a driver that renders your app into that element.

```javascript
import { run } from '@cycle/run';
import { makeReactDriver } from '@pqmcgill/cycle-react';
import Main from './Main';

const drivers = {
  React: makeReactDriver('#app')
};

run(Main, drivers);
```

### hyperscript h()

Cycle React provides a hyperscript function called `h()` that has the exact same signature as `React.createElement`. It takes three arguments: `tagName`, `props`, and `children`, and returns a `ReactElement`.

```typescript
h(tagName: string, props: Object, children...: Array<string | number | ReactElement>): ReactElement
```

The reason for the `h()` function is to process the props object passed into it prior to rendering in order to allow Cycle React to understand how to handle events as we'll see a little further down.

Using the `h()` function, we can create a stream of React VDom nodes.

```javascript
import xs from 'xstream';
import { h } from '@pqmcgill/cycle-react';

function Main(sources) {
  return {
    React: xs.of(
      h('div', {},
        h('p', {}, 'Follow this link to learn more about Cycle.js'),
       h('a', { href: 'https://cycle.js.org/' }, 'Cycle.js')
      )
    )
  };
}
```

The `h()` function will also render existing `React` `Components`

```javascript
import xs from 'xstream';
import { h } from '@pqmcgill/cycle-react';
import MyReactComponent from './MyReactComponent';

function Main(sources) {
  return {
    React: xs.of(
      h(MyReactComponent, { foo: 'bar' })
    )
  };
}
```

Most developers don't like working with the `h()` functions directly, which is why Cycle React offers hyperscript helper functions to make the code more legible.

```javascript
import xs from 'xstream';
import { div, a } from '@pqmcgill/cycle-react';

function Main(sources) {
  return {
    React: xs.of(
      div([
        p('Follow this link to learn more about Cycle.js'),
        a({ href: 'https://cycle.js.org/' }, 'Cycle.js')
      ])
    )
  };
}
```

You can even use `jsx`! Just point your jsx configuration to use the `h()` function.

### Babel
```jsx
/** @jsx h */
import { h } from '@pqmcgill/cycle-react';

function Main(sources) {
  ...
  const view$ = xs.of(
    <div>
      <p>Sweet! I can use JSX!!!</p>
      <a href="https://cycle.js.org/">Seriously! Check out these docs</a>
    </div>
  );
  ...
}
```
### Typescript (.tsconfig.json)
```json
{
  "compilerOptions": {
    ...,
    "jsx": "react",
    "jsxFactory": "h"
  }
}
```

## Events

How Cycle React handles events is what makes this project unique. Normally, in a React project, you would make use of an imperative api for handling events. For example:

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }
  this.handleClick = (e) => {
    // imperatively do something with event
    this.setState(() => ({
      clicked: true
    }))
  }
  render() {
    return (
      <div>
        { this.state.clicked && <p>Clicked!</p> }
        <button onClick={ this.handleClick }>Click!</button>
      </div>
    )
  }
}
```

In Cycle React, you would write the same code in a more declarative style:

```jsx
import { h } from '@pqmcgill/cycle-react';

function MyComponent(sources) {
  // declaratively subscribe to events
  const click$ = sources.React
    .select('myBtn')
    .event('click')
    .map(e => true)
    .startWith(false);

  const view$ = click$.map(clicked => (
    <div>
      { clicked && <p>Clicked!</p> }
      <button selector="myBtn">Click!</button>
    </div>
  ));

  return {
    React: view$
  };
}
```

Notice the use of the `selector` prop. This prop is special and allows Cycle React to wire up the sources properly for subscribing to events. React Cycle provides a React object on the sources map. The React source has a public method `select(selector: string)` that will return an instance of `ReactSource`. `ReactSource` has a public method `event(eventType: string): Stream<any>`. The returned Stream from calling `event(eventType)` emits values when the corresponding prop named `on[EventType]` is called on the component with the `selector` prop. This provides an excellent means of interoperability between pure React Components and Cycle.js apps. 

The above code works because `button` has a prop named `onClick`. `onClick` is a built-in prop, but we're not limited to built-in props. Take the following example which uses an existing React Component with a props based callback API.

```jsx
class Timer extends React.Component {
  ...
  componentDidMount() {
    let count = 0;
    setTimeout(() => {
      this.props.onTick(count++);
    }, 1000);
  }
  ...
}

function Main(sources) {
  const tick$ = sources
    .select('timer')
    .event('tick')
    .subscribe({
      next(v) { console.log(v); }
    });

  return {
    React: xs.of(
      <Timer selector="timer" />
    )
  };
}
```

### Isolation

When using `@cycle/isolate` to provide a scope to a component, 

```jsx
isolate(MyComponent, 'scoped')(sources)
```

any cycle-react events that the component subscribes to will also be scoped to that component. This mitigates the risk for namespace collisions when using the selector prop, and allows for the same component to be reused multiple times on the same page.

### TODO: provide more detailed documentation for use with Typescript
### TODO: provide example usages in the src code

## Enjoy!


