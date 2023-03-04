# EnaLog Node.js package

### Installation

```
npm i enalog
```

### Usage

```js
import { pushEvent } from 'enalog';

await pushEvent('api-token', {
    project: 'enalog-project-name',
    name: 'event-name',
    push: true
});
```