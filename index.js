import fetch from 'node-fetch'
// import http from 'http'
import express from 'express'
import bodyParser from "body-parser"
import fs from 'fs'

const port = 8000
const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


function compare(pokemon1, pokemon2) {
    var dict = {}
    dict['comparision'] = []
    var pointsPokemon1 = 0;
    var pointsPokemon2 = 0;
    for (let i = 0; i <= 5; i++) {
        if (pokemon1['stats'][i]['base_stat'] > pokemon2['stats'][i]['base_stat']) {

            dict['comparision'].push({ "name": pokemon1['stats'][i]['stat']['name'], "winner": pokemon1['name'] });
            pointsPokemon1 += 1;

        } else if (pokemon1['stats'][i]['base_stat'] < pokemon2['stats'][i]['base_stat']) {

            dict['comparision'].push({ "name": pokemon1['stats'][i]['stat']['name'], "winner": pokemon2['name'] });
            pointsPokemon2 += 1;

        } else {

            dict['comparision'].push({ "name": pokemon1['stats'][i]['stat']['name'], "winner": "tie" });

        }

    }

    if (pointsPokemon1 > pointsPokemon2) {

        dict['winner'] = pokemon1['name'];

    } else if (pointsPokemon1 < pointsPokemon2) {

        dict['winner'] = pokemon2['name'];

    } else {
        dict['winner'] = "tie";
    }


    var cache_data = {}
    cache_data['keys'] = {firstPokemon : pokemon1['name'], secondPokemon : pokemon2['name']}
    cache_data['result'] = dict

    var configFile = fs.readFileSync('cache.json');
    var config = JSON.parse(configFile);
    //console.log(config);
    //console.log(cache_data);
    config.push(cache_data);
    var configJSON = JSON.stringify(config);
    fs.writeFileSync('cache.json', configJSON);

    return dict
}


app.post('/comp', async function (req, res) {
    /*
    const options = {
        "method" : "POST",
        "body" : req.body

    };    */

    var configFile = fs.readFileSync('cache.json');
    var config = JSON.parse(configFile);
    var a = 0
    for (let char of config){
        if((char['keys']['firstPokemon'].includes(req.body[0]) && char['keys']['secondPokemon'].includes(req.body[1])) || 
            (char['keys']['firstPokemon'].includes(req.body[1])  && char['keys']['secondPokemon'].includes(req.body[0]))){

            console.log('Loaded from the cache.');
            a = 1;

            res.json(char.result)
            break;
        } 
    }

    if (a == 0){
        const url1 = "https://pokeapi.co/api/v2/pokemon/" + req.body[0];
        const url2 = "https://pokeapi.co/api/v2/pokemon/" + req.body[1];

        const response1 = await fetch(url1)
        .then(res => res.json())

        const response2 = await fetch(url2)
        .then(res => res.json())

        const dict = compare(response1, response2)
        res.json(dict)
    }

});

/*
app.get("/fetch_poke", async function (req, res) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    const options = {
        "method": "GET",
    };

    const response = await fetch(url, options)
        .then(res => res.json())


    console.log('RESPONSE: ', response)
    res.json(response.name)
});
*/


app.listen(port, function () {

    console.log('server is running on port 8000')
})