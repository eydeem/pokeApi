import fs from 'fs';

export function readCache(pokemon1, pokemon2) {
    const configFile = fs.readFileSync('cache.json');
    const config = JSON.parse(configFile);
    for (let char of config) {
        if ((char['keys']['firstPokemon'].includes(pokemon1) && char['keys']['secondPokemon'].includes(pokemon2)) ||
            (char['keys']['firstPokemon'].includes(pokemon2) && char['keys']['secondPokemon'].includes(pokemon1))) {

            return char.result;
        }
    }

}