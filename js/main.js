import menuInicial from './menuInicial.js';


window.onload= function(){
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    physics:{
        
        default: 'arcade',
        arcade:{
            debug:true,
        }
    },
    scene:[menuInicial]
 }
 let game = new Phaser.Game(config);

}