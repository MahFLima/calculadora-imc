const fields = document.querySelectorAll("[required]");
const peso = document.querySelector("#peso")
const altura = document.querySelector("#altura")
const total = document.querySelector("#total")
const resume = document.querySelector(".resume")

//verifica se o campo está vazio
function customValidity(event){
  const field = event.target

  //logica para verificar se existem erros
  function verifyErrors(){
    let foundError = false
    
    for(let error in field.validity){
      //se não for customError
      //então verifica se tem erro
      if(error != "customError" && field.validity[error]){
        foundError = error
      }
    }
    
    return foundError
  }

  const error = verifyErrors()
  console.log(error)

  //trocar mensagem de required
  if(error){
    field.setCustomValidity("Esse campo e obrigatório")
  }else{
    field.setCustomValidity("")
  }
}

for(field of fields){
  field.addEventListener("invalid", customValidity)
}

function verifyIMC(imc) {
  if (imc < 17) {
    resume.innerText = "Muito abaixo do peso"
    resume.style.color = "#ed293b"
  } else if (imc > 17 && imc <= 18.49){
    resume.innerText = "Abaixo do peso"
    resume.style.color = "#ffaa1c"
  } else if (imc >= 18.5 && imc <= 24.99){
    resume.innerText = "Peso normal"
    resume.style.color = "#7abd7e"
  } else if (imc >= 25 && imc <= 29.99){
    resume.innerText = "Acima do peso"
    resume.style.color = "#ffaa1c"
  } else if (imc >= 30 && imc <= 34.99){
    resume.innerText = "Obesidade I"
    resume.style.color = "#ed293b"
  } else {
    resume.innerText = "Obesidade II"
    resume.style.color = "#ed293b"
  }
}

document.querySelector("form").addEventListener(
  "submit", (e) => {
    e.preventDefault();
    const p = parseFloat(peso.value)
    const a = parseFloat(altura.value) / 100

    if(p <= 0 || a <= 0){
      resume.innerText = "Error"
      resume.style.color = "#ed293b"
    } else {
      const result = (p/(a*a)).toFixed(2)
      total.value = result.toString()
      verifyIMC(result)
    }
  }
)