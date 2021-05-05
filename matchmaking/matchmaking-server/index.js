class Application{
    
    activeServers = [];
    constructor() {
        this.express = require('express')
        this.app = this.express();
        var cors = require('cors')
        this.app.use(cors());
        this.app.get('/', (req, res) => {
            res.send(JSON.stringify(this.activeServers))
        })
       
        this.app.use(this.express.json());       // to support JSON-encoded bodies
        this.app.use(this.express.urlencoded()); // to support URL-encoded bodies 
        this.app.post('/addServer', (req, res) =>{
            this.activeServers.push(req.body);
            
        })
        
        this.app.listen(8011, () => {
            console.log("Started")
        })
    }

}

let app = new Application();
