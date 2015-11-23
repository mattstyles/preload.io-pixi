
import 'regenerator/runtime'
import 'whatwg-fetch'

import Pixi from 'pixi.js'

import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import PixiLoader from '../lib'


// setup Pixi
var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var stage = new Pixi.Container()
var renderer = new Pixi.autoDetectRenderer( WIDTH, HEIGHT, {
  resolution: window.devicePixelRatio || 1
})
renderer.view.width = WIDTH * window.devicePixelRatio
renderer.view.height = HEIGHT * window.devicePixelRatio
renderer.view.style.width = WIDTH + 'px'
renderer.view.style.height = HEIGHT + 'px'
renderer.view.style.display = 'block'
renderer.view.style.position = 'absolute'
renderer.view.style.top = 0
renderer.view.style.left = 0
renderer.view.style.zIndex = -1
renderer.backgroundColor = 0xf1f1f1
document.body.appendChild( renderer.view )

/// setup preload
let preloader = new Preloader()
let pixiLoader = new PixiLoader()
preloader.register( pixiLoader )

preloader.load({
  resource: './chara.json',
  id: 'chara',
  loader: pixiLoader.name
})

preloader.on( EVENTS.LOAD, event => {
  console.log( event )

  var pos = [ 72, 128 ]

  Object.keys( event.res.textures ).forEach( id => {
    var tex = event.res.textures[ id ]
    tex.baseTexture.scaleMode = Pixi.SCALE_MODES.NEAREST
    var sprite = new Pixi.Sprite( tex )
    pos[ 0 ] += 48
    sprite.position.set( pos[ 0 ], pos[ 1 ] )
    sprite.scale.set( 4, 4 )
    stage.addChild( sprite )
  })
})
preloader.on( EVENTS.LOAD_ERROR, event => {
  console.log( '** error' )
  console.log( event )
})
preloader.on( EVENTS.COMPLETE, res => {
  console.log( '-- COMPLETE' )
  console.log( res )
  window.res = res

  renderer.render( stage )
})

window.render = function() {
  renderer.render( stage )
}
