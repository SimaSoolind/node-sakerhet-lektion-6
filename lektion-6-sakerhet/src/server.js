import 'dotenv/config';// läs . env först i listan
// hämtar den färdiga appen från app.js
import { app } from './app.js';

// porten från .env annars 3000
const PORT = process.env.PORT || 3000;
// starta servern
app.listen(PORT, () => console.log(`Servern lyssnar på port ${PORT}`));

// komigåg server.js= Läs ✅ → Öppna ✅ (Hämta, Skapa och Vakter finns i app.js)
