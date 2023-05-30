async function getData(url, data) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

function displayLoading() {
    let loader = document.querySelector("#loading");
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

function hideLoading() {
    let loader = document.querySelector("#loading");
    loader.classList.remove("display");
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
        Swal.fire({
            icon: "error",
            title: 'Datos inválidos',
            text: "Al menos un campo contiene datos inválidos. Por favor, verifique los datos ingresados.",
          });
        return;
    }
    
    displayLoading()

    gender = gender - 1;
    smoke = smoke - 1;

    getData(url, {cvf: cvf, age: age, gender: gender, smoke: smoke})
        .then(response => response.json()
            .then(json => {
                hideLoading()
                if (json["prediction"] == 0){
                    document.getElementById("result").value = "No daño pulmonar";
                } else {
                    document.getElementById("result").value = "Daño pulmonar";
                }
                
            }))
}
