const express = require('express')
const path = require('path')
const fs = require('fs')
const twit = require('twit')
const config = require('./config.js')
const {
    PORT,
    CONSUMER_KEY,
    CONSUMER_SECRET,
    ACCESS_TOKEN,
    ACCESS_TOKEN_SECRET
} = require("./config");

const Twitter = new twit({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_TOKEN_SECRET
});

/* parametres de recherche twitter */
var params = {
    q: '#quebec',
    result_type: 'recent',
    lang: 'en'
}

/* appele d'API de Twitter et sauvegarde le resultat dans tweet.json*/
Twitter.get('search/tweets', params, function(err, data){
   var newData = JSON.stringify(data);
   fs.writeFile('tweet.json', newData, err => {
    if(err) throw err;
    console.log("Success");
   })
})

/* demmarage du serveur express */
const app = express();

app.use('/static', express.static(path.resolve(__dirname, "frontend", "static")))


/* api get /api/twitter qui retourne tous les tweets du fichier tweet.json */
app.get('/api/twitter', function (req, res){
    fs.readFile( __dirname + "/" + "tweet.json", 'utf8', function (err, data) {
        res.end( data );
     })
})

/* api get /api/twitter/:id qui retourne le tweet par son id dans fichier tweet.json */
app.get('/api/twitter/:id', function (req, res){
    fs.readFile( __dirname + "/" + "tweet.json", 'utf8', function (err, data) {
        const tweets = JSON.parse(data)["statuses"];
        const id = Number(req.params.id);
        const tweet = tweets.find(item => item.id === id);
        res.end( JSON.stringify(tweet) );
    })
}) 


/* par default tous les paths vont a index.html */
app.get('/*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html')
    )
})

/* Le serveur ecoute sur le port 8080 */
app.listen(PORT || 8081, () => console.log('App running...'))