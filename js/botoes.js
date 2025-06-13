export default class Botoes extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.donut = [];
    }
    static preload(scene) {
        scene.load.image('botaovermelho', 'source/img/teclaVermelho2.png');

        scene.load.image('botaoverde', 'source/img/teclaVerde2.png');

        scene.load.image('botaoamarelo', 'source/img/teclaAmarelo2.png');

        scene.load.image('botaoazul', 'source/img/teclaAzul2.png');
    }
    createNote(cor) {
        // Randomly place the donuts in the world
        // between x: 0 and 800, and y: 200 and 600
        // -TODO: setar spawn x até innerWidth
        //essa parte de ERA baixo é a que faz a nota spawnar em lugar aleatório
        const posX = document.getElementById(cor);
        const rect = posX.getBoundingClientRect();
        //const x = Phaser.Math.Between(200, 1000);                         
        const x = (rect.left + (rect.right - rect.left) / 2) - 5;

        const y = 100;

        if (cor == "vermelho") {
            this.donut.push(this.scene.physics.add.image(x + 5, y, 'botaovermelho').setScale(6).setVelocityY(400, 10));
        }
        else if (cor == "verde") {
            this.donut.push(this.scene.physics.add.image(x + 5, y, 'botaoverde').setScale(6).setVelocityY(400, 10));
        }
        else if (cor == "amarelo") {
            this.donut.push(this.scene.physics.add.image(x + 5, y, 'botaoamarelo').setScale(6).setVelocityY(400, 10))
        }
        else if (cor == "azul") {
            this.donut.push(this.scene.physics.add.image(x + 5, y, 'botaoazul').setScale(6).setVelocityY(400, 10));
        }
    }
    update() {
        //Phaser.Actions.IncY(this.donut, 2, 2);

        //Phaser.Actions.WrapInRectangle(this.donuts, this.cameras.main.getBounds(), 128);
    }
}