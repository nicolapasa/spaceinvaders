class Enemy{

    constructor(game, posx, posy, image, score){
        this.game=game;
        this.height = 32;
        this.width = 32;
        this.posx =posx;
        this.posy = posy;
        //this.color=color;
        this.score=score;
        this.speed=0.6;
        this.topLeft=posx+this.height;
        this.bottomRight=posx+this.width;
        this.toDeleting=false;
        this.element=document.createElement('img')
        //this.element.style.backgroundColor=this.color
        this.element.src=image
        this.element.style.position='absolute'
        this.element.style.top=`${this.posy}px`
        this.element.style.left=`${this.posx}px`
        this.element.style.height=`${this.height}px`
        this.element.style.width=`${this.width}px`
        this.game.gameScreen.appendChild(this.element)
        this.directions=[1,-1]
        this.direction=this.directions[Math.floor(Math.random()*(1-0+1))+0]
        this.projectiles=[]
     
    }


    move(){
        console.log("speed" , this.speed)
        this.posy+=this.speed
        this.posx+=this.direction*this.speed;
        if(this.posx<10) {
            this.direction=-this.direction
          }
           // handles right hand side
    if (this.posx > this.game.gameScreen.offsetWidth - this.width - 10) {
        this.direction=-this.direction
      }
        this.update()
    }

    update(){
        this.element.style.top=`${this.posy}px`
        this.element.style.left=`${this.posx}px`
       // this.fire()
    }

   fire(){
  
       setInterval(()=>{
         this.projectiles.push(new EnemyFire(this.game, this))
       }, 2000)

   }

    checkCollideBottom(){

        if (this.posy >this.game.player.top){
           
              
            this.toDeleting=true;
            this.element.remove()
            
            return true;
        }
        return false
     }

     
    
}