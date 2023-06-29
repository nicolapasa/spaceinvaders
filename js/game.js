class Game{


  
    constructor(){
        
        this.width=640
        this.height=480 
        this.gameIntro=document.getElementById('game-intro')
        this.gameContainer=document.getElementById('game-container')
        this.gameScreen=document.getElementById('game-screen')
        this.gameOver=document.getElementById('game-over')
        this.gameWinScreen=document.getElementById('game-win')
        this.screenTitle=document.getElementById('screenTitle')
        this.btnAudioController=document.getElementById('audioController')
        this.namePlayerInput=document.getElementById('namePlayer')
        this.scoreBoardTop=document.getElementById('scoreBoardTop')
        this.listScore=document.getElementById('list')
        this.btnStart=document.getElementById("start-game")
        this.player=new Player(this)
        this.handler=new HandleInput(this)
        this.ui=new UI(this)
        this.blockSound=new Sound(this, './sound/explosion.wav')
        this.musicGame=new Sound(this, './sound/mega.mp3')
        this.save=new Save(this)
        this.levelManager=new LevelManager(this)
        this.isGameOver=false
        this.enemies=[]
        this.score=0
        this.lives=3
        this.gameWin=false
        this.soundOn=true
        this.name =''
        this.end=false 
        this.idInterval=0
        this.timerEnd=60000
        this.timer=0
        this.explosions=[]
        this.currentEnemiesDestroyed=0


    }

    startGame(){
        this.gameContainer.style.display='block'
        this.gameIntro.style.display='none'
        this.musicGame.play()
        this.name=this.namePlayerInput.value
        this.save.initGame()
        
        this.enemiesInterval(this.levelManager.levelSetup[this.levelManager.currentLevel-1].timeSpawn)
          
        this.levelManager.currentLevel=1
     
        this.gameLoop()
    }

   resetLevel(){
    clearInterval(this.idInterval)
    this.currentEnemiesDestroyed=0
    this.levelManager.next()

    if(this.levelManager.currentLevel>this.levelManager.levels) {
        this.end = true 
        this.gameWin=true
    }
    else{
   // console.log("current level" +this.levelManager.currentLevel)
    this.enemiesInterval(this.levelManager.levelSetup[this.levelManager.currentLevel-1].timeSpawn)
    //this.gameLoop()
    }   
    

   }

   reset(){
    this.enemies.forEach(enemy=> {
       enemy.element.remove()
    })
    this.enemies=[]
    this.gameScreen.appendChild(this.player.pad)
    this.player.lives-=1
   }

   enemiesInterval(timeInterval){
    this.makeEnemies()
     this.idInterval  = setInterval(()=>{
        this.makeEnemies()
       // this.timer+=4000
         }, timeInterval)

   }
   
   checkTimer(){
        if(this.timer>=this.timerEnd){
             clearInterval(this.idInterval)
        }
   }
   makeEnemies(){
    let minCol=Math.floor(Math.random()*(8 -4 + 1) )+4
    let maxCol=Math.floor(Math.random()*(12 -minCol +1 ))+minCol
    let enemyNumber=Math.floor(Math.random()*(3)+1 )
    for (let i = 0; i < 2; i++) {
        for (let j = minCol; j < maxCol; j++) {
       
            this.enemies.push(new Enemy(this, j*35, i*35, `./images/enemy${enemyNumber}.png`, 200))
        }
      
    }
   }
   
   checkEnemiesDestroyed(){
      
        if(this.currentEnemiesDestroyed>= this.levelManager.levelSetup[this.levelManager.currentLevel-1].enemiesToDestroy){
            this.resetLevel()
        }
        
   }

    update(){
       // this.checkTimer()
        this.levelManager.update()
        this.soundController()
        this.player.move()
        this.handler.update()
        this.explosions.forEach(explosion=>{
            explosion.update()
        })
        this.enemies.forEach(enemy=> {
            enemy.move()
            enemy.checkCollideBottom()
            if(this.player.didCollide(enemy.element)){
                //this.lives-=1
                this.blockSound.play()
                this.explosions.push(new Effects(this, enemy.posx, enemy.posy))
                this.player.hit()
                
            }
    //         enemy.projectiles.forEach(projectile=> {
    //             projectile.checkFireOut()
    //             if(projectile.didCollide(this.player.pad)){
    //                 this.blockSound.play()
    //                 this.explosions.push(new Effects(this, this.player.left, this.player.top))
    //                 this.lives-=1
    //                  projectile.toDeleting=true 
    //                  projectile.element.remove()
 
                
    //          }
    //  })
                    
           
            this.player.projectiles.forEach(projectile=> {
                projectile.checkFireOut()


                if(projectile.didCollide(enemy.element)){
                           this.blockSound.play()
                           this.explosions.push(new Effects(this, enemy.posx, enemy.posy))
                           this.currentEnemiesDestroyed+=1
                            enemy.toDeleting=true;
                            enemy.element.remove()
                            projectile.toDeleting=true 
                            projectile.element.remove()
                            this.score+=enemy.score
        
                       
                    }
            })


        })    

        this.checkEnemiesDestroyed()
        this.enemies= this.enemies.filter(enemy=>!enemy.toDeleting)
        this.player.projectiles= this.player.projectiles.filter(projectile=>!projectile.toDeleting)
        this.explosions= this.explosions.filter(explosion=>!explosion.toDeleting)
          
        
        this.ui.update()

        // if(this.enemies.length===0) {
        //   //  this.gameWin=true 
        //   //  this.end=true
        //         this.resetLevel()
        // }

    }


    gameLoop(){
        
        if(!this.end){
            this.update()
            requestAnimationFrame(()=>{
                this.gameLoop()
            })
    
        }
        else{
            this.endGame()
        }
      
      
    }
    endGame(){
        this.gameContainer.style.display='none'
        this.gameOver.style.display='block'

        this.save.saveScore() 
        this.save.loadScore() 
       if(this.isGameOver) {
        this.screenTitle.innerText='Game Over'
       }
       else{
        this.screenTitle.innerText='You Win!'
       }
       
    }


    soundController(){
        this.btnAudioController.addEventListener('click', (event)=>{
            this.btnAudioController.blur()
            if(this.soundOn){
              this.musicGame.stop()
              this.btnAudioController.innerText='Play Music'
              this.soundOn=false
              
            }
            else{
                this.musicGame.play()
                this.btnAudioController.innerText='Stop Music'
                this.soundOn=true
            }
           
            

        })
    }


}


