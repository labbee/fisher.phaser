import config from '../config'


function preload() {
    this.load.atlas(
        'misc', `${config.cdn}/static/textures/misc.png?1`, `${config.cdn}/static/textures/misc.json?1`
    )

    this.load.on('complete', () => {
        window.dispatchEvent(new CustomEvent('resize', {
            detail: {delay: 1}
        }))
    })
}

function create() {
    const {width, height} = this.sys.game.canvas

    this.bounds = {
        x: -100,
        y: -100,
        width: window.innerWidth + 200,
        height: window.innerHeight + 200
    }

    this.container = this.add.container(width / 2, height / 2)



    this.bkg = this.add.sprite(0, 0, 'misc', 'bkg.jpg')
    this.bkg.setScale(config.width / this.bkg.width, config.height / this.bkg.height)

    this.overlay = this.add.tileSprite(
        0, 0,
        config.width, config.height,
        'misc', 'overlay.png'
    )

    this.overlay.depth = 3

    this.fishes = []
    for (let i = 0; i < 20; i++) {
        const
            id = `fish.${i % 4 + 1}.png`,
            fish = this.add.sprite(
                this.sys.game.canvas.width * Math.random(),
                this.sys.game.canvas.height * Math.random(),
                'misc', id
            )

        fish.direction = Math.random() * Math.PI * 2
        fish.speed = 2 + Math.random() * 2
        fish.turnSpeed = Math.random() - .8
        fish.setInteractive()
        this.input.setDraggable(fish)
        fish.on('drag', (ev, x, y) => fish.setPosition(x, y))
        this.fishes.push(fish)
    }

    this.container.add(this.bkg)

    this.events.on('resize', resize, this)
    window.container = this.container
}

function update() {

    for (const fish of this.fishes) {
        fish.direction += fish.turnSpeed * .01

        fish.x += Math.sin(fish.direction) * fish.speed
        fish.y += Math.cos(fish.direction) * fish.speed

        fish.rotation = -fish.direction - Math.PI / 2

        fish.x < this.bounds.x ? fish.x += this.bounds.width :
        fish.x > this.bounds.x + this.bounds.width ? fish.x -= this.bounds.width : null
        fish.y < this.bounds.y ? fish.y += this.bounds.height :
        fish.y > this.bounds.y + this.bounds.height ? fish.y -= this.bounds.height : null
    }

    this.overlay.tilePositionX += .5
    this.overlay.tilePositionY += .5

    this.overlay.tilePositionX %= 512
    this.overlay.tilePositionY %= 512
}

function resize(w, h) {
    const
        {width, height} = this.container.getBounds(),
        ratio = Math.max(w / width, h / height)

    this.bounds.width = w + 200
    this.bounds.height = h + 200

    this.cameras.resize(w, h)

    this.overlay.setPosition(w / 2, h / 2)
    this.overlay.setSize(w, h)

    this.container.setPosition(w / 2, h / 2)
    this.container.setScale(this.container.scaleX * ratio)

}

export default {
    create,
    preload,
    update,
    resize
}