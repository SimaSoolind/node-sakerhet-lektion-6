# Lektion 7: roller (RBAC)

📘 Handboken: Node F7 – Rollbaserad åtkomstkontroll · SAL F2 (STRIDE) och F3 (minsta behörighet)
⏰ **Deadline: tisdag 1 december** (lektion + granskning av Alex kod)

## 📍 Här är jag nu
Del A steg 1–5 ✅. Del B uppgift 1 ✅. Uppgift 2: `roles.js`, `authorize`, `requireAdmin` och `deleteUser` (testad med `scripts/testa-delete.js`) ✅. Routen `DELETE /users/:id` är skriven, 401 testad ✅. 403 som testSima testad ✅. Uppgift 3 klar: 401, 403, 200 och 404 testade ✅. Del B är klar och pushad ✅. Nästa: Del C steg 1 i Skär (installera paketen).

## 🧵 Röda tråden
```
Förfrågan med token
  → authenticateToken   VEM är du?        fel → 401   (F6, klart ✅)
  → authorize           VAD får du göra?  fel → 403   (F7, nu)
  → controllern → databasen
```

---

## Del A: Gå igenom F7 tillsammans (cirka 2 pomodoros)
- [x] 1. Autentisering och auktorisering (vem / vad) ✅
- [x] 2. Vad RBAC är (användare → roll → rättigheter) ✅
- [x] 3. Rättighetsmatrisen och `roles.js` ✅
- [x] 4. En roll på användaren (`role` i tabellen, `CHECK`) ✅
- [x] 5. Middleware: `authorize` rad för rad ✅
- [ ] 6. Ett komplett exempel: Express, JWT och PostgreSQL
- [ ] 7. 401 eller 403?
- [ ] 8. Rollhierarki
- [ ] 9. Ägare eller admin
- [ ] 10. Rollen i token eller från databasen?
- [ ] 11. Roller i databasen (`GRANT`) och roller i appen

## Del B: Lektionsuppgiften, träna här med kommentarer (cirka 3 pomodoros)
Byggs i samma mapp som lektion 6 (se [stegen.md](stegen.md)).
- [x] **Uppgift 1:** roller på användaren
  - [x] `role` får bara vara `User` eller `Admin` (`CHECK` i databasen)
  - [x] gör en testanvändare till Admin med `UPDATE`
  - [x] prova en roll som inte finns, till exempel `Kung` → fel
- [x] **Uppgift 2:** bara Admin får ta bort en användare
  - [x] middleware `authorize` (generellt) och `requireAdmin` (enkelt) → 403 ✅
  - [x] `DELETE /users/:id` med `authenticateToken` + `requireAdmin` ✅ (skriven, 401 testad)
  - [x] service: `deleteUser` med `$1` ✅ (testad: 200-fallet och 404-fallet)
- [x] **Uppgift 3:** testa (Postman och curl)
  - [x] utan token → 401 ✅
  - [x] som User → 403 ✅
  - [x] som Admin → 200 ✅ (admintest tog bort id 7)
  - [x] Admin tar bort ett id som inte finns → 404 ✅

## Del C: Samma sak i Skär-projektet, ren kod utan lärkommentarer (cirka 3 pomodoros)
⚠️ Skär har ingen inloggning än (auth-controller och auth-middleware är tomma, `jsonwebtoken` och `bcrypt` saknas). F6 byggs först, sedan F7. Mappen: `~/Documents/node-kursen/HotellSkar-api`.
- [ ] 1. `npm install jsonwebtoken bcrypt` och `npm install -D @types/jsonwebtoken @types/bcrypt`  ← **börja här**
- [ ] 2. `POST /register` med bcrypt (auth-controller.ts, user-schemas.ts)
- [ ] 3. `POST /login` med JWT
- [ ] 4. `src/middleware/auth-middleware.ts` → 401
- [ ] 5. `src/middleware/admin-middleware.ts` → 403
- [ ] 6. bara Admin får skapa, ändra och ta bort rum
- [ ] 7. bara ägaren eller Admin får ändra eller ta bort en bokning
- [ ] 8. Postman/curl: alla fall + commit och push (utan kommentarer i koden)

## Del D: Alex kod för veckan (cirka 3 pomodoros)
- [ ] `git pull` i hans repo, ny branch
- [ ] läs och testa, gör ändringen
- [ ] pull request via min fork + issue med fynd (koden förstås utan kommentarer)

## SAL i den här lektionen
| Fråga | Svar i koden |
|---|---|
| 5c: får alla göra detta? | `authorize` → 403 |
| 5d: gäller det användarens egen rad? | `user_id` från token, aldrig från body |
| F3 minsta behörighet | User får bara det den behöver, Admin det extra |
| F2 STRIDE, E (elevation of privilege) | ingen kan göra sig själv till Admin via API:t |
