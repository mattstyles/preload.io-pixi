
import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import PixiLoader from '../lib'

let preloader = new Preloader()
let pixiLoader = new PixiLoader()
preloader.register( pixiLoader )

// preloader.load( 'http://fillmurray.com/100/100?jpg' )
// preloader.load( 'http://fillmurray.com/200/200?jpg' )
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
})
preloader.on( EVENTS.LOAD_ERROR, event => {
    console.log( '** error', performance.now() - start )
    console.log( event )
})
preloader.on( EVENTS.COMPLETE, res => {
    console.log( '-- COMPLETE', performance.now() - start )
    console.log( res )
    window.res = res
})
