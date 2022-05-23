import fs from 'fs';

CACHE_FILE_NAME = 'cache.json';

export function readCache(pokemon1, pokemon2) {
    const cacheFile = fs.readFileSync(CACHE_FILE_NAME);
    const cacheData = JSON.parse(cacheFile);

    for (const record of cacheData) {
        if ((record['keys']['firstPokemon'].includes(pokemon1) && record['keys']['secondPokemon'].includes(pokemon2)) ||
            (record['keys']['firstPokemon'].includes(pokemon2) && record['keys']['secondPokemon'].includes(pokemon1))) {

            return record.result;
        }
    }

}