# F6-övningar – små program, ett begrepp i taget

🗺 Karta med bockar: [karta.html](karta.html) · 📖 Boken: Node F6, "Mappkarta för kapitel 6" (sida 353)

## 📍 Här är jag nu
Förberedelsen och övning 1 klara 24 nov. Övning 1–8 klara. Nästa: repetera övning 8 (fall 4), sedan övning 9 (`xss-test.js`).

## Metoden
Läs avsnittet → skriv koden själv → `node filnamn.js` → svara på aha-frågan med egna ord.

## Övningarna
- [x] 1. `sha256.js` – vad en hash är ✅ 24 nov
- [x] 2. `hasha.js` – `bcrypt.hash`, salt ✅ 24 nov
- [x] 3. `rundor.js` – salt rounds gör det långsamt ✅ 24 nov (10 = 49 ms, 14 = 773 ms)
- [x] 4. `jamfor.js` – `bcrypt.compare` ✅ 24 nov (egen funktion checkPassword)
- [x] 5. `avkoda.js` – en tokens tre delar ✅ 24 nov (iat, exp, signaturen är ingen text)
- [x] 6. `skapa-token.js` – `jwt.sign` ✅ 24 nov (egen funktion createToken, utan password_hash)
- [x] 7. `env-test.js` – `.env` och `process.env` ✅ 24 nov (getSecret, fail fast, .gitignore)
- [x] 8. `verifiera.js` – `jwt.verify`, fyra fall ✅ 24 nov 🔁 **träna igen** (fall 4, admin-tricket, satt inte)
- [ ] 9. `xss-test.js` – XSS
- [ ] 10. `https-server.js` – HTTPS

## Läxa: onsdag 25 nov morgon – jobba i lärarens repo
Länk: Learnpoint, repot för **25** (inte 24). Mapp: `node-uppgifter/fullstack25_nodejs_lecture-notes/` (node-uppgifter är inget git-repo, så det är säkert). Repo: https://github.com/leQu/fullstack25_nodejs_lecture-notes
- [x] L1. Klona repot
- [x] L2. Ny branch från main
- [x] L3. Byt namn: `userPassword` → `authorization.byPassword` / `authorization.byApiKey` (orders-routen), testa i Postman ✅ (A1 201, A2 200, A3 401, A4 200, B1 401, B2 200)
- [x] L4. Committa och pusha branchen (aldrig `.env`) ✅ 24 nov: via min fork (SimaSoolind), som Sara
- [x] L5. Pull request (bara namnbytet) ✅ 24 nov: [PR #3](https://github.com/leQu/fullstack25_nodejs_lecture-notes/pull/3)
- [ ] L6. Issue: sex fynd med rättning
  - JWT-hemligheten står i koden (`authorization.js`, `'password'`) → `process.env.JWT_SECRET` (SAL F6)
  - `dishes.js` POST/PATCH/DELETE saknar `authorization.byApiKey` → vem som helst kan ändra menyn (OWASP A01)
  - `.gitignore` rad 5 `logs/` ignorerar även `src/logs/` → `orderLog.js` pushades aldrig, appen startar inte efter klon → ändra till `/logs/`
  - `/login` i `app.js`: `if(!isValid) res.status(401)…` saknar `return` → koden fortsätter och kraschar på `user.id` (samma lärdom som i lektion 6: `return` avslutar)
  - `GET /user` skickar tillbaka `password` (bcrypt-hashen) i svaret → ta bort fältet (SAL 5f, samma som `RETURNING` utan hash i lektion 6)
  - svaren har headern `X-Powered-By: Express` → ingen `helmet` → avslöjar tekniken (SAL F3)

## Text till pull requesten (när pushen fungerar)
**Rubrik:** Byt namn på behörighetskontrollerna: authorization.byPassword och authorization.byApiKey

**Text:**
Namnen säger nu vad funktionerna gör. `userPassword` lät som ett lösenord och `apiKey` som själva nyckeln, men båda är kontroller (middleware). Med `import * as authorization` läses det som en mening: `authorization.byPassword` = kontrollera behörighet genom lösenord, `authorization.byApiKey` = kontrollera behörighet genom API-nyckel.

Ändrat i `authorization.js`, `app.js`, `orders.js` och `dishes.js`.

| Test i Postman | Förväntat | Resultat |
|---|---|---|
| GET /user utan token | 401 | ✅ |
| GET /user med token (authorization.byPassword) | 200 | ✅ |
| GET /orders/log utan x-api-key | 401 | ✅ |
| GET /orders/log med x-api-key (authorization.byApiKey) | 200 | ✅ |

Testat lokalt med `.env.example` som mall. `.env` är inte med i commiten.

## Senare: lektionerna till GitHub (Sima 24 nov, för LIA)
- Bara det som är klart och fullständigt först (lektion 6 + F6-övningarna). Lektion 1–5 läggs till när de är klara.
- Namn efter ämne i stället för nummer, t.ex. `node-sakerhet` (förslag tas fram senare).
- Före första commit: `.gitignore` med `.env` och `node_modules`, och lärarens repo hålls utanför.
