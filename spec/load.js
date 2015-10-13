
import tape from 'tape'

import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import PixiLoader from '../lib'

tape( 'Should expose pixiLoader as the name of the module loader', t => {
    t.plan( 1 )

    let pixiLoader = new PixiLoader()

    t.equal( pixiLoader.name, 'pixiLoader' )
})
