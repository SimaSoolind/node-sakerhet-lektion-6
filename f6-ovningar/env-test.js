// läser .env och lägger värdena i process.env (alltid först)
import 'dotenv/config';
// hämtar paketet för JWT
import jwt from 'jsonwebtoken'
// hämtar hemligheten, stoppar programmet om den saknas (fail fast)
// { } betyder att return krävs
const getSecret = () => {
    // läser JWT_SECRET från .env
    const secret = process.env.JWT_SECRET;
    // ! = om den saknas
    if(!secret){
        // Error är en klass (stor bokstav), throw kastar felet
        throw new Error('JWT_SECRET saknas i .env ');
    }
    // skickar hemligheten ut ur funktionen
    return secret
}
// hämtar hemligheten från .env
const secret = getSecret();
// visar bara längden, aldrig själva hemligheten (SAL F9: aldrig hemligheter i loggar)
console.log('hemligheten finns, längd:', secret.length);
// skapar ett token med hemligheten från .env i stället för 'testhemlighet'
const token =jwt.sign({id:1, role:'user'}, secret,{expiresIn: '1h'});
console.log('Token', token);
