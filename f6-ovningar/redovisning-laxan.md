# Min redovisning: läxan i Alex repo (25 nov)

Länkar: [Pull request #3](https://github.com/leQu/fullstack25_nodejs_lecture-notes/pull/3) · [Issue #2](https://github.com/leQu/fullstack25_nodejs_lecture-notes/issues/2)

> **Om jag tappar bort mig:** titta på rubrikens nummer. Läs meningen under "Säg så här". Andas. Det är okej att läsa innantill.

---

## 1. Klona och branch

**Stödord:** clone → egen branch → npm install → .env → Docker → npm run dev

**Säg så här:**
Jag började med att klona repot till min dator. Sedan gjorde jag en egen branch, så att jag inte ändrade något i main. Jag tänkte att main är Alex kod, och min ändring ska ligga för sig tills han har tittat på den. Jag installerade paketen, gjorde en .env från .env.example och startade MongoDB i Docker.

## 2. Problemet: appen startade inte

**Stödord:** ERR_MODULE_NOT_FOUND → orderLog.js saknas → git check-ignore → logs/

**Säg så här:**
När jag startade appen kom felet att en fil saknades: src/logs/orderLog.js. Jag tänkte först att jag hade gjort fel. Men filen fanns inte i repot alls. Då undrade jag varför, och testade git check-ignore. Den visade att raden logs/ i .gitignore gömmer alla mappar som heter logs, även src/logs. Så filen kom aldrig med till GitHub. För att kunna testa gjorde jag en egen testfil lokalt. Den är inte med i min commit. Det här blev mitt första fynd.

## 3. Hur jag läste koden

**Stödord:** app.js → följa import → routes → middleware → jämföra med lektion 6 → SAL-frågorna

**Säg så här:**
Jag började i app.js, eftersom det är där allt kopplas ihop. Sedan följde jag varje import, till routes och middleware. Jag jämförde med min egen lektion 6, där jag byggde inloggning med bcrypt och JWT. Vid varje route frågade jag mig: vem får göra det här, vad skickas tillbaka, och finns det någon hemlighet i koden? Det är frågorna från SAL-kursen.

## 4. Namnbytet

**Stödord:** userPassword → authorization.byPassword · apiKey → authorization.byApiKey · läses som en mening

**Säg så här:**
Uppgiften var att byta namn på behörighetskontrollerna. userPassword lät som ett lösenord och apiKey som själva nyckeln. Men de är kontroller, alltså middleware. Med import * as authorization blir det authorization.byPassword och authorization.byApiKey. Då läses det som en mening: behörighet genom lösenord, behörighet genom API-nyckel. Jag ändrade fyra filer och kontrollerade med git diff innan jag committade.

## 5. Vad jag testade

| Test | Svar |
|---|---|
| POST /register | 201 |
| POST /login | 200 + token |
| GET /user utan token | 401 |
| GET /user med token (byPassword) | 200 |
| GET /orders/log utan x-api-key | 401 |
| GET /orders/log med x-api-key (byApiKey) | 200 |

**Säg så här:**
Jag testade i Postman att namnbytet inte förstörde något. Jag testade både utan och med token eller nyckel. Utan fick jag 401, och med fick jag 200. Då visste jag att kontrollerna fortfarande fungerar.

## 6. Push och pull request

**Stödord:** push → 403 → fork → git remote add → push till fork → PR #3

**Säg så här:**
När jag pushade fick jag 403, eftersom jag inte hade rättigheter i Alex repo. Jag tittade på hur Sara hade gjort och såg att hon använde en fork. Så jag gjorde en fork, alltså en egen kopia på GitHub. Jag pushade min branch dit och öppnade en pull request till Alex main. I pull requesten har jag bara namnbytet. Fynden lade jag i en issue, eftersom de inte hör till uppgiften.

## 7. Fynden i issuen

**Säg först:**
När jag läste koden lade jag märke till några saker om säkerheten. Det kan vara så att några är medvetna förenklingar för undervisningen. Jag skrev dem ändå, för att visa vad jag har lärt mig.

1. **.gitignore logs/**
   Raden gömmer src/logs/orderLog.js, så appen startar inte efter en klon. Förslag: /logs/, då gäller det bara mappen i roten.
2. **/login saknar return**
   Efter 401 fortsätter koden, och då kraschar den på user.id. Samma sak som jag lärde mig i lektion 6: return avslutar funktionen.
3. **GET /user skickar hashen**
   Lösenordets hash finns med i svaret. Den ska aldrig skickas ut (SAL 5f).
4. **dishes saknar byApiKey**
   POST, PATCH och DELETE har ingen kontroll. Då kan vem som helst ändra menyn (OWASP A01, Broken Access Control).
5. **JWT-hemligheten 'password'**
   Den står direkt i koden och syns på GitHub. Med den kan vem som helst skapa ett eget token. Förslag: process.env.JWT_SECRET i .env.
6. **X-Powered-By: Express**
   Svaren visar vilken teknik servern använder. helmet tar bort den (SAL F3).

## 8. Vad jag lärde mig

**Säg så här:**
Det här var första gången jag jobbade med en branch i någon annans repo. Jag lärde mig skillnaden mellan en issue och en pull request: issuen är för fynd och förslag, pull requesten är för kodändringen. Jag lärde mig att läsa kod genom att följa importerna. Och jag lärde mig att en enda rad i .gitignore kan stoppa en hel app.
