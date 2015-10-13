
import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import ImageLoader from '../lib'

let preloader = new Preloader()
preloader.register( new ImageLoader({
    blob: false
}))

// preloader.load( 'http://fillmurray.com/100/100?jpg' )
// preloader.load( 'http://fillmurray.com/200/200?jpg' )
preloader.load( './awesome404.jpg' )

for ( let i = 0; i < 3; i++ ) {
    preloader.load( './awesome.jpg?' + ( Math.random() * 10000 ) + '&jpg' )
}
let start = performance.now()

preloader.on( EVENTS.LOAD, event => {
    console.log( '-- load', performance.now() - start )
    console.log( event )

    var image = new Image()
    // var urlCreator = window.URL || window.webkitURL
    // var imageUrl = urlCreator.createObjectURL( event.res )
    // image.src = imageUrl
    image.src = './awesome.jpg'

    document.body.appendChild( image )
})
preloader.on( EVENTS.LOAD_ERROR, event => {
    console.log( '** error', performance.now() - start )
    console.log( event )
})
preloader.on( EVENTS.COMPLETE, res => {
    console.log( '-- COMPLETE', performance.now() - start )
    console.log( res )
})
