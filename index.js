 const express = require('express');

 const https = require("https");
 const bodyParser = require("body-parser")

 const app = express();
 app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function (req,res) {
  res.sendFile(__dirname+"/index.html")
})

app.post("/", function(req,res){



  const query = req.body.cityName;
  const apikey = "d15e4f2ae60d67eae03d3b341b20b3f1"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" + apikey + "&units=metric"

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function(data){
       const mydata = JSON.parse(data)
      console.log(JSON.parse(data));

      const temp = mydata.main.temp

      const description = mydata.weather[0].description
      const icon = mydata.weather[0].icon

      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"


      res.write("<p>The weather is " + description+ "</p>")
      res.write("<h1>The temp in "+query+" is "+temp+ " degerees celsius</h1>")
      res.write("<img src="+imageURL +">")

      res.send()

    })
  })
})




 app.listen(3000, function () {
   console.log("server running on port 3000");
 })
