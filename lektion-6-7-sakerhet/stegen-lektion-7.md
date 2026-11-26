# Lektion 7: roller (RBAC)

📘 Handboken: Node F7 – Rollbaserad åtkomstkontroll · SAL F2 (STRIDE) och F3 (minsta behörighet)
⏰ **Deadline: tisdag 1 december** (lektion + granskning av Alex kod)

## 📍 Här är jag nu
Del A steg 1–5 ✅. Del B uppgift 1 ✅ (i Docker). Nästa: schema.sql och sedan uppgift 2 (roles.js).

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
- [ ] 5. Middleware: `authorize` rad för rad
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
- [ ] **Uppgift 2:** bara Admin får ta bort en användare
  - [ ] middleware `authorize` (eller `authorization.byRole`) → 403
  - [ ] `DELETE /users/:id` med `authenticateToken` + `authorize`
  - [ ] service: `deleteUser` med `$1`
- [ ] **Uppgift 3:** testa i Postman
  - [ ] utan token → 401
  - [ ] som User → 403
  - [ ] som Admin → 200
  - [ ] Admin tar bort ett id som inte finns → 404

## Del C: Samma sak i Skär-projektet, ren kod utan lärkommentarer (cirka 3 pomodoros)
- [ ] `src/middleware/admin-middleware.ts` → 403
- [ ] bara Admin får hantera rum
- [ ] bara ägaren eller Admin får ändra eller ta bort en bokning
- [ ] Postman: alla fall + commit och push

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
