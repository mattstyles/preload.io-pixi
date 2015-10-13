import 'regenerator/runtime'
import 'whatwg-fetch'
import { EVENTS } from 'preload.io'
import Pixi from 'pixi.js'


class IOError extends Error {
    constructor( opts ) {
        super( opts.message )

        this.name = 'IOError'
        this.stack = ( new Error() ).stack

        Object.keys( opts ).forEach( key => {
            this[ key ] = opts[ key ]
        })
    }
}


export default class PixiLoader {
    constructor( opts ) {
        this.opts = {}
        this.name = 'pixiLoader'
        this.match = /jpg$|jpeg$|png$/

        this.loader = new Pixi.loaders.Loader()
    }

    _loadPromise( opts ) {
        return new Promise( ( resolve, reject ) => {
            this.loader
                .add( opts.resource )
                .load( function( loader, resources ) {
                    console.log( 'loader', loader )
                    console.log( 'resources', resources )

                    resolve( 'something' )
                })

        })
    }

    async load( ctx, opts ) {
        // @TODO optionally use old school tag loading
        let res = null
        let blob = null
        try {
            res = await this._loadPromise( opts )
        } catch( err ) {
            ctx.emit( EVENTS.LOAD_ERROR, {
                id: opts.id,
                status: err.status,
                res: err
            })
            return
        }

        ctx.emit( EVENTS.LOAD, {
            id: opts.id,
            status: res.status,
            res: res
        })
    }
}
