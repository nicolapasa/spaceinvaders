class EnemyFire{

    constructor(game, enemy){
        this.enemy=enemy
        this.game=game 
        this.left=this.enemy.posx;
        this.top=this.enemy.posy-2;
       
        this.width=6
        this.height=9

        this.speed=3
        this.speedy =-this.speed
        this.toDeleting=false  
        this.element=document.createElement('img')
        this.element.src='./images/Projectile01.png'
        this.element.style.position='absolute'
        this.element.style.top=`${this.top}px`
        this.element.style.left=`${this.left}px`
        this.element.style.height=`${this.height}px`
        this.element.style.width=`${this.width}px`
        this.game.gameScreen.appendChild(this.element)


    }


   move(){
   
    this.top +=this.speedy
   
    this.update()
   }

   update(){
   // this.element.style.left=`${this.left}px`
    this.element.style.top=`${this.top}px`
   }
    
  
   didCollide(element){
    const enemyRect = element.getBoundingClientRect();
    const ballRect = this.element.getBoundingClientRect();
  
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




  checkFireOut(){
    if (this.top + this.height > this.game.height){

        this.toDeleting=true;
        this.element.remove()
        
        
    }
    return true;
 }
}