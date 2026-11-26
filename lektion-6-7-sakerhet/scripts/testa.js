// läser .env först
import 'dotenv/config';
// hämta en fonktion
import { registerUser } from '../src/services/userService.js';
//skapa en test användare
const user = await registerUser('testSima','hemlig123');
//visa vad funktionen ger tillbaka  
console.log(user);
// stänger programet
process.exit();
