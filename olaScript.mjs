import * as fs from "fs";
export default class olaScript extends Phaser.Physics.Arcade.Sprite
{


 
    var startTime = Date.now();
    //time
    const notes = [
      { time: 0, track: 68 },
      //{ time: 1200, track: 68 },
      //{ time: 1500, track: 68 },
      { time: 0, track: 74 },
      { time: 0, track: 75 },
      { time: 0, track: 70 },
      //{ time: 2400, track: 68 },
      //{ time: 2600, track: 75 },
      //{ time: 2900, track: 68 },
      //{ time: 3100, track: 75 },
      //{ time: 3300, track: 68 },
      //{ time: 3600, track: 75 },
      // aqui é para sincronizar a música
    ];

    let score = 0;
    const game = document.getElementById("game");
    const musica = document.getElementById("musica");
    const startButton = document.getElementById("start");

    function spawnNote(note) {
      const track = document.querySelector(`.track[data-key="${note.track}"]`);
      if (!track) return;

      const el = document.createElement("div");
      el.classList.add("note");
      track.appendChild(el);

      let pos = 0;
      const speed = 0; // Velocidade da nota indo p baixo 

      const interval = setInterval(() => {
        pos += speed;
        el.style.top = pos + "px";
        if (pos >= 470) {
          clearInterval(interval);
          if (el.parentElement) el.parentElement.removeChild(el);
        }
      }, 16); // Aproximadamente 60 frames por segundo
    }

    // Começar o jogo
    startButton.addEventListener("click", () => {
      musica.play();
      startTime = Date.now();
      setTimeout(pauseMusic, 5000);
      notes.forEach(note => {
        setTimeout(() => spawnNote(note), note.time);
      });

      startButton.style.display = "none"; // Esconde o botão
    });
    function pauseMusic() {
      musica.pause();
      console.log(vetorTempo)
    }
    // Apertar teclas
    document.addEventListener("keydown", e => {
      const track = document.querySelector(`.track[data-key="${e.}"]`);
      if (!track) return;

      // Efeito de "acerto" na zona(tipo uma piscada)OBS:essa bomba pisca só de clicar, não precisa acertar no timing.
      const hitZone = track.querySelector(".hit-zone");
      //Se tecla pressionada for a Verde
      if (e.keyD == "68") {
        hitZone.style = "background-image: url(source/_img/teclaVerde2.png);background-repeat:no-repeat;background-size:100% 100%;";
      }//Se tecla pressionada for a Amarelo 
      else if (e.keyJ == "74") {
        hitZone.style = "background-image: url(source/_img/teclaAmarelo2.png);background-repeat:no-repeat;background-size:100% 100%;";
      }//Se tecla pressionada for a Azul
      else if (e.keyK == "75") {
        hitZone.style = "background-image: url(source/_img/teclaAzul2.png);background-repeat:no-repeat;background-size:100% 100%;";
      }//Se tecla pressionada for a Vermelho
      else if (e.keyF == "70") {
        hitZone.style = "background-image: url(source/_img/teclaVermelho2.png);background-repeat:no-repeat;background-size:100% 100%;";
      }



      // Verificar se acertou a nota
      const notesOnTrack = track.querySelectorAll(".note");
      notesOnTrack.forEach(note => {
        const noteTop = parseInt(note.style.top);
        if (noteTop > 440 && noteTop < 500) {
          track.removeChild(note);
          score += 10;
          document.getElementById("score").textContent = `Pontuação: ${score}`;
        }
      });
    });
    document.addEventListener("keyup", e => {
      const track = document.querySelector(`.track[data-key="${e.keyCode}"]`);
      const hitZone = track.querySelector(".hit-zone");
      //Se tecla pressionada for a Verde
      if (e.keyCode == "68") {
        hitZone.style = "background-image: url(source/_img/teclaVerde1.png);background-repeat:no-repeat;background-size:100% 100%;";
        const timeNow = Date.now();
        const beatTime = timeNow - startTime;
        const newLenght = vetorTempo.push([beatTime, 1, 0, 0, 0])
      }//Se tecla pressionada for a Amarelo 
      else if (e.keyCode == "74") {
        hitZone.style = "background-image: url(source/_img/teclaAmarelo1.png);background-repeat:no-repeat;background-size:100% 100%;";
        const timeNow = Date.now();
        const beatTime = timeNow - startTime;
        const newLenght = vetorTempo.push([beatTime, 0, 0, 1, 0])
      }//Se tecla pressionada for a Azul
      else if (e.keyCode == "75") {
        hitZone.style = "background-image: url(source/_img/teclaAzul1.png);background-repeat:no-repeat;background-size:100% 100%;";
        const timeNow = Date.now();
        const beatTime = timeNow - startTime;
        const newLenght = vetorTempo.push([beatTime, 0, 0, 0, 1])
      }//Se tecla pressionada for a Vermelho
      else if (e.keyCode == "70") {
        hitZone.style = "background-image: url(source/_img/teclaVermelho1.png);background-repeat:no-repeat;background-size:100% 100%;";
        const timeNow = Date.now();
        const beatTime = timeNow - startTime;
        const newLenght = vetorTempo.push([beatTime, 0, 1, 0, 0])
      }
    });
    const vetorTempo = [];
    const fs = require("fs");

    fs.readFile("mapaMusicaTeste.json", (error, date) => {
      if (error) {
        console.error(error);

        throw err;
      }
      const user = JSON.parse(date);
      console.log(user);

    }
    );


 }
