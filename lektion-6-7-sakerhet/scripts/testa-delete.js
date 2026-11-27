// TESTSKRIPT: testar deleteUser utan server och Postman
// kör: node scripts/testa-delete.js (stå i mappen lektion-6-7-sakerhet)

// läser .env först, så att databasen hittar lösenordet
import 'dotenv/config';
// hämtar funktionerna som ska testas från service-filen (../ = upp en mapp)
import { registerUser, deleteUser } from '../src/services/userService.js';

// skapar en tillfällig användare att ta bort (då raderas inte sima eller testSima av misstag)
const tempUser = await registerUser('tabortmig', 'hemligt123');
// skriver ut användaren, så att jag ser dess id
console.log('skapad:', tempUser);

// tar bort användaren med dess id (deleteUser kör DELETE ... WHERE id = $1)
const deletedUser = await deleteUser(tempUser.id);
// skriver ut raden som RETURNING skickade tillbaka
console.log('borttagen:', deletedUser);
 const notFound = await deleteUser(tempUser.id);
 console.log('igen:', notFound);
 process.exit();
