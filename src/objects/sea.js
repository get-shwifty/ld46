import Ground from './ground'

export default class Sea extends Ground {
    /**
     * The sea tile, only for decoration purpose
     */
    constructor(scene) {
        super(scene, 'sea')
        this.decorationsSprites = ['boat']
        this._addDecorations()
    }

    _addDecorations() {
        this._addDecoration('boat', 0, 20)
    }

    set life(value) {
        // cannot change the life of this one
        return
    }
}