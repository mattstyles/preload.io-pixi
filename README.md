# preload.io-pixi

> Preload.io wrapper for [pixi.loader](https://pixijs.github.io/docs/loaders_loader.js.html)

```shell
npm i -S preload.io-image
```

## Getting Started

Install [preload.io](https://github.com/mattstyles/preload.io) and register the image loader with it

```js
import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import PixiLoader from 'preload.io-pixi'

let preloader = new Preloader()
preloader.register( new PixiLoader() )
```

Then load the resource and it’ll be preloaded by the browser, cached in both browser cache and the pixi loader cache

```js
preloader.load( '/assets/avatar.jpg' )
```

## Matches

`PixiLoader` will match on `jpg`, `jpeg` and `png` resources.

This will conflict with [Preload.io-image](https://github.com/mattstyles/preload.io-image) so specify the loader to use if you need to whack images into Pixi and the old fashioned way:

```js
let pixiLoader = new PixiLoader()
preloader.load({
  resource: '/assets/avatar.jpg',
  loader: pixiLoader.name
})
```

## Passing options through to Resource-Loader

Pixi.Loader is built on top of [Resource-Loader](https://github.com/englercj/resource-loader) which accepts a couple of parameters, this PixiLoader plugin passes those options straight through.

```js
let pixiLoader = new PixiLoader({
    baseUrl: '/assets',
    concurrency: 10
})
```

## Using textures returned from images

The currently supported use-case is to use PixiLoader to load images (the underlying pixi loader is smarter than that) and those textures will be exposed on the load and complete events returned by Preload.io

```js
import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import PixiLoader from 'preload.io-pixi'

let preloader = new Preloader()
preloader.register( new PixiLoader() )

preloader.load({
    id: 'avatar',
    resource: '/assets/avatar.jpg'
})


preloader.on( EVENTS.COMPLETE, resources => {
    let texture = resources.get( 'avatar' ).texture
    // ... Do stuff with `texture`
})
```
