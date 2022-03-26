var jwt = require("jsonwebtoken");
var secret = "abc123!@ABC";

module.exports = function(req, res, next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        try{
            var decoded = jwt.verify(token,secret);
            
            if(decoded.role == 2){
                next();
            }else{
                res.status(403);
                res.send("Você não tem permissão para isso!");
                return;
            }
        }catch(err){
            res.status(403);
            res.send("Você não está autenticado");
            return;
        }
    }else{
        res.status(403);
        res.send("Você não está autenticado");
        return;
    }
}