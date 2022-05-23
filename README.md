# PokeApi

PokeApi is a project for comparing two pokemons with each other using the follolwing API - https://pokeapi.co/.

## Installation

Run in project directory:
```bash
pip install -r requirements.txt
```

Run in poke-comparator directory:

```bash
npm install 
```

## Usage

To start Flask server run the following command:
```bash
python gateway/main.py
```

To start node.js server run in poke-comparator directory:
```bash
npm start
```

Sample HTTP POST request for Bulbasaur and Ditto pokemons (body request parameters are case-insensitive):
```bash
curl -H "Content-Type: application/json" --data '["bulbasaur", "ditto"]' http://localhost:3000/comparison
```

## Ports

Comparator app runs on port 8000 and gateway app runs on port 3000.