const express = require('express');
const helmet = require('helmet'); //create headers that protect the attacks (security)
const bodyParser = require('body-parser');
const path = require("path");

require('isomorphic-fetch');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());

//check if the server is online
app.get('/search', (req, res) => {
    res.send("Server online");
})

//post request pass data front client side to server side
app.post('/search',(req, res) => {
    let newSearch = req.body.search;
    let option = req.body.option;
    
    let term = newSearch.split(" ").join("+");
    let url = `https://itunes.apple.com/search?term=${term}&media=${option}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    });
});

if (process.env.NODE_ENV === 'production') {
    //Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    //handle react routing, return all request to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

//server listener
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});