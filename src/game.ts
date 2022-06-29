import 'phaser';

export default class Demo extends Phaser.Scene
{
    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        this.load.spritesheet('ball', 'assets/sprites/balls.png', {frameWidth: 17, frameHeight: 17})
    }

    create ()
    {
        this.cameras.main.centerOn(0, 0);

        this.physics.add.
        const balls = this.physics.add.group({defaultKey: 'ball', bounceX: 0, bounceY: 0});
        balls.defaults.setVelocityY = 50;
        balls.defaults.setGravityX = 0;
        balls.defaults.setGravityY = 0;

        let created = balls.createMultiple({
            quantity: 3,
            key: balls.defaultKey,
            frame: 2
        })

        const triangle: Phaser.Geom.Triangle = new Phaser.Geom.Triangle(0,17,8.5,0,17,17);
        Phaser.Actions.PlaceOnTriangle(created,triangle);
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#222222',
    width: 1024,
    height: 768,
    scene: Demo,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

const game = new Phaser.Game(config);
