import { Composite } from 'matter';
import 'phaser';
import {
    GameObjects
} from 'phaser';

export default class Demo extends Phaser.Scene {

    ballVelocity = 1;


    constructor() {
        super('demo');
    }

    preload() {
        this.load.spritesheet('ball', 'assets/sprites/ball65.png', {
            frameWidth: 65,
            frameHeight: 65
        })
    }

    generateBall(x: number, y: number, color: number) {
        let ball = this.matter.add.sprite(x, y, 'ball', color, {restitution: 0});
        
        ball.setCircle(32.5);
        ball.setVelocityY(this.ballVelocity);
        ball.setRotation(0);
        ball.setAngle(0);
        ball.setMass(100000);
        ball.setBounce(0);
        ball.setFriction(2);
        ball.setIgnoreGravity(false)
        ball.setOnCollide(()=>{setTimeout(()=>ball.setStatic(true),10000)});
        
        return ball;
    }

    generateBallGroup(x: number, y: number, color: number) {

        const ballGroupPos = [[0, 65], [65, 65], [32.5, 5]];

        let ballGroup = ballGroupPos.map(el=>this.generateBall(el[0]+ x, el[1]+y, Phaser.Math.Between(0,4)));


        
        // ball.setOnCollide(()=>ball.setStatic(true))
        


        // let created = this.balls.createMultiple({
        //     quantity: 3,
        //     key: this.balls.defaultKey,
        //     frame: color
        // })
        // // const triangle: Phaser.Geom.Triangle = new Phaser.Geom.Triangle(0,65,32.5,0,65,65);
        // const triangle: Phaser.Geom.Triangle = new Phaser.Geom.Triangle(0 + x, 65 + y, 32.5 + x, 5 + y, 65 + x, 65 + y);
        // let obj = Phaser.Actions.PlaceOnTriangle(created, triangle);
        return ballGroup;
    }

    create() {
        // this.cameras.main.centerOn(0, 0);
        this.cameras.main.setPosition(0, 0);
        // let leftWall = this.add.rectangle(500, 240 + 335, 10, 670, 0x20c5ed);
        // let rightWall = this.add.rectangle(1150, 240 + 335, 10, 670, 0x20c5ed);
        // let floor = this.add.rectangle(500 + 325, 910, 650, 10, 0x20c5ed);

        let leftWall = this.add.rectangle(0, 0 + 335, 10, 670, 0x20c5ed);
        let rightWall = this.add.rectangle(660, 0 + 335, 10, 670, 0x20c5ed);
        let floor = this.add.rectangle(325, 670, 650, 10, 0x20c5ed);

        

        let container = this.add.container(0, 0, [leftWall, rightWall, floor]);
        // var r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);
        // // let playerArea = this.physics.add.staticGroup();
        // // playerArea.add(floor);
        // // playerArea.add(leftWall);
        // // playerArea.add(rightWall);

        // this.playerArea = playerArea;
        
        this.matter.add.gameObject(leftWall, {isStatic: true});
        this.matter.add.gameObject(rightWall, {isStatic: true});
        this.matter.add.gameObject(floor, {isStatic: true});


        // making stopper
        for (let i = 3; i < 650; i+=65){
            this.matter.add.fromVertices(i,660,[{x:0, y:25},{x:12.5, y:0},{x:25, y:25}], {isStatic: true})
        }
        
        

        // const ball = this.physics.add.image(100, 0, 'ball', 2);
        // ball.setGravity(0,0);
        // ball.setVelocity(0,this.ballVelocity);

        // const ball2 = this.physics.add.image(130, 65, 'ball', 2);
        // ball2.setGravity(0,0);
        // ball2.setVelocity(0,this.ballVelocity);


        // this.balls = this.physics.add.group({
        //     defaultKey: 'ball',
        //     bounceX: 0,
        //     bounceY: 0
        // });


        // this.balls.setCircle(65);
        // this.balls.defaults.setVelocityY = this.ballVelocity;
        // this.balls.defaults.setGravityX = 0;
        // this.balls.defaults.setGravityY = 0;
        // // this.balls.defaults.setCircle(65)



        // this.physics.add.collider(playerArea, this.balls);
        // this.physics.add.collider(this.balls, this.balls);

        this.generateBallGroup(50, 0, 1);
        setInterval(()=>{this.generateBallGroup(Phaser.Math.Between(50,400), 0, 2)}, 5000)
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#222222',
    width: 1920,
    height: 1080,
    scene: Demo,
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
};

const game = new Phaser.Game(config);