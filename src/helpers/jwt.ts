

const jwt = require("jsonwebtoken");

const generateJWT = (_id:string,
     user: string = "" ,
     expiresIn = process.env.EXPIRES_IN,
      jwtSecret = process.env.JWT_SECRET) =>{

        // RESUELVAMOS LA PROMESA 
return new Promise((resolve, reject) => {
    const payload = {
        _id,
        user,
};
 jwt.sign (
    payload,
    jwtSecret, { // recibimos mi palabra secreta 
    expiresIn: expiresIn   // cuando va a exprtar el token que generamos en jwtSecret , la varibal eexpres es la que defini 
    // en 12 horas como tal 
    },
    (error: string, token:string) => {
        if(error){
            console.log(error);
            reject("NO SE PUDO GENERAR EL TOKEN");

        }else resolve (token);
    }
    
    
    ) ;
});

};

export default generateJWT;