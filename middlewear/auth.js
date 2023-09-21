const jwt = require("jsonwebtoken");

const auth = (req,res,next) =>{

    const token = req.headers.authorization;

    if(token){
        try {
            const decoded = jwt.verify(token, 'nil')

            if(decoded.isADMIN){
                console.log(decoded);

                req.body.isAdmin = decoded.isADMIN

                
                    next();
                

              
            }
            else{
                res.status(200).json({mag:"please Login"});
            }
        } catch (error) {
            res.send({"err":err.message})
        }
    }

    else{
        res.send({"msg":"Please login"})
    }
}

module.exports = auth