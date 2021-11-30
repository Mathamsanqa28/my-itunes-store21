const express = require('express');
// const helmet = require('helmet');
const path = require('path');
const http = require('http');
const { response } = require('express');

require('isomorphic-fetch');

//initialize express with app variable
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(helmet());

// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//             "script-src": ["'none'"],
//         },
//     })
// );

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*',(req,res) => 
    {res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}

//check if the server is online
app.get('/', (req, res) => {
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

// //server listener
const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

http.createServer(function(req,res){
    response.writeFileSyncy(200, {"Content-Type": "application/json"})
}).listen(process.env.PORT);