async function getData(url, data) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

function predict(){
    let cvf = document.getElementById("cvf").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let smoke = document.getElementById("smoke").value;
    let url = "/predict";
    // TODO Validar rangos de datos

    getData(url, {cvf: cvf, age: age, gender: gender, smoke: smoke})
        .then(response => response.json()
            .then(json => {
                if (json["prediction"] == 0){
                    document.getElementById("result").value = "No daño pulmonar";
                } else {
                    document.getElementById("result").value = "Daño pulmonar";
                }
                
            }))
}
