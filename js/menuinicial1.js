import Botoes from './botoes.js';

export default class menuInicial extends Phaser.Scene {
    constructor() {
        super('menuInicial')
    }

    preload() {
        Botoes.preload(this);
        this.load.audio('musica', 'source/musicas/Coasting.mp3');
        this.load.json('beatmap', 'js/objetos/mapaMusicaTeste.json');
        this.load.image('teste', 'source/_img/discoVerde.png');

        // Paletas (vidas perdidas)
        this.load.image('paleta1', 'paleta1.png');
        this.load.image('paleta2', 'paleta2.png');
        this.load.image('paleta3', 'paleta3.png');
        this.load.image('paleta4', 'paleta4.png');
        this.load.image('paleta5', 'paleta5.png');
        this.load.image('paleta6', 'paleta6.png');
    }

    spawnNota(notas) {
        const notasSplit = notas.split(",");
        if (notasSplit[0] == "1") this.spawnerVerde.createNote("verde");
        if (notasSplit[1] == "1") this.spawnerVermelho.createNote("vermelho");
        if (notasSplit[2] == "1") this.spawnerAmarelo.createNote("amarelo");
        if (notasSplit[3] == "1") this.spawnerAzul.createNote("azul");
    }

    create() {
        this.spawnerVermelho = new Botoes(this);
        this.spawnerVerde = new Botoes(this);
        this.spawnerAmarelo = new Botoes(this);
        this.spawnerAzul = new Botoes(this);

        const dados = this.cache.json.get('beatmap');
        const coastingBeatmap = dados['coasting'];

        for (let i = 0; i < coastingBeatmap.length; i++) {
            const timeMusic = parseInt(coastingBeatmap[i][0]);
            this.time.addEvent({
                delay: timeMusic + 1200,
                callback: this.spawnNota.bind(this, coastingBeatmap[i][1]),
                callbackScope: this,
                loop: false
            });
        }

        this.time.delayedCall(2, () => {
            this.musica = this.sound.add('musica');
            this.musica.play({ loop: true, volume: 1, delay: 2.5 });
        });

        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        this.posXVerde = document.querySelector("#verde > .hit-zone");
        let rect = this.posXVerde.getBoundingClientRect();
        this.xVerde = (rect.left + (rect.right - rect.left) / 2);

        this.posXVermelho = document.querySelector("#vermelho > .hit-zone");
        rect = this.posXVermelho.getBoundingClientRect();
        this.xVermelho = (rect.left + (rect.right - rect.left) / 2);

        this.posXAmarelo = document.querySelector("#amarelo > .hit-zone");
        rect = this.posXAmarelo.getBoundingClientRect();
        this.xAmarelo = (rect.left + (rect.right - rect.left) / 2);

        this.posXAzul = document.querySelector("#azul >  .hit-zone");
        rect = this.posXAzul.getBoundingClientRect();
        this.xAzul = (rect.left + (rect.right - rect.left) / 2);

        this.missCount = [0, 0, 0, 0];
        this.erros = 0;
        this.maxErros = 6;

        // Paletas (vidas perdidas) - maiores e na parte inferior direita
        this.paletas = [];
        const paletaX = this.scale.width - 500;
        const paletaY = this.scale.height - 700;
       
        for (let i = 0; i < this.maxErros; i++) {
            const paleta = this.add.image(paletaX, paletaY, `paleta${i + 1}`);
            paleta.setScale(5); // escala maior
            paleta.setVisible(false);
            paleta.setDepth(10); // garantir que fique por cima
            this.paletas.push(paleta);
        }
    }

    gameOver() {
        this.scene.pause();
        if (this.musica) this.musica.stop();

        const gameOverDiv = document.createElement('div');
        gameOverDiv.id = 'gameOverScreen';
        gameOverDiv.innerHTML = `
            <div style="text-align:center; color:white;">
                <h1>Você perdeu!</h1>
                <p>Erros: ${this.erros}/${this.maxErros}</p>
            </div>
        `;
        gameOverDiv.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: sans-serif;
            font-size: 32px;
            z-index: 9999;
        `;
        document.body.appendChild(gameOverDiv);
    }

    update() {
        const verificarErro = (spawner, index) => {
            const nota = spawner.donut[this.missCount[index]];
            if (nota && nota.y > 863) {
                nota.destroy();
                this.missCount[index]++;
                this.erros++;

                // Atualiza visibilidade das paletas
                this.paletas.forEach(p => p.setVisible(false));
                if (this.erros > 0 && this.erros <= this.maxErros) {
                    this.paletas[this.erros - 1].setVisible(true);
                }

                if (this.erros >= this.maxErros) {
                    this.gameOver();
                    return true;
                }
            }
            return false;
        };

        if (verificarErro(this.spawnerVerde, 0)) return;
        if (verificarErro(this.spawnerVermelho, 1)) return;
        if (verificarErro(this.spawnerAmarelo, 2)) return;
        if (verificarErro(this.spawnerAzul, 3)) return;

        this.spawnerVerde.update();
        this.spawnerVermelho.update();
        this.spawnerAmarelo.update();
        this.spawnerAzul.update();

        const teclas = [
            { key: this.keyD, spawner: this.spawnerVerde, x: this.xVerde, id: "#verde", img: "Verde" },
            { key: this.keyF, spawner: this.spawnerVermelho, x: this.xVermelho, id: "#vermelho", img: "Vermelho" },
            { key: this.keyJ, spawner: this.spawnerAmarelo, x: this.xAmarelo, id: "#amarelo", img: "Amarelo" },
            { key: this.keyK, spawner: this.spawnerAzul, x: this.xAzul, id: "#azul", img: "Azul" },
        ];

        teclas.forEach((tecla, i) => {
            const zona = document.querySelector(`${tecla.id} > .hit-zone`);
            if (Phaser.Input.Keyboard.JustDown(tecla.key)) {
                zona.style = `background-image: url(source/_img/tecla${tecla.img}3.png);background-repeat:no-repeat;background-size:100% 100%;`;
                const donut = tecla.spawner.donut[this.missCount[i]];
                if (donut) {
                    const dist = Phaser.Math.Distance.Between(donut.x, donut.y, tecla.x, 737);
                    if (dist <= 80) {
                        donut.destroy();
                        tecla.spawner.donut.splice(this.missCount[i], 1);

                        if (dist > 50) score += 10;
                        else if (dist > 30) score += 30;
                        else score += 50;

                        scoreRef.innerHTML = score;

                        // Reduz erro ao acertar
                        if (this.erros > 0) {
                            this.erros--;
                            this.paletas.forEach(p => p.setVisible(false));
                            if (this.erros > 0 && this.erros <= this.maxErros) {
                                this.paletas[this.erros - 1].setVisible(true);
                            }
                        }
                    }
                }
            }
            if (Phaser.Input.Keyboard.JustUp(tecla.key)) {
                zona.style = `background-image: url(source/_img/tecla${tecla.img}1.png);background-repeat:no-repeat;background-size:100% 100%;`;
            }
        });
    }
}