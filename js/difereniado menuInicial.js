import Botoes from './botoes.js';

// comentários daoras
export default class menuInicial extends Phaser.Scene {
    constructor() {
        super('menuInicial')
    }

    preload() {
        Botoes.preload(this);
        this.load.audio('musica', 'source/musicas/Coasting.mp3');
        this.load.json('beatmap', 'js/objetos/mapaMusicaTeste.json');
        this.load.image('teste', 'source/_img/discoVerde.png');
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

        // contadores de erro
        this.erros = 0;
        this.maxErros = 10;
    }

    // tela de derrota
    gameOver() {
        this.scene.pause(); // Pausa o jogo
        if (this.musica) this.musica.stop(); // Para a música

        // Cria a div de game over
        const gameOverDiv = document.createElement('div');
        gameOverDiv.id = 'gameOverScreen';
        gameOverDiv.innerHTML = `
            <div style="text-align:center; color:white;">
                <h1>Você perdeu!</h1>
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
                if (this.erros >= this.maxErros) {
                    this.gameOver();
                    return true;
                }
            }
            return false;
        };

        // aqui verirfica os erros de cada spawner
        if (verificarErro(this.spawnerVerde, 0)) return;
        if (verificarErro(this.spawnerVermelho, 1)) return;
        if (verificarErro(this.spawnerAmarelo, 2)) return;
        if (verificarErro(this.spawnerAzul, 3)) return;

        this.spawnerVerde.update();
        this.spawnerVermelho.update();
        this.spawnerAmarelo.update();
        this.spawnerAzul.update();

        // tecla verde
        if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
            this.posXVerde.style = "background-image: url(source/_img/teclaVerde3.png);background-repeat:no-repeat;background-size:100% 100%;";
            const donut = this.spawnerVerde.donut[this.missCount[0]];
            if (donut) {
                const dist = Phaser.Math.Distance.Between(donut.x, donut.y, this.xVerde, 737);
                if (dist <= 80) {
                    donut.destroy();
                    this.spawnerVerde.donut.splice(this.missCount[0], 1);
                    if (dist > 50) score += 10;
                    else if (dist > 30) score += 30;
                    else score += 50;
                    scoreRef.innerHTML = score;
                }
            }
        }
        if (Phaser.Input.Keyboard.JustUp(this.keyD)) {
            this.posXVerde.style = "background-image: url(source/_img/teclaVerde1.png);background-repeat:no-repeat;background-size:100% 100%;";
        }

        // tecla vermelha
        if (Phaser.Input.Keyboard.JustDown(this.keyF)) {
            this.posXVermelho.style = "background-image: url(source/_img/teclaVermelho3.png);background-repeat:no-repeat;background-size:100% 100%;";
            const donut = this.spawnerVermelho.donut[this.missCount[1]];
            if (donut) {
                const dist = Phaser.Math.Distance.Between(donut.x, donut.y, this.xVermelho, 737);
                if (dist <= 50) {
                    donut.destroy();
                    this.spawnerVermelho.donut.splice(this.missCount[1], 1);
                    if (dist > 30) score += 10;
                    else if (dist > 10) score += 30;
                    else score += 50;
                    scoreRef.innerHTML = score;
                }
            }
        }
        if (Phaser.Input.Keyboard.JustUp(this.keyF)) {
            this.posXVermelho.style = "background-image: url(source/_img/teclaVermelho1.png);background-repeat:no-repeat;background-size:100% 100%;";
        }

        // tecla amarela 
        if (Phaser.Input.Keyboard.JustDown(this.keyJ)) {
            this.posXAmarelo.style = "background-image: url(source/_img/teclaAmarelo3.png);background-repeat:no-repeat;background-size:100% 100%;";
            const donut = this.spawnerAmarelo.donut[this.missCount[2]];
            if (donut) {
                const dist = Phaser.Math.Distance.Between(donut.x, donut.y, this.xAmarelo, 737);
                if (dist <= 50) {
                    donut.destroy();
                    this.spawnerAmarelo.donut.splice(this.missCount[2], 1);
                    if (dist > 30) score += 10;
                    else if (dist > 10) score += 30;
                    else score += 50;
                    scoreRef.innerHTML = score;
                }
            }
        }
        if (Phaser.Input.Keyboard.JustUp(this.keyJ)) {
            this.posXAmarelo.style = "background-image: url(source/_img/teclaAmarelo1.png);background-repeat:no-repeat;background-size:100% 100%;";
        }

        // tecla azul
        if (Phaser.Input.Keyboard.JustDown(this.keyK)) {
            this.posXAzul.style = "background-image: url(source/_img/teclaAzul3.png);background-repeat:no-repeat;background-size:100% 100%;";
            const donut = this.spawnerAzul.donut[this.missCount[3]];
            if (donut) {
                const dist = Phaser.Math.Distance.Between(donut.x, donut.y, this.xAzul, 737);
                if (dist <= 50) {
                    donut.destroy();
                    this.spawnerAzul.donut.splice(this.missCount[3], 1);
                    if (dist > 30) score += 10;
                    else if (dist > 10) score += 30;
                    else score += 50;
                    scoreRef.innerHTML = score;
                }
            }
        }
        if (Phaser.Input.Keyboard.JustUp(this.keyK)) {
            this.posXAzul.style = "background-image: url(source/_img/teclaAzul1.png);background-repeat:no-repeat;background-size:100% 100%;";
        }
    }
}