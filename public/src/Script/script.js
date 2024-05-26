let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = "6d51cd4aa4deb04d9eaa166f1616a848"
let difKelvin = 273.15




////////////////////////// FUNCIONES DE CARGA DE  PAISES JSON PARA CONTACTO //////////////////////////

function traer() {
    //fetch("https://gist.githubusercontent.com/ratrabbit/e39778d3de34286e8dd36fe80c05e237/raw/187ebd1d7052af70bdcbb47cc5224f3f40084bac/countries.json")
    fetch("src/Script/paises.json")
        .then(res => res.json())
        .then(datos => {
            tabla(datos)
        })
}
traer();

function tabla(datos) {
    var mainMenu = "<select id='country' name= 'country'>";
    //var mainMenu = "<select>";
    //<select id="country" name="country">
    mainMenu += "<option value='"+"'>- Selecciona un pais -</option>";
    for(let valor of datos.paises){
        mainMenu += "<option value='" + valor.codigo + "'>" + valor.nombre + "</option>";                
    }
    mainMenu += "</select>";
    document.getElementById("mainMenu").innerHTML = mainMenu;
}
////////////////////////// FUNCIONES DE CARGA DE  PAISES JSON PARA CONTACTO //////////////////////////

///////////////////////// FUNCIONES VALIDACION FORMULARIO CONTACTO //////////////////////////
function validacionformcontacto() {
    form_name = document.getElementById("fname").value;
    form_apellido = document.getElementById("lname").value;
    form_pais = document.getElementById("country").selectedIndex;
    form_email = document.getElementById("email").value;
    form_coment = document.getElementById("comentario").value;


    /*indice = document.getElementById("country").selectedIndex;
    valor_email = document.getElementById("email").value;*/

    if (form_name == null || form_name.length == 0) {
        document.getElementById('mensajename').innerHTML = ": Completa el nombre!.";
        elemento = document.getElementById('fname');
        elemento.focus();

        return false;
    }
    if (form_apellido == null || form_apellido.length == 0) {
        document.getElementById('mensajeapell').innerHTML = ": Completa el apellido!.";
        elemento = document.getElementById('lname');
        elemento.focus();

        return false;
    }
    if (form_pais == null || form_pais == 0) {
        document.getElementById('mensajeubi').innerHTML = ": Selecciona un pais!";
        elemento = document.getElementById('country');
        elemento.focus();
        return false;
    }
    if (!(/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|ar)+$/.test(form_email))) {
        document.getElementById('mensajeemail').innerHTML = ": No es una direccion de email correcta";
        elemento = document.getElementById('email');
        elemento.value = '';
        elemento.focus();

        return false;
    }
    if (form_coment == null || form_coment.length == 0) {
        document.getElementById('mensajecomen').innerHTML = ": Deje un comentario!.";
        elemento = document.getElementById('comentario');
        elemento.focus();

        return false;
    } else {
        /*document.getElementById('msjenviado').innerHTML = "MENSAJE ENVIADO";*/
        alert("SE ENVIO CORRECTAMENTE");
        return true;
    }
}
///////////////////////// FUNCIONES VALIDACION FORMULARIO CONTACTO //////////////////////////




document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if(ciudad){
        fetchDatosClima(ciudad)
    }
})

function fetchDatosClima(ciudad){
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then(data => data.json())
    .then(data => mostrarDatosClima(data))
}

function mostrarDatosClima(data){
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML=''

    const ciudadNombre = data.name
    const paisNombre = data.sys.country
    const temperatura = data.main.temp
    const humedad = data.main.humidity
    const descripcion = data.weather[0].description
    const icono = data.weather[0].icon

    const ciudadTitulo = document.createElement('h2')
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`

    const temperaturaInfo = document.createElement('p')
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura-difKelvin)}ºC`
    
    const humedadInfo = document.createElement('p')
    humedadInfo.textContent = `La humedad es: ${humedad}%`

    const iconoInfo = document.createElement('img')
    iconoInfo.src= `https://openweathermap.org/img/wn/${icono}@2x.png`

    const descripcionInfo = document.createElement('p')
    descripcionInfo.textContent = `La descripción meteorológica es: ${descripcion}`

    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(humedadInfo)
    divDatosClima.appendChild(iconoInfo)
    divDatosClima.appendChild(descripcionInfo)
}


