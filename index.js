import fetch from 'node-fetch';
import express from 'express';
import { compare } from './comparator.js';
import { readCache } from './readCache.js';

const port = 8000;
const app = express();

app.use(express.json());



app.post('/', async function (req, res) {


    var cacheResult = readCache(req.body[0], req.body[1])

    if (cacheResult) {
        console.log('Loaded from the cache.');
        res.send(cacheResult);
    }
    else {
        const result = [];
        for (let pokemon in req.body) {
            const url = "https://pokeapi.co/api/v2/pokemon/" + req.body[pokemon];
            const response = await fetch(url)
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })

            if (!response) {
                res.status(404).json({ "errorMessage": `Pokemon ${req.body[pokemon]} not found` });
                return;
            }
            result.push(response);
        }

        const compareResult = compare(result[0], result[1]);
        res.json(compareResult);
    }

});




app.listen(port, function () {

    console.log('server is running on port 8000');
})