import fs from 'fs';

export function compare(pokemon1, pokemon2) {
    const result = {};
    result['comparision'] = [];
    let pointsPokemon1 = 0;
    let pointsPokemon2 = 0;
    for (let i = 0; i <= 5; i++) {
        if (pokemon1['stats'][i]['base_stat'] > pokemon2['stats'][i]['base_stat']) {

            result['comparision'].push({ "name": pokemon1['stats'][i]['stat']['name'], "winner": pokemon1['name'] });
            pointsPokemon1 += 1;

        } else if (pokemon1['stats'][i]['base_stat'] < pokemon2['stats'][i]['base_stat']) {

            result['comparision'].push({ "name": pokemon1['stats'][i]['stat']['name'], "winner": pokemon2['name'] });
            pointsPokemon2 += 1;

        } else {

            result['comparision'].push({ "name": pokemon1['stats'][i]['stat']['name'], "winner": "tie" });

        }

    }

    if (pointsPokemon1 > pointsPokemon2) {

        result['winner'] = pokemon1['name'];

    } else if (pointsPokemon1 < pointsPokemon2) {

        result['winner'] = pokemon2['name'];

    } else {
        result['winner'] = "tie";
    }


    const cache_data = {};
    cache_data['keys'] = {firstPokemon : pokemon1['name'], secondPokemon : pokemon2['name']};
    cache_data['result'] = result;

    const configFile = fs.readFileSync('cache.json');
    const config = JSON.parse(configFile);

    config.push(cache_data);
    const configJSON = JSON.stringify(config);
    fs.writeFileSync('cache.json', configJSON);

    return result;
}

