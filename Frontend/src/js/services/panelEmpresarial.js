const URL_API = 'http://localhost:3000/job';

export async function obtenerTrabajos() {

    try {     
        const response = await fetch(`${URL_API}`);
        const empleos = await response.json(); 
        
        return empleos;
    } catch (error) {
        console.error("Error: ", error);
        return [];
    } 
}

export async function obtenerTrabajoPorId(id) {

    try {     
        const response = await fetch(`${URL_API}/${id}`);
        const empleos = await response.json(); 
        console.log(empleos);
        return empleos;
    } catch (error) {
        console.error("Error: ", error); 
    }
}

export async function crearTrabajo(empleos) {

    try {    
        const options = {
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(empleos)
        }; 
        const response = await fetch(URL_API,options);
        const empleoGuardado = await response.json();
        
        return empleoGuardado;

    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function actualizarTrabajo(empleos) { 

    try{
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(empleos)
        };

        console.log("📦 Enviando al backend:", empleos);
        const res = await fetch(`${URL_API}/${empleos._id}`, options);
        const empleoActualizado = await res.json();
        return empleoActualizado;
    
    } catch  (error){
        console.error("Error: ", error);
    }
}


export async function eliminarTrabajo(id) {

    try {    

        const options = {
            method: 'DELETE'
          };    
          
          const res = await fetch(`${URL_API}/${id}`,options);
          const mensaje = await res.json();
      
        return mensaje;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export default{
    obtenerTrabajos,
    obtenerTrabajoPorId,
    crearTrabajo,
    actualizarTrabajo,
    eliminarTrabajo
    
};

