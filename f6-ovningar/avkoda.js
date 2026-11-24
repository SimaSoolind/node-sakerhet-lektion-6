// hämtar paketet för JWT (JSON Web Token)
import jwt from 'jsonwebtoken';
// skapar ett token, som vid inloggning i lek6
// 'testhemligt' bara för övningen, i riktig kod: process.env.JWT_SECRET
const token = jwt.sign({id:1, username: 'sima',role:'user'}, 'testhemligt',{expiresIn: '1h'});
// testar
console.log('Token:', token);

// gör om en del av token (base64url) är ett sätt att skriva med säkra tecken
// kort pilfunktion: utan { } blir return automatiskt
// base64url är kodning, inte kryptering: vem som helst kan läsa
const decodePart = (part) =>
    Buffer.from(part, 'base64url').toString();
// delar token vid punkterna: [0] header, [1] payload, [2] signatur
const parts = token.split('.');
// visa varje del som en vanlig text
// header: alg (HS256) och typ (JWT), skapas automatiskt
console.log('Header:',decodePart(parts[0]));
// payload: min data + iat (utfärdad) och exp (går ut), aldrig lösenord här
console.log('Payload:',decodePart(parts[1]));
// signaturen är ingen text (konstiga tecken), den bevisar att token är äkta
console.log('signature:',decodePart(parts[2]));
