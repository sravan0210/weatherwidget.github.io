const express = require("express");
const https = require("https");
const { connected } = require("process");
const bodyParser = require("body-parser");


const app = express();

   app.use(bodyParser.urlencoded({extended: true}));


   app.get("/", function(req , res ){

    res.sendFile(__dirname + "/index.html")
   });
              
           
    
       app.post("/" , function(req,res){

        const query = req.body.CityName;
        


        const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=e615719bd281437716835afea31774fa&units=metric#"

        https.get(url , function(response){
            console.log(response.statusCode);
            response.on("data", function(data){
               const weatherData = JSON.parse(data);
               const Temp = weatherData.main.temp; 
               const Description = weatherData.weather[0].description ;
               const icon = weatherData.weather[0].icon
    
               const imageURL = "http://openweathermap.org/img/wn/" + icon    + "@2x.png";
    
    
    
               res.write("<p>the weather is currently " + Description + "</p>");
               res.write("<h1>The temperature in "+ query + " is " +  Temp  + "degrees celcius.</h1>");
               
               res.write("<img src = " + imageURL + ">");
    
            });
        });
    });    



       













app.listen(3000, function(){
    console.log("server is running on port 3000.");
})