class Player{


    constructor(game){
        this.game=game 
        //create player @todo image 
        this.pad=document.createElement('img')
        this.pad.setAttribute('src', './images/Player01.gif')
        this.pad.style.height=`${this.height}px`  
        this.pad.style.width=`${this.width}px` 
        this.width=96
        this.height=32
        this.left=300 
        this.top=this.game.height -this.height -8
        this.pad.style.position='absolute'
        this.pad.style.top=`${this.top}px`
        this.pad.style.left=`${this.left}px`
        this.game.gameScreen.appendChild(this.pad)
        this.projectiles=[];
        this.directionX=0 
        this.speed=5
    
    }



    move(){
        this.left += this.directionX *this.speed
        if(this.left<10) {
            this.left=10
          }
           // handles right hand side
    if (this.left > this.game.gameScreen.offsetWidth - this.width - 10) {
        this.left = this.game.gameScreen.offsetWidth - this.width - 10;
      }

      this.update()
    }

    update(){
        this.pad.style.left=`${this.left}px`
        this.projectiles.forEach(projectile=>{
            projectile.move();
        });  
    }

    shoot(){
        this.projectiles.push(new Fire(this.game))
   
    }

    didCollide(element){
        const enemyRect = element.getBoundingClientRect();
        const ballRect = this.pad.getBoundingClientRect();
      
        if (
          enemyRect.left < ballRect.right &&
          enemyRect.right > ballRect.left &&
          enemyRect.top < ballRect.bottom &&
          enemyRect.bottom > ballRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }
}