class HandleInput{


    constructor(game){
        this.game=game 
        this.timer=500
        this.canShoot=true
        setInterval(()=>{
            this.canShoot=true
        }, this.timer)

    }
    

    

    update(){

        document.addEventListener('keydown', (event)=>{

            const keysPossible=['ArrowLeft', 'ArrowRight', ' ']
            const key=event.key
           
            if(keysPossible.includes(key)){


                   switch (key) {
                    case 'ArrowLeft':
                        this.game.player.directionX=-1
                    break;
                    case 'ArrowRight':
                        this.game.player.directionX=1
                    break;
                    case ' ':
                       if(this.canShoot){
                        this.game.player.shoot()
                        this.canShoot=false
                       }      
                     
                    break;
                   
                   }
                       


            }
             

        })

        document.addEventListener('keyup', (event)=>{
            this.game.player.directionX=0

        })
    }
}