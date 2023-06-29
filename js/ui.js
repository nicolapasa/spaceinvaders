class UI{


    constructor(game){
 
     this.game=game
     this.scoreBoard=document.getElementById("score")
     this.levelBoard=document.getElementById("level")
     this.lifeBoard=document.getElementById("lives")
     this.finalScoreOver=document.getElementById("finalScoreOver")
   
    }
   
 
    update(){
     this.scoreBoard.innerText=this.game.score 
     this.levelBoard.innerText=this.game.levelManager.currentLevel
     this.lifeBoard.innerText=this.game.player.lives 
     this.finalScoreOver.innerText=this.game.score 

    }
 
 }