# NextJS + Cypress boilerplate

## Kom igång

1. Lägg till atlas url till din databas i `.env` filen
2. Kör `npm install` för att installera dependencies
3. Publicera databasen med `npm run push`
4. Seeda sedan databasen med `npm run seed`
5. Starta utvecklingsservern med `npm run dev`
6. Kör cypress testerna med `npm test` (startar automatiskt MongoDB och Next.js)

Nu borde du vara reda att skriva nya tester och bygga ut din app.

## Kör Replica Set lokalt på din dator

Om du vill använda din lokal databas för utveckling så måste du köra mongodb med i ett replica set för att Prisma ska fungera.

### MacOS

1. Stoppa MongoDB servicen
   `brew services stop mongodb-community@8.0`

2. Ändra konfigureringsfilen
   `code /opt/homebrew/etc/mongod.conf`
   och lägg till följande kod:

   ```
   replication:
     replSetName: rs0
   ```

3. Starta MongoDB servicen igen
   `brew services start mongodb-community`

4. Öppna mongosh och initiera replica set'et
   - `mongosh`
   - `rs.initiate()`
   - `rs.status()` (valfritt)

## Windows

1. Stoppa MongoDB servicen
   `Stop-Service "MongoDB"`

2. Ändra konfigureringsfilen
   `code "C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg"`
   och lägg till följande kod:

   ```
   replication:
     replSetName: rs0
   ```

3. Start MongoDB servicen igen
   `Start-Service "MongoDB"`

4. Öppna mongosh och initiera replica set'et
   - `mongosh`
   - `rs.initiate()`
   - `rs.status()` (valfritt)
