import Ground from './ground'

export default class Sea extends Ground {
    /**
     * The sea tile, only for decoration purpose
     */
    constructor(scene, x, y, children) {
        super(scene, x, y, 'sea', children)
        this.decorations = ['boat']
        this._add_decoration()
    }

    _add_decoration() {
        // add les decorations
    }

    set life(value) {
        // cannot change the life of this one
        return
    }
}