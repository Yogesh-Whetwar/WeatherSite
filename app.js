const express=require("express"); 
const https=require("https");
const app=express(); 
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){     
    res.sendFile(__dirname+"/index.html");
    })
app.post("/",function(req,res){
    
    //res.send("Serveris up and running"); 
    //we can not use two response in one time
const query=req.body.cityname;
    const apikey="facd97dd341b7d7961f8c3c6f6f352ac";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit+""
  https.get(url,function(response){
    console.log(response.statusCode); 
    response.on("data",function(data){
        const weatherData=JSON.parse(data) 
        // console.log(weatherdata);
        // const object={
        //     name:"yogi",
        //     fav:"chai"
        // } 
        // console.log(JSON.stringify(object));
        const temp=weatherData.main.temp
        console.log(temp); 
        // const weatherdesc=JSON.parse(data)
        // const desc=weatherdesc.weather[0].description
        const desc=weatherData.weather[0].description
        console.log(desc);  
        //we can use res.write as many times as we want
        res.write("<p>The weather here currently is: "+desc+"</p>")
        res.write("<h1>The temperature in "+query+" is " + temp + " degree Celcius</h1>"); 
        const icon=weatherData.weather[0].icon
        const imgurl="http://openweathermap.org/img/wn/" +   icon+ "@2x.png " 
        res.write("<img src="+imgurl+">");
        res.send();
    })
})
})



app.listen(7000,function(){
    console.log("server is running at 7000");
})