// const jsfs = require("jsonfile")
// const path = require("path")

// class config{
//     constructor(){
//         this.reload();
//     }

//     reload(){
//         console.log(__dirname);
//         console.log(path.join(__dirname,"settings.json"));
//         let obj = jsfs.readFileSync(path.join(__dirname,"settings.json"));
//         this.server = obj.server;
        
//         // reset default 
//         this.default = {
//             server: this.server
//         }
//     }

//     set_server(server_obj){
//         this.server = server_obj;
//     }

//     reset(){
//         this.server = this.default.server;
//     }
// }

// const conf = new config();
// module.exports = conf
