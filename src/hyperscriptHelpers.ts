import { h } from './h';
import * as React from 'react';

function createTagFunction(tagName: string): Function {
  return function hyperscript(a?: any, b?: any) {
    const hasB = typeof b !== 'undefined';
    if (!hasB) {
      if (typeof a === 'function' || typeof a === 'number' || typeof a === 'string') {
        return h(tagName, {}, a);
      } else if (Array.isArray(a)) {
        return h(tagName, {}, ...a);
      }
    } else {
      if (typeof b === 'function' || typeof b === 'number' || typeof b === 'string') {
        return h(tagName, a, b);
      } else if (Array.isArray(b)) {
        return h(tagName, a, ...b);
      }
    }
    throw new Error(`incorrect use of ${tagName} helper`);
  }
}

const TAG_NAMES = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'dd',
  'del',
  'dfn',
  'dir',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'meta',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'u',
  'ul',
  'video',
];

const exported = {
  createTagFunction,
  TAG_NAMES
};

TAG_NAMES.forEach(tagName => {
  exported[tagName] = createTagFunction(tagName);
});

export default (exported as any) as HyperScriptHelpers;

export interface HyperScriptHelperFn {
  (props?: any, children?: any): React.ReactElement<any>;
}

export interface HyperScriptHelpers {
  a: HyperScriptHelperFn;
  abbr: HyperScriptHelperFn;
  address: HyperScriptHelperFn;
  area: HyperScriptHelperFn;
  article: HyperScriptHelperFn;
  aside: HyperScriptHelperFn;
  audio: HyperScriptHelperFn;
  b: HyperScriptHelperFn;
  base: HyperScriptHelperFn;
  bdi: HyperScriptHelperFn;
  bdo: HyperScriptHelperFn;
  blockquote: HyperScriptHelperFn;
  body: HyperScriptHelperFn;
  br: HyperScriptHelperFn;
  button: HyperScriptHelperFn;
  canvas: HyperScriptHelperFn;
  caption: HyperScriptHelperFn;
  cite: HyperScriptHelperFn;
  code: HyperScriptHelperFn;
  col: HyperScriptHelperFn;
  colgroup: HyperScriptHelperFn;
  dd: HyperScriptHelperFn;
  del: HyperScriptHelperFn;
  dfn: HyperScriptHelperFn;
  dir: HyperScriptHelperFn;
  div: HyperScriptHelperFn;
  dl: HyperScriptHelperFn;
  dt: HyperScriptHelperFn;
  em: HyperScriptHelperFn;
  embed: HyperScriptHelperFn;
  fieldset: HyperScriptHelperFn;
  figcaption: HyperScriptHelperFn;
  figure: HyperScriptHelperFn;
  footer: HyperScriptHelperFn;
  form: HyperScriptHelperFn;
  h1: HyperScriptHelperFn;
  h2: HyperScriptHelperFn;
  h3: HyperScriptHelperFn;
  h4: HyperScriptHelperFn;
  h5: HyperScriptHelperFn;
  h6: HyperScriptHelperFn;
  head: HyperScriptHelperFn;
  header: HyperScriptHelperFn;
  hgroup: HyperScriptHelperFn;
  hr: HyperScriptHelperFn;
  html: HyperScriptHelperFn;
  i: HyperScriptHelperFn;
  iframe: HyperScriptHelperFn;
  img: HyperScriptHelperFn;
  input: HyperScriptHelperFn;
  ins: HyperScriptHelperFn;
  kbd: HyperScriptHelperFn;
  keygen: HyperScriptHelperFn;
  label: HyperScriptHelperFn;
  legend: HyperScriptHelperFn;
  li: HyperScriptHelperFn;
  link: HyperScriptHelperFn;
  main: HyperScriptHelperFn;
  map: HyperScriptHelperFn;
  mark: HyperScriptHelperFn;
  menu: HyperScriptHelperFn;
  meta: HyperScriptHelperFn;
  nav: HyperScriptHelperFn;
  noscript: HyperScriptHelperFn;
  object: HyperScriptHelperFn;
  ol: HyperScriptHelperFn;
  optgroup: HyperScriptHelperFn;
  option: HyperScriptHelperFn;
  p: HyperScriptHelperFn;
  param: HyperScriptHelperFn;
  pre: HyperScriptHelperFn;
  progress: HyperScriptHelperFn;
  q: HyperScriptHelperFn;
  rp: HyperScriptHelperFn;
  rt: HyperScriptHelperFn;
  ruby: HyperScriptHelperFn;
  s: HyperScriptHelperFn;
  samp: HyperScriptHelperFn;
  script: HyperScriptHelperFn;
  section: HyperScriptHelperFn;
  select: HyperScriptHelperFn;
  small: HyperScriptHelperFn;
  source: HyperScriptHelperFn;
  span: HyperScriptHelperFn;
  strong: HyperScriptHelperFn;
  style: HyperScriptHelperFn;
  sub: HyperScriptHelperFn;
  sup: HyperScriptHelperFn;
  table: HyperScriptHelperFn;
  tbody: HyperScriptHelperFn;
  td: HyperScriptHelperFn;
  textarea: HyperScriptHelperFn;
  tfoot: HyperScriptHelperFn;
  th: HyperScriptHelperFn;
  thead: HyperScriptHelperFn;
  time: HyperScriptHelperFn;
  title: HyperScriptHelperFn;
  tr: HyperScriptHelperFn;
  u: HyperScriptHelperFn;
  ul: HyperScriptHelperFn;
  video: HyperScriptHelperFn;
}