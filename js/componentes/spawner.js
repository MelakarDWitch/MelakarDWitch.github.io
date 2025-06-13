export class spawnerBotoes {
    #scene;
    #group;
    #spawnIntervalo;
    #spawnAt;

    contructor(scene,botaoClass, spawnConfig){
        this.#scene = scene;
        this.#group = scene.add.group({
            name:`${this.construtor.name}-${Phaser.Math.RND.uuid()}`,
            classType: botaoClass, 
            //criando essa classe ACIMA, a gente libera do phaser usar essa classe para criar instancias desa classe(?)
        })
     }
}
