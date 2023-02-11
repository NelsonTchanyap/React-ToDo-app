const  express = require('express'); 
const dotenv = require('dotenv'); 
var favicon = require('serve-favicon');
const path = require('path');

dotenv.config();


server = new express();

server.use(express.json()); 
server.use(express.static('./public'));
server.use(favicon(path.join( __dirname  ,'public', 'favicon.ico' )));



server.get('/',(req,res)=>{
res.status(200).json({message:'dzdzdzdzdzdzdz'})
}); 

server.listen(process.env.PORT, ()=>{ console.log(`Server is running on ${process.env.PORT}`)})