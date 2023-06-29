class Save{

    constructor(game){
        this.game=game 
        this.topScore=[]
    }
    
    initGame(){
        if(!localStorage.getItem("topScoreSpace")) {
            const topScoreTemp=[]
            for (let index = 1; index < 11; index++) {
                
                topScoreTemp.push({name: 'aaa', score:0})
            }
            localStorage.setItem('topScoreSpace', JSON.stringify(topScoreTemp))
            this.topScore=topScoreTemp
          
        }  
        else{
            this.topScore= JSON.parse(localStorage.getItem("topScoreSpace"))
        }
    }

    saveScore(){
      
    
     let obj={name: this.game.name,  score: this.game.score}

       let minValue = Math.min(...this.topScore.map(item => item.score));
       
       // Check if the object's value is greater than the minimum value
       if (obj.score > minValue) {
         // Find the index of the minimum value
         let minIndex = this.topScore.findIndex(item => item.score === minValue);
     
         // Replace the minimum value with the new object
         this.topScore.splice(minIndex, 1, obj);
       }
   
       
   



       localStorage.setItem('topScoreSpace', JSON.stringify( this.topScore))
   
    }

    loadScore(){
        this.topScore= JSON.parse(localStorage.getItem("topScoreSpace"))
        this.topScore.sort((a, b)=>a.score-b.score ).reverse()
        let count=0
        this.topScore.forEach(place=>{
            count++ 
            if(count<=10){
                this.game.listScore.innerHTML+='<div><p>'+place.name+'</p>'+' <span> '+place.score+'</span></div>' 
            }
         
      })
    }
}