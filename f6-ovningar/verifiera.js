// läser .env (alltid först)
import 'dotenv/config';
// hämtar paketet för JWT
import jwt from 'jsonwebtoken';

// hemligheten från .env (övning 7)
const secret = process.env.JWT_SECRET;
// ett äkta token, som efter inloggning (övning 6)
const realToken = jwt.sign({id:1, username:'sima',role: 'user'},secret,{expiresIn:'1h'});

// kontrollerar ett token, samma som authenticateToken i lektion 6
// skrivs FÖRE anropen: först funktionen, sedan anropet
const checkToken =(token) =>{
    try{
        // verify kontrollerar signaturen (med secret) och tiden (exp)
        const payload = jwt.verify(token, secret);
        // äkta: i middleware blir det next()
        return 'Godkänd: ' + payload.role;
    }
    catch(error){
        // falskt eller utgånget: verify kastar ett fel, i middleware blir det 403
        return 'Nekad: ' + error.message;
    }
};

// fall 1: äkta token → Godkänd
console.log('1 Äkta:', checkToken(realToken));

// fall 2: angriparen gissar hemligheten → Nekad (invalid signature)
const wrongToken = jwt.sign( {id:1, role:'admin'}, 'gissad-hemlighet');
console.log('2 Fel hemlighet:', checkToken(wrongToken));

// fall 3: rätt hemlighet men tiden har gått ut (-10s) → Nekad (jwt expired)
const oldToken = jwt.sign({id: 1, role:'user'},secret,{expiresIn: '-10s'});
console.log('3 Utgånget: ', checkToken(oldToken));

// fall 4: admin-tricket, angriparen byter user mot admin i payload
// delar det äkta token: [0] header, [1] payload, [2] signatur
const parts = realToken.split('.');
// gör en falsk payload med admin och kodar den till base64url (övning 5, fast tvärtom)
const fakePayload = Buffer.from('{"id":1,"role":"admin"}').toString('base64url');

// header + FALSK payload + äkta signatur
// signaturen passar inte den nya payloaden → Nekad (invalid signature)
const fakeToken = parts[0] + '.' + fakePayload + '.' + parts[2];
console.log('4 Admin-trick:', checkToken(fakeToken));

// repetition: se varje del av fall 4
// lista med 3 delar: [0] header, [1] payload, [2] signatur
console.log(parts);
// den falska payloaden: börjar med eyJ, kortare, innehåller admin
console.log(fakePayload);
// äkta header + FALSK payload + äkta signatur
console.log(fakeToken);
