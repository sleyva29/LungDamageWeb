import pandas as pd
from pycaret.classification import load_model
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def hello_cio():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    cvf = request.json.get("cvf", None)
    edad = request.json.get("age", None)
    sexo = request.json.get("gender", None)
    ef = request.json.get("smoke", None)
    # TODO Validar los datos que llegan

    model = load_model("final_rf_poster_cio")
    data = pd.DataFrame([[int(cvf), int(edad), int(sexo), int(ef)]], 
                        columns=["CVF", "Edad", "Sexo", "Estado del fumador"])
    result = model.predict(data)[0]

    return {"prediction": int(result)}, 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
