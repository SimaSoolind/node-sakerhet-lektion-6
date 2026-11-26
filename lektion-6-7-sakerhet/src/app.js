// app.js bygger appen: Hämta → Skapa → Vakter (server.js startar den)
import express from 'express';
import helmet from 'helmet';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';


//skapa själva appen, export så att server.js kan starta den
export const app = express();
// kom ihåg att use är alla, både get och post, Läs → Hämta → Skapa → Vakter → Öppna
//säkra (vakten) headers på alla svar
app.use(helmet());
// läser json i body
app.use(express.json());
//kopplar in /register
app.use(authRoutes);// koppla register
app.use(userRoutes);// kopplar in /users(skyddad)
