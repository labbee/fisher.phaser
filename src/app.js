import phaser from 'phaser'
import {game} from './scenes'
import config from './config'

const {innerWidth, innerHeight, devicePixelRatio} = window


const app = new phaser.Game({
    width: innerWidth * devicePixelRatio,
    height: innerHeight * devicePixelRatio,
    scene: [game]
})

window.addEventListener('resize', ev => {
    if (app.resizing) return
    app.resizing = true

    setTimeout(() => {
        const
            view = app.canvas,
            {innerWidth, innerHeight} = window

        let width, height

        app.resizing = false

        if (innerWidth <= innerHeight) {
            width = innerHeight
            height = innerWidth
            config.landscape = true
        } else {
            width = innerWidth
            height = innerHeight
            config.landscape = false
        }


        view.style.width = `${width}px`
        view.style.height = `${height}px`
        view.style.top = `${(innerHeight - height) * .5}px`
        view.style.left = `${(innerWidth - width) * .5}px`

        app.resize(width * devicePixelRatio, height * devicePixelRatio)
    }, (ev.detail && ev.detail.delay) || 3e2)
})

Object.defineProperties(phaser.Input.Pointer.prototype, {
    x: {
        get() {
            return config.landscape ? this.position.y / this.manager.bounds.width * this.manager.bounds.height : this.position.x
        },

        set(v) {
            this.position.x = v
        }
    },

    y: {
        get() {
            return config.landscape ? (devicePixelRatio - this.position.x / this.manager.bounds.height) * this.manager.bounds.width : this.position.y
        },

        set(v) {
            this.position.y = v
        }
    }
})