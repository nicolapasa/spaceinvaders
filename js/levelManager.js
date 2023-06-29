class LevelManager{


    constructor(game){

        this.game=game 
        this.levels=3
        this.currentLevel=1
        this.levelSetup=[
            { 
            level: 1,
            difficulty: 'easy',
            timeSpawn: 4000,
            enemiesToDestroy:10
           },
           { 
            level: 2,
            difficulty: 'medium',
            timeSpawn: 3000,
            enemiesToDestroy:20
           },
           { 
            level: 3,
            difficulty: 'medium',
            timeSpawn: 1000,
            enemiesToDestroy:40
           },
    ]

    }

    update(){
 
        
        if(this.currentLevel >this.levels){
           this.game.end=true
           this.game.gameWin=true
        }
    }
     next(){
        this.currentLevel+=1
     }

}