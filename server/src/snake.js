 class Snake {

    constructor(){
        this.color = this.getRandomColor();
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

    isSelfCollide(){
        let count =0;
        this.body.forEach(element =>{
            
            if (element.x == x && element.y == y){
                
                count++;
                
            }
        })
        return count > 1;
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

module.exports = {Snake}