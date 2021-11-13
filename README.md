# single page stencil example

This repo contains a bare bones example of how to inline all component code within a single html file.

## Getting started

Install dependencies:

```bash
npm install
```

Build the html bundle:

```bash
npm run build
```

This will take your js, html, and styles, and create a `dist` folder with those assets. Notice that in `main.js` we pull the components from a `custom-elements` bundle and initialize all of them. In theory you could just pull in the ones you need and make this a lot more performant, see Stencil's [custom elements documentation](https://stenciljs.com/docs/custom-elements).
