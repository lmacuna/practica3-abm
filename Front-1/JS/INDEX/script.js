


const login=()=>{

    document.querySelector("#root").innerHTML=`
    <form class="form-login">
    <h3 id="login" class="titulo-login">LOGIN</h3>
    <input id="input-login" class="input-login" type="text" name="email" placeholder="E-mail"></input>
    <input id="input-login2" class="input-login" type="text" name="contrasenia" placeholder="Contrasenia"></input>
    <input id="btn-login" class="btn-login" type="submit" value="SIGN IN"></input>

    
    </form>
    `
}


login();



const form=document.querySelector("form")
form.addEventListener('submit',(ev)=>{
    ev.preventDefault()
   clave=document.querySelector('[name=contrasenia]').value
   email=document.querySelector('[name=email]').value
    console.log("Enviado")
    if(clave!==""&& email!==""){
      
        const data= new FormData(ev.currentTarget)

        fetch('http://localhost:5000/login',{
            method:'POST',
            body:data
        })
        .then((res)=>res.json())
        .then((result)=>{
            if(result.result==='No encontrado'){
                console.log(result.result)
                error()
            }else{
                location.href=`${result.result}`
            }
            
            
        })
        .catch((error)=>{
            console.log(error)
        })
        

        
    
        
    }else if(clave===""){
        error()
       
    }
 
})

const error=()=>{
    document.querySelector("form").classList.add("form-error")
    document.querySelector("#login").classList.add("login-error")
    document.querySelector("#btn-login").classList.add("btn-login-error")
    document.querySelector("#titulo-app").classList.add("titulo-app-error")
    document.querySelector("#input-login").classList.add("input-login-error")
    document.querySelector("#input-login2").classList.add("input-login-error")
    document.querySelector("body").classList.add("body-error")
     setTimeout(()=>{
        alert("login Incorrecto")
    },200) 
    setTimeout(()=>{
        document.querySelector("form").classList.remove("form-error")
        document.querySelector("#login").classList.remove("login-error")
        document.querySelector("#btn-login").classList.remove("btn-login-error")
        document.querySelector("#titulo-app").classList.remove("titulo-app-error")
        document.querySelector("#input-login").classList.remove("input-login-error")
        document.querySelector("#input-login2").classList.remove("input-login-error")
        document.querySelector("body").classList.remove("body-error")
    },4000)
}
