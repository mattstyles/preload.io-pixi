
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


/**
 * Wraps Pixi.Loader for preload.io
 */
export default class PixiLoader {
    /**
     * @constructs
     * @param opts <Object> passed through to Pixi.Loader constructor, defaults as Resource-Loader defaults
     *   @param baseUrl <String> _''_ base url to look for assets
     *   @param concurrency <Integer> _10_ max number of concurrent loads to attempt
     */
    constructor( opts = { baseUrl: '', concurrency: 10 } ) {
      this.opts = opts
      this.name = 'pixiLoader'
      this.match = /jpg$|jpeg$|png$/

      this.loader = new Pixi.loaders.Loader( this.opts.baseUrl, this.opts.concurrency )
    }

    /**
     * Promisifies Pixi.Loader
     * @param opts <Object> configuration about the load event
     */
    _loadPromise( opts ) {
      return new Promise( ( resolve, reject ) => {
        this.loader
            .add( opts.resource )
            .load( function( loader, resources ) {
              let res = resources[ opts.resource ]
              if ( res.error ) {
                // We cant get the error code from Resource-Loader
                // so generic to 500 (anything non-200 is probably safe)
                reject({
                  status: 500,
                  res: res.error,
                  raw: res
                })
                return
              }

              resolve( res )
            })
      })
    }

    /**
     * @async
     * Loads the resource and emits load events
     * @param ctx <Object> preload.io context
     * @param opts <Object> opts used to configure the load event
     */
    async load( ctx, opts ) {
      let res = null
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
        status: 200,
        res: res,
        texture: res.texture || null
      })
    }
}
