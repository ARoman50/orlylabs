from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/web-dev')
def web_dev():
    return render_template('web-development.html')

@app.route('/it-net')
def it_net():
    return render_template('it-networking.html')

@app.route('/design')
def design():
    return render_template('creative-desing.html')

@app.route('/ecom-ai')
def ecom_ai():
    return render_template('ecommerce-ai.html')

if __name__ == "__main__":
    app.run(debug=True)

