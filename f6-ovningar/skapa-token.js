// hämtar paketet för JWT
import jwt from 'jsonwebtoken';

// en användare, som en rad från databasen (findUserByUsername i lek6)
const user = { id:1, username:'sima', role: 'user', password_hash: '$2b$10$hemlighashsomaldrigskaskickas'};
// skapar ett token för en användare, aldrig med password_hash
// { } betyder att return krävs
const createToken = (user) =>{
    // väljer bara det token behöver (SAL 5f: payload kan läsas av alla)
    const payload = {id: user.id, username: user.username,role: user.role};
    // signerar med hemligheten, gäller 1 timme ('testhemlighet' flyttas till .env i övning 7)
    const token = jwt.sign(payload,'testhemlighet',{expiresIn:'1h'});
    // skickar token ut ur funktionen
    return token;
};
// anropar funktionen, som vid inloggning
const token = createToken(user)
console.log('Token',token);
// decode läser payload utan att kontrollera signaturen, bara för att titta
console.log('payload:', jwt.decode(token));
