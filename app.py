from flask import Flask, render_template, request, jsonify

from configmodule import Config
from call_api import get_currencies
from utils import convert_date_to_htmlinput

app = Flask(__name__)
app.config.from_object(Config)


@app.route('/', methods=['GET', 'POST'])
def home():
    data = get_currencies()
    max_date = convert_date_to_htmlinput(data[0]['exchangedate'])
    return render_template('main.html', data=data, max_date=max_date)


@app.route('/exchange', methods=['POST'])
def exchange():
    data = get_currencies(request.json)
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, use_reloader=True, port=8080)
