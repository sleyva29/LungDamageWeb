from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)


@app.route("/")
def hello_cio():
    prediction = request.args.get("prediction", 3)
    return render_template("index.html", prediction=int(prediction))


@app.route("/predict")
def predict():
    import pandas as pd
    import numpy as np
    from pycaret.classification import load_model

    cvf = request.args.get("cvf", 320)
    edad = request.args.get("edad", 26)
    sexo = request.args.get("sexo", 1)
    ef = request.args.get("ef", 2)

    model = load_model("final_rf_poster_cio")
    data = pd.DataFrame(np.array([[int(cvf), np.nan, int(edad), int(sexo), int(ef), 5]]), 
                        columns=["CVF", "Porcentaje", "Edad", "Sexo", "Estado del fumador", "Semanas"])
    result = model.predict(data)[0]

    return redirect(url_for("hello_cio", prediction=result))



if __name__ == "__main__":
    app.run(debug=True)
