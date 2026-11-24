# 🔁 Repetition – lektion 6

> **Syfte:** bygga samma sak igen från noll, utan att titta, tills det sitter.
> **Regel:** försök själv i 2 minuter. Fastnar du: titta i `../lektion-6-sakerhet/` eller fråga Claude.
> **Minnesregel:** Läs → Hämta → Skapa → Vakter → Öppna

## Runda 1: registrera (uppgift 1)

| # | Övning | Klart när | ✅ |
|---|---|---|---|
| 1 | Starta en ny Postgres i Docker på port **5435**, databas `rep6` | `docker ps` visar den | [ ] |
| 2 | Skriv `schema.sql` (tabellen `users`) och kör in den | `\d users` visar 5 kolumner | [ ] |
| 3 | `npm init -y`, `"type": "module"`, installera paketen | `package.json` har 6 paket | [ ] |
| 4 | `.env` med PORT=3007 och DATABASE_URL | – | [ ] |
| 5 | `db.js` (pg.Pool) | `node --check db.js` tyst | [ ] |
| 6 | `userService.js`: `registerUser` med bcrypt | – | [ ] |
| 7 | `routes/auth.js`: `POST /register` (400, 201, 409, 500) | – | [ ] |
| 8 | `server.js`: de 5 blocken | `Servern lyssnar på port 3007` | [ ] |
| 9 | Postman: 201, 409, 400 | alla tre stämmer | [ ] |

## Förklara med egna ord (skriv svaret under)
1. Varför står `import 'dotenv/config'` först?
2. Vad är skillnaden mellan `app.use` och `router.post`?
3. Var stoppas 400, och var stoppas 409?
4. Varför skickar `RETURNING` aldrig tillbaka `password_hash`?

## Runda 2 och 3
Kommer när uppgift 2 (login, JWT) och uppgift 3 (skyddad route) är klara.
