// hämtar bcrypt (hash med salt)
import bcrypt from 'bcrypt';

// som vid registrering: gör en hash och spara den (som password_hash i databasen)
const savedHash = await bcrypt.hash('hemligt123', 10);
console.log('sparad hash:', savedHash);

// kontrollerar om lösenordet passar hashen, svarar true | false
// lång pilfunktion: { } betyder att return måste skrivas
// 🔁 kort version (en enda sak, return automatiskt):
// const checkPassword = async (password, hash) => bcrypt.compare(password, hash);
const checkPassword = async(password,hash) =>{
  // läser saltet ur hashen, gör en ny hash och jämför
  const isMatch = await bcrypt.compare(password,hash);
  // skickar svaret ut ur funktionen
  return isMatch
};

// som vid inloggning: true = 200 + token, false = 401
console.log('Rätt lösenord:', await checkPassword('hemligt123', savedHash));
console.log('Fel lösenord:', await checkPassword('hemligt124', savedHash));
