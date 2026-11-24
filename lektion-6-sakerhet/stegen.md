# Lektion 6 – Säkerhet och autentisering

📘 Läs i handboken: **Node F6 → "Lektion 6: uppgifter och lösningar"** (Cmd+Option+M)

## 🧠 Två minnesregler
| Gäller | Regel |
|---|---|
| `server.js` | **Läs → Hämta → Skapa → Vakter → Öppna** |
| varje route | **Läs → Kolla → Försök → Villkor → Svara** (+ fånga 500) |

Utskrivbar A4: `../route-receptet.pdf`

## 📍 Här är jag nu
🎉 **Lektion 6 klar** (2026-11-23). Alla tre uppgifter testade i Postman.
Nästa: repetition i `../lektion-6-repetition/ovningar.md`, sedan F6-övningarna (små program) från handboken.

## Starta igen efter paus
| Gör | Kommando |
|---|---|
| Starta databasen | `docker start lektion6-db` |
| Gå till mappen | `cd ~/Documents/node-kursen/node-uppgifter/lektion-6-sakerhet` |
| Se tabellen | `docker exec lektion6-db psql -U postgres -d n6test -c "SELECT * FROM users;"` |
| Kolla en fil | `node --check filnamn.js` |

## Uppgift 1: Registrera (bcrypt)
Läs: F6 "bcrypt: hasha lösenord" + "Registrera en användare i PostgreSQL" + "Uppgift 1"

- [x] 1. Paket: `npm install express pg bcrypt jsonwebtoken dotenv helmet`
- [x] 2. `"type": "module"` i package.json
- [x] 3. Postgres i Docker (port 5434, databas `n6test`)
- [x] 4. `schema.sql` → tabellen `users`
- [x] 5. `.env` (PORT, DATABASE_URL, JWT_SECRET)
- [x] 6. `db.js` – anslutning
- [x] 7. `userService.js` – `registerUser` (testad med `testa.js`)
- [x] 7b. `routes/auth.js` – `POST /register`
- [x] 8. `server.js` – Läs → Hämta → Skapa → Vakter → Öppna
- [x] 9. Starta: `node server.js`
- [x] 10. Postman: `POST localhost:3006/register`, Body → raw → JSON

| Test i Postman | Body | Förväntat |
|---|---|---|
| ny användare | `{"username":"sima","password":"hemligt123"}` | 201 |
| samma igen | samma | 409 |
| kort lösenord | `{"username":"anna","password":"123"}` | 400 |

## Uppgift 2: Logga in (JWT)
Läs: F6 "JWT: JSON Web Token" + "Skapa en JWT med jwt.sign" + "Uppgift 2"

- [x] 11. `findUserByUsername` i `userService.js`
- [x] 12. I `routes/auth.js`: importera `bcrypt`, `jwt`, `findUserByUsername`
- [x] 13. `POST /login`: `bcrypt.compare` → `jwt.sign` med `expiresIn: '1h'`
- [x] 14. Postman: `POST localhost:3006/login`

| Test i Postman | Förväntat |
|---|---|
| rätt namn och lösenord | 200 + token |
| fel lösenord | 401 |

## Uppgift 3: Skydda rutter (middleware)
Läs: F6 "Bearer-token i headern Authorization" + "Middlewaren authenticateToken" + "Uppgift 3"

- [x] 15. `middleware/auth.js` – `authenticateToken` (`jwt.verify`)
- [x] 16. `routes/users.js` – `GET /users` med `authenticateToken` först
- [x] 17. Koppla in `users.js` i `server.js`
- [x] 18. Postman: `GET localhost:3006/users`, Authorization → Bearer Token

| Test i Postman | Förväntat |
|---|---|
| utan token | 401 |
| fel token | 403 |
| rätt token | 200 |

## Säkerhet i lektionen (SAL)
| Fråga | Var |
|---|---|
| 5a `$1, $2` | userService.js |
| 5b kolla indata → 400 | routes/auth.js |
| 5c token krävs → 401/403 | middleware/auth.js |
| 5e try/catch, inga SQL-fel i svaret | alla routes |
| 5f ingen hash i svaret | `RETURNING id, username, role` |

## Ombyggnad till lärarens struktur (24 nov)
- [x] Steg 1–2: filerna flyttade till `src/`, `db/`, `scripts/`. `server.js` delad i `server.js` (startar) + `app.js` (bygger). Starta med `npm run dev`. Testat: 400, 401, 401, 403 ✅
- [ ] Steg 3: `src/controllers/authController.js` (Sima skriver)
- [ ] Steg 4: `src/controllers/usersController.js`
- [ ] Steg 5: middleware i lärarens stil (`authorization.byToken`)
- [ ] Steg 6: Postman alla 9 tester + commit
