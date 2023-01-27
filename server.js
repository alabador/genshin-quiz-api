const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(express.static('views'));
app.use(bodyParser.json())

let connectionString = process.env.DB_LOGIN
let db, skillCollection;


MongoClient.connect(connectionString, {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database...');
        db = client.db('genshin-trivia');
        skillCollection = db.collection('chars');
    }) 
    .catch(error => console.error(error));

app.get('/', (req, res) => {
    db.collection('chars').find().toArray()
        .then(results => {
            res.render('index.ejs', {skills: results})
        })
        .catch(error => console.error(error))
});

app.post('/skills', (req, res) => {
    console.log('Helloooooo')
    skillCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/skills', (req, res) => {
    skillCollection.findOneAndUpdate(
        {character: {
            $ne: 'Kamisato Ayaka'
        }}, //query
        {
            $set: {
                character: req.body.character
            }
        }, //update,
        {
            upsert: true
        }//options
    )
    .then(result => {
        res.json('Success')
    })
    .catch(error => console.error(error))
})

app.delete('/skills', (req, res) => {
    skillCollection.deleteOne(
        {character: req.body.character}
    )
    .then(result => {
        if(result.deletedCount === 0){
            return res.json('Kamisato Ayaka is not present.')
        }
        res.json('Deleted Kamisato Ayaka from character list')
    })
    .catch(error => console.error(error))
})

app.listen(3000, function() {
    console.log('listening on 3000');
})