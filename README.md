# preload.io-pixi

> Preload.io wrapper for [pixi.loader]()

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

Then load the resource and it’ll be preloaded by the browser and cached

```js
preloader.load( '/assets/avatar.jpg' )
```
