async function auth(req, res, next){

    try{

    }catch(error){
        return res.status(401).send({
            message: "Autenticação Falhou",
            cause: error.message
        })
    }
}

module.exports = {auth}