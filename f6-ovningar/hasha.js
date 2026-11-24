//hämta paketet som gör hash med salt
import bcrypt from 'bcrypt';

//gör en jämförelse med övning 1
const password = 'hemligt123';

// gör en hash av samma lösenord två gånger, 10= salt rounds
const hash1 = await bcrypt.hash(password, 10);
const hash2 = await bcrypt.hash(password, 10);

//testa och jämnför
console.log('hash 1:', hash1);
console.log('hash 2:', hash2);
console.log('Lika?', hash1 === hash2);