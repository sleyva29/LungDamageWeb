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
    let valid_cvf = document.getElementById("cvf").checkValidity();
    let valid_age = document.getElementById("age").checkValidity();
    let cvf = document.getElementById("cvf").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let smoke = document.getElementById("smoke").value;
    let url = "/predict";

    if (!valid_cvf || !valid_age || gender == 0 || smoke == 0){
        alert("Por lo menos un campo no es válido, por favor verifique los datos ingresados.");
        return;
    }

    gender = gender - 1;
    smoke = smoke - 1;

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
