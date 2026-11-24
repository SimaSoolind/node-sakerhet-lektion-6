# 🧭 Plan: Node och SAL hand i hand

> **Idé:** Node lär mig **bygga**. SAL lär mig **skydda** det jag bygger. Varje Node-kapitel har ett SAL-kapitel som hör ihop.
> **Så använder jag den:** ett par i taget. Bygg först (Node), fråga sedan "hur skyddar jag det?" (SAL).

## Paren

| Node (bygga) | SAL (skydda) | Röda tråden | Läge |
|---|---|---|---|
| F1 Node, moduler | F1 CIA, shift-left | säkerhet från första raden | ✅ |
| F2 Express, middleware | F3 säker arkitektur | middleware = en vakt vid dörren | ✅ |
| F3 async, filer, streams | F5 fuzzing, DAST | felhantering: vad händer när något går fel? | ❓ fråga Ali |
| F4 databaser (pg) | F4 SQL injection | `$1, $2`, aldrig `+` | ❓ fråga Ali |
| F5 REST, validering | F4 säker kodning | 400 vid fel data (zod) | ✅ |
| **F6 bcrypt, JWT** | **F6 hash och kryptering** | lösenord hashas, e-post krypteras | **⬅ nu** |
| F7 roller (RBAC) | F2 hotmodell, F3 minsta behörighet | 401 vem är du, 403 vad får du | nästa |
| F8 skala, loggning | F9 loggning, incidenter | logga händelser, aldrig lösenord | sedan |
| F8 Docker i drift | F7 moln och containrar | Docker som icke-root, hemligheter i Vault | sedan |
| F9 realtid, filuppladdning | F8 CI/CD | testa och skanna allt automatiskt | sist |

## Nu: lektion 6 (Node F6 + SAL F6)

- [x] Uppgift 1: `registerUser` med bcrypt (SAL: **hash**, inte kryptering)
- [ ] `server.js` + Postman: 201, 400, 409 (SAL 5b, 5e)
- [ ] Uppgift 2: `/login` med JWT (SAL: hemligheten i `.env`, `expiresIn`)
- [ ] Uppgift 3: `authenticateToken` (SAL 5c: 401/403)
- [x] SAL lektion 6: AES-256-GCM + Vault (inlämnad 20 nov)

## Varje vecka (samma rytm)

| Dag | Gör |
|---|---|
| Efter Node-lektionen | bygg lektionens uppgift i `lektion-N-.../` |
| Efter SAL-lektionen | skriv in skyddet i samma kod (en rad: vilken SAL-fråga) |
| Fredag | 1–3 rader i `att-lara-mig.md` |
| Med Ali | frågorna i mejlet 23 nov (röda tråden, Postman, F3, F4, F6) |

## Klart när
- Varje lektionsmapp har en `stegen.md` där varje steg säger både Node-kapitel och SAL-fråga.
- Jag kan förklara varje par i tabellen med en mening.
