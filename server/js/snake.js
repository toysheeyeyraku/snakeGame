export class Snake {
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
}