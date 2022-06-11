const obtenerRegistros = () => {

    fetch('http://localhost:5000/registros/todos', {
        method: 'GET'
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result)
            editarRegistros(result)
        })
        .catch((error) => {
            console.log(error)
        })

}
obtenerRegistros();

//EDITAR VISTA DE TODOS LOS REGISTROS OBTENIDOS
const editarRegistros = (result) => {
    document.querySelector("#tipo").innerHTML = `<span>Registros</span>`
    document.querySelector("#root").innerHTML = ""
    result.forEach(r => {
        fecha = r.fecha
        document.querySelector("#root").innerHTML += `
        <div class="item-edicion">
        <p class="p-id">${r.id}</p>
        <p class="p-concepto">${r.concepto}</p>
        <p>${r.monto}</p>
        <p class="p-fecha">${fecha.substring(0, 10)}</p>
        <p class="p-tipo">${r.tipo}</p>
        <button id=${r.id} onclick="obtenerItem(id)" class="btn-registros">Editar</button>
        </div>
        `
    });

}






//EDITAR SOLO LOS INGRESOS
const ingresos = () => {
    document.querySelector("#tipo").innerHTML = `<span>Ingresos</span>`
    fetch('http://localhost:5000/registros/todos', {
        method: 'GET'
    })

        .then((res) => res.json())
        .then((result) => {
            vistaIngresos(result)
        })


}
//VISTA INGRESOS
const vistaIngresos = (result) => {
    document.querySelector("#root").innerHTML = ""
    result.forEach(r => {
        fecha = r.fecha

        if (r.tipo === 'ingreso') {

            document.querySelector("#root").innerHTML += `
<div class="ingresos" >
<p class="p-id" style="color:black">${r.id}</p>
<p class="p-concepto" style="color:black">${r.concepto}</p>
<p style="color:black">${r.monto}</p>
<p class="p-fecha" style="color:black">${fecha.substring(0, 10)}</p>
<p class="p-tipo" style="color:darkgreen;text-shadow:1px 1px 1px black">${r.tipo}</p>
<button id=${r.id} onclick="obtenerItem(id)" class="btn-registros">Editar</button>
</div>
`
        }
    })
}










//EDITAR SOLO LOS EGRESOS
const egresos = () => {

    document.querySelector("#tipo").innerHTML = `<span>Egresos</span>`
    fetch('http://localhost:5000/registros/todos', {
        method: 'GET'
    })

        .then((res) => res.json())
        .then((result) => {
            vistaEgresos(result)
        })


}
//VISTA  EGRESOS
const vistaEgresos = (result) => {
    document.querySelector("#root").innerHTML = ""
    result.forEach(r => {
        fecha = r.fecha

        if (r.tipo === 'egreso') {

            document.querySelector("#root").innerHTML += `
<div class="egresos">
<p class="p-id" style="color:black">${r.id}</p>
<p class="p-concepto" style="color:black">${r.concepto}</p>
<p style="color:black">${r.monto}</p>
<p class="p-fecha" style="color:black">${fecha.substring(0, 10)}</p>
<p class="p-tipo" style="color:red;text-shadow:1px 1px 1px black">${r.tipo}</p>
<button id=${r.id} onclick="obtenerItem(id)" class="btn-registros">Editar</button>
</div>
`
        }
    })
}











//OBTENER UN ITEM

const obtenerItem = (id) => {
    console.log(id)

    fetch(`http://localhost:5000/registro/editar/${id}`, {
        method: 'GET'
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result)
            editarItem(result)
        })
        .catch((error) => {
            console.log(error)
        })
}

//EDITAR UN ITEM
const editarItem = (result) => {
    fecha = result[0].fecha
    document.querySelector("#root").innerHTML = `
    <div class="egresos" style="background:orange !important">
    <p class="p-id" style="color:black">${result[0].id}</p>
    <p class="p-concepto" style="color:black">${result[0].concepto}</p>
    <input class="editado" id="importe" style="color:black;text-align:center; font-weight:bold;width:65px;margin-left:10px" placeholder=${result[0].monto}></input>
    <p class="p-fecha" style="color:black">${fecha.substring(0, 10)}</p>
    <p class="p-tipo" style="color:red;text-shadow:1px 1px 1px black">${result[0].tipo}</p>
    <button class="btn-edit-modif"  id=${result[0].id} onclick="modificarItem(id)" >Modificar</button><button id=${result[0].id} class="btn-delete" onclick="eliminar(id)">Eliminar</button>
    </div>
    `
    document.querySelector("body").classList.add("body-oscuro")


}






//MODIFICAR UN ITEM
const modificarItem = (id) => {
    var continuar = confirm("Deseas modificar este Item?")
    if (continuar) {
        monto = document.querySelector("#importe").value
        console.log(monto.length)
        if (monto !== "" && monto !== '0' && monto.length !== 0 && monto.length > 3) {
            var datos = {
                id: id,
                monto: monto
            }
            console.log(datos);
            datos = JSON.stringify(datos)
            fetch(`http://localhost:5000/registro/modificar/${datos}`, {
                method: 'PUT',

            })
                .then((res) => res.json())
                .then((result) => {

                    alert(result.result);
                    obtenerRegistros();
                })
                .catch((error) => {
                    console.log(error);
                })


        } else if (monto === "" || monto === '0' || monto.length === 0 || monto.length <= 3) {
            alert("Falta ingresar criterio a modificar");
        }
    } else {
        alert("cancelado");
    }

}





//ELIMINAR UN ITEM
const eliminar = (id) => {

    var seguir = confirm("Desea eliminar este Item?");

    if (seguir) {
        console.log(id);
        fetch(`http://localhost:5000/registro/eliminar/${id}`, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((result) => {
                alert(result.result)
                obtenerRegistros()
            })
            .catch((error) => {
                console.log(error)
            })

    } else {
        alert("Cancelado");
    }

}