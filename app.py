from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)


@app.route("/")
def hello_cio():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    import pandas as pd
    import numpy as np
    from pycaret.classification import load_model

    cvf = request.json.get("cvf", None)
    edad = request.json.get("age", None)
    sexo = request.json.get("gender", None)
    ef = request.json.get("smoke", None)
    # TODO Validar los datos que llegan

    model = load_model("final_rf_poster_cio")
    data = pd.DataFrame(np.array([[int(cvf), np.nan, int(edad), int(sexo), int(ef), 5]]), 
                        columns=["CVF", "Porcentaje", "Edad", "Sexo", "Estado del fumador", "Semanas"])
    result = model.predict(data)[0]

    return {"prediction": int(result)}, 200



if __name__ == "__main__":
    app.run(debug=True)
