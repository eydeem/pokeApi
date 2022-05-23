from flask import Flask, request
import requests
from http import HTTPStatus

app = Flask(__name__)

POKE_COMPARATOR_APP_URL = 'http://127.0.0.1:8000/'
PORT = 3000


@app.route('/comparison', methods=['POST'])
def compare():
    data = request.get_json()

    if (len(data) == 2) and all(data) and all(isinstance(name, str) for name in data):
        data = [param.lower() for param in data]
        res = requests.post(POKE_COMPARATOR_APP_URL, json=data)

        return res.json(), res.status_code
    else:
        return {'errorMessage': 'Wrong request parameters'}, HTTPStatus.UNPROCESSABLE_ENTITY


if __name__ == '__main__':
    app.run(debug=True, port=PORT)
