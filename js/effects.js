class Effects{

    constructor(game, posx, posy){
        this.game=game 
        this.height = 32;
        this.width = 32;
        this.posx =posx;
        this.posy = posy;
        this.topLeft=posx+this.height;
        this.bottomRight=posx+this.width;
        this.toDeleting=false;
        this.element=document.createElement('img')
        this.element.src='./images/Explosion02.gif'
        this.element.style.position='absolute'
        this.element.style.top=`${this.posy}px`
        this.element.style.left=`${this.posx}px`
        this.element.style.height=`${this.height}px`
        this.element.style.width=`${this.width}px`
        this.game.gameScreen.appendChild(this.element)
        this.timerEnd=50
        this.timer=0
    }


    update(){
        this.timer+=1
        this.checkTimer()
    }

    checkTimer(){
        if(this.timer>=this.timerEnd) {
            this.toDeleting=true;
            this.element.remove()
        }
    }


}