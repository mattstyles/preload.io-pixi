
import 'regenerator/runtime'
import 'whatwg-fetch'

import Pixi from 'pixi.js'

import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import PixiLoader from '../lib'


// setup Pixi
var stage = new Pixi.Container()
var renderer = new Pixi.autoDetectRenderer( 440, 320 )
document.body.appendChild( renderer.view )

/// setup preload
let preloader = new Preloader()
let pixiLoader = new PixiLoader()
preloader.register( pixiLoader )

// this will fail
preloader.load({
  resource: './awesome404.jpg',
  id: 'awesome404'
})

for ( let i = 0; i < 3; i++ ) {
  preloader.load({
    resource: './awesome.jpg?' + ~~( Math.random() * 100000 ) + '&jpg',
    id: 'awesome' + i,
    loader: pixiLoader.name
  })
}
let start = performance.now()

preloader.on( EVENTS.LOAD, event => {
  console.log( '-- load', performance.now() - start )
  console.log( event )

  var sprite = new Pixi.Sprite( event.texture )
  sprite.position.x = 20
  sprite.position.y = 10
  stage.addChild( sprite )
})
preloader.on( EVENTS.LOAD_ERROR, event => {
  console.log( '** error', performance.now() - start )
  console.log( event )
})
preloader.on( EVENTS.COMPLETE, res => {
  console.log( '-- COMPLETE', performance.now() - start )
  console.log( res )
  window.res = res

  renderer.render( stage )
})
