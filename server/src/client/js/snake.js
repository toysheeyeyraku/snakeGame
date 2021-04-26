export class Snake {
    constructor(){
        this.color = getRandomColor();
        console.log(this.color)
    }
    direction = {
        x: 1,
        y: 0
    }
    body = [{
        x: 5,
        y: 5
    }];
    
    isIn(x, y){
        let val =false;
        this.body.forEach(element =>{
            
            if (element.x == x && element.y == y){
                
                val = true;
                return;
            }
        })
        return val;
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
}