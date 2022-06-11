

//OBTENER LOS ULTIMOS 10 REGISTROS
const algunosRegistros=()=>{

    fetch('http://localhost:5000/registros/algunos',{
        method:'GET'
    })
    .then((res)=>res.json())
    .then((result)=>{
       
     
        vistaAlgunosRegistros(result)
        
    })
    .catch((error)=>{
        console.log(error)
    })
}


algunosRegistros();

//EDITAR LOS ULTIMOS 10 REGISTROS
const vistaAlgunosRegistros=(result)=>{
      document.querySelector("#root").innerHTML=""
     result.forEach(r => {
        document.querySelector("#root").innerHTML+=`
        <div class="item-registro">
        <p class="campo-concepto">${r.id} ${r.concepto}</p>
        <p class="campo-tipo">${r.tipo}</p>
        <p class="campo-monto">${r.monto}</p>
        </div>
        `
    });
    
}




//INSERTAR UN NUEVO REGISTRO
const form = document.querySelector("form")

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
  var  concepto = document.querySelector('[name=concepto]').value 
  var  monto = document.querySelector('[name=monto]').value 
  var  fecha = document.querySelector('[name=fecha]').value 
  var  tipo = document.querySelector('[name=tipo]').value 
    if (concepto !== "" && monto !== "" && fecha !== "" && tipo !== "") {
        const data = new FormData(ev.currentTarget)
        console.log(data)
     
        fetch('http://localhost:5000/registros/insert', {
            method: 'POST',
            body: data
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                vistaAlgunosRegistros(result)
                totalEgresos=0;
                totalIngresos=0;
                saldoTotal=0;
                 obtenerIngresos()
            })
            .then(()=>{
                document.querySelector('[name=concepto]').value = "";
                document.querySelector('[name=monto]').value = "";
                document.querySelector('[name=fecha]').value = "";
                document.querySelector('[name=tipo]').value = "";
            })
            .then(()=>{
                alert("Enviado correctamente")
            })

            .catch((error) => {
                console.log(error);
            })
    } else if (concepto === "" || monto === "" || fecha === "" || tipo === "") {
        alert("Falta completar uno o mas campos")
    }
})


/////////////////////////////////////////////////////////////

/// CUENTAS ///

const obtenerIngresos=()=>{
    fetch('http://localhost:5000/registros/todos',{
        method:'GET'
    })
    .then((res)=>res.json())
    .then((result)=>{
            sumarIngresos(result)
            sumarEgresos(result)
            saldo(totalIngresos,totalEgresos)
    })
    .catch((error)=>{
        console.log(error);
    })

}
obtenerIngresos()





//SUMA INGRESOS

var totalIngresos=0;
const sumarIngresos=(result)=>{

    for(let i=0;i<result.length;i++){

        if(result[i].tipo==='ingreso'){
             totalIngresos=totalIngresos+result[i].monto
              //console.log(result[i].monto)
        }
        //console.log(totalIngresos)
    }
     
      document.querySelector("#total-ingresos").innerHTML=`<label style="font-weight:bold">Ingresos:</label><p style="color:green;font-weight:bold;"> ${totalIngresos}</p>`
}






//SUMA EGRESOS

var totalEgresos=0;
const sumarEgresos=(result)=>{

    for(let i=0;i<result.length;i++){

        if(result[i].tipo==='egreso'){
             totalEgresos=totalEgresos+result[i].monto
              console.log(result[i].monto)
        }
        //console.log(totalEgresos)
    }
     
      document.querySelector("#total-egresos").innerHTML=`<label style="font-weight:bold">Egresos:</label><p style="color:crimson;font-weight:bold;"> ${totalEgresos}</p>`
}






//CALCULO DE SALDO

var saldoTotal;
const saldo = (totalIngresos, totalEgresos) => {
    

    saldoTotal = totalIngresos - totalEgresos;
    document.querySelector("#saldo").innerHTML = `<label style="display:inline-block;font-weight:bold">Saldo: </label><p id="saldo-total" style="color:blue;font-weight:bold;display:inline-block"> ${saldoTotal}</p>`
    if (saldoTotal > 69000) {

        document.querySelector("#saldo-total").classList.remove("naranja")
        document.querySelector("#saldo-total").classList.remove("rojo")

    } else if ( saldoTotal < 50000) {

        document.querySelector("#saldo-total").classList.remove("naramja")
        document.querySelector("#saldo-total").classList.add("rojo")

    }else if (saldoTotal > 49000 && saldoTotal < 70000) {

        document.querySelector("#saldo-total").classList.remove("rojo")
        document.querySelector("#saldo-total").classList.add("naranja")
    }
}