import usuarioModelo from '../models/User.js';


// función para obtener la lista de libros (GET)
export const listarUsuarios = async(req,res)=>{
    try {
        const data = await usuarioModelo.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}

export default {
    listarUsuarios
}
