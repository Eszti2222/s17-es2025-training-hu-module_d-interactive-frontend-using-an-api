# Tesztprojekt Vázlat – D modul – Interaktív Frontend API-val

## Versenyidő

**4 órád** van a D modul elvégzésére.

## Bevezetés

A D modul egy REST API frontend implementációjára fókuszál.

## Általános projekt- és feladatleírás

A projekt során egy REST API frontendjét kell létrehoznod. Először a frontend felhasználóinak be kell tudniuk jelentkezniük. Az API hitelesítési mechanizmusát használva a frontend hozzáférhet az API-hoz és adatokat küldhet és kérhet le róla. Az ebben a modulban általad létrehozott funkcionalitás a C modulban létrehozott backend szolgáltatásaira épül.

A projekt elkészítéséhez rendelkezésre áll a backend. **A biztosított backend alap URL-je:** `https://cXX-solution.ssa.skillsit.hu/api/v1` ahol `XX` az állomásszámod.

**API dokumentáció:** Az OpenAPI dokumentáció elérhető az `assets` mappában ehhez a backendhez és az összes API végpont referenciájául szolgál.

**Adatbázis:** Nincs közvetlen hozzáférésed a backend által használt adatbázishoz. Azonban egy adatbázis dump elérhető az `assets/db` könyvtárban, hogy megvizsgálhasd az adatstruktúrát és tartalmat. Minden felhasználó jelszava **`password123`**.

A frontend felhasználói felfedezhetik az elérhető kurzusokat, beiratkozhatnak tanulási útvonalakra, teljesíthetnek fejezeteket kreditek megszerzéséhez és foglalhatnak mentorálási üléseket. A frontendnek kezelnie kell a kreditrendszer összetettségét, valós idejű foglalási visszaigazolásokat és adatvizualizációt, miközben intuitív felületet nyújt a felhasználóknak.

Kezdetben az alkalmazás felhasználói hitelesítést igényel. A felhasználóknak be kell jelentkezniük a tanulási platform funkciói eléréséhez. Az X-API token minden kérésnél elküldendő a szervernek és tárolandó a böngészőben az oldal újratöltések és navigáció során történő megőrzéséhez.

A frontendet keretrendszerrel kell implementálnod. Használhatsz további könyvtárakat is. Az alkalmazásnak egyoldalas alkalmazásnak (SPA) kell lennie. Az útválasztást a keretrendszernek kell kezelnie. Az oldal újratöltéseknek ugyanazt a tartalmat kell megjeleníteniük a felhasználónak, mint korábban látható volt, kivéve a nem mentett felhasználói bemeneteket.

## Követelmények

Ennek a frontendnek a célja, hogy egy intuitív felületet biztosítson a tanulóknak a SkillShare Academy platformmal való interakcióhoz REST API-n keresztül. A felhasználóknak képesnek kell lenniük hitelesítésre, kurzusok felfedezésére, tanulási fejezetek teljesítésére, kreditek megszerzésére és mentor ülések foglalására zökkenőmentesen.

A frontenden a következő funkcionális követelményeket kell implementálnod:

- Egyoldalas alkalmazás (SPA) architektúra modern JavaScript keretrendszerrel
- Hitelesítési rendszer X-API tokenekkel a C modul API-jából
- Integráció a biztosított C modul API megoldással
- Hibakezelés különböző HTTP státuszkódokhoz
- Helyi tárolás a hitelesítési token megőrzéséhez
- Adatlekérdezés valós idejű foglalási státusz frissítésekhez
- Adatvizualizáció Chart.js használatával tanulási elemzésekhez
- Harmadik fél script integrációja a továbbfejlesztett funkcionalitáshoz
- Reszponzív design az optimális felhasználói élményhez

### Tervezési irányelvek:

Az egyes oldalakhoz tartozó vázlatok az `assets/` könyvtárban találhatók. Az implementációnak:

- Követnie kell a vázlatokban látható elrendezési struktúrát és komponens elhelyezést
- Meg kell őriznie a SkillShare Academy márka identitását és tervezési nyelvét
- Konzisztens stílust kell alkalmaznod, amely illeszkedik a platform vizuális szabványaihoz
- Biztosítanod kell, hogy a reszponzív tervezési elvek követve legyenek minden képernyőméreten
- Modern UI/UX gyakorlatokat kell használnod, miközben tiszteletben tartod a létrehozott tervezési keretrendszert

### Hibakezelés

Az API különböző hibákat adhat vissza működés során. A frontendnek kezelnie kell ezeket a hibákat és érthető módon meg kell jelenítenie őket a felhasználónak. A következő hibákat kell kezelned:

- `400 Bad Request` – A kérés hibás volt. A felhasználót értesíteni kell, hogy érvénytelen adatokat adott meg.
- `401 Unauthorized` – A hitelesítési token érvénytelen vagy lejárt. A felhasználót át kell irányítani a bejelentkezési oldalra.
- `403 Forbidden` – A felhasználónak nincs jogosultsága a kért művelethez. A felhasználót értesíteni kell a hiányzó jogosultságokról.
- `404 Not Found` – A kért erőforrás nem található. A felhasználót értesíteni kell, hogy a tartalom nem elérhető.
- `422 Unprocessable Entity` – Validációs hibák történtek. Jelenítsd meg a specifikus mező hibákat a felhasználói javítások irányításához.
- `500 Internal Server Error` – Szerver hiba történt. A felhasználót értesíteni kell egy ideiglenes rendszerhibáról.

### Oldalak

A következő oldalakat kell implementálnod:

#### Bejelentkezési oldal

A bejelentkezési oldal lehetővé teszi a felhasználók számára a SkillShare Academy platformmal való hitelesítést. Ha a felhasználó nincs bejelentkezve, automatikusan erre az oldalra lesz irányítva.

Az oldalnak a következő elemeket kell tartalmaznia:

- Egy email bemeneti mezőt a felhasználó email címének megadásához.
- Egy jelszó bemeneti mezőt a felhasználó jelszavának megadásához.
- Egy bejelentkezési gombot a felhasználó hitelesítéséhez.
- Szöveget, amely elmagyarázza, hogy a regisztráció ingyenes.
- Egy linket a regisztrációs oldalra azoknak a felhasználóknak, akiknek még nincs fiókjuk.
- Űrlap validációt valós idejű visszajelzéssel érvénytelen bemenetekhez.

Sikeres hitelesítés után az X-API tokent localStorage-ban kell tárolnod és a felhasználót át kell irányítanod a Felhasználói Irányítópultra.

#### Regisztrációs oldal

A regisztrációs oldal lehetővé teszi az új felhasználók számára ingyenes fiókok létrehozását a platformon.

Az oldalnak a következő elemeket kell tartalmaznia:

- Egy név bemeneti mezőt a felhasználó teljes nevéhez.
- Egy email bemeneti mezőt a felhasználó email címéhez.
- Egy jelszó bemeneti mezőt erősség validációval.
- Egy jelszó megerősítő mezőt, amelynek meg kell egyeznie a jelszóval.
- Egy regisztrációs gombot a fiók létrehozásához.
- Egy linket vissza a bejelentkezési oldalra.

Az űrlap validációnak tartalmaznia kell email formátum ellenőrzést, jelszó erősség követelményeket és egyező jelszó megerősítést. Sikeres regisztráció után a felhasználót vissza kell irányítanod a bejelentkezési oldalra.

#### Felhasználói Irányítópult

Az irányítópult a bejelentkezés utáni fő kezdőlapként szolgál, felhasználói statisztikákat és tanulási elemzéseket jelenít meg.

![Dashboard Wireframe](assets/wireframes/03-dashboard.png)

Az oldalnak a következő elemeket kell tartalmaznia:

- Üdvözlő üzenet a felhasználó nevével.
- Jelenlegi kredit egyenleg kiemelten megjelenítve.
- Kreditkeresési haladási diagram (vonaldiagram) Chart.js használatával implementálva, amely az elmúlt 30 nap kreditfelhalmozását mutatja.
- Kurzus teljesítési státusz diagram (fánk diagram) Chart.js használatával implementálva, amely a teljesített vs. hátralévő fejezeteket mutatja az összes beiratkozott kurzusban.
- Navigációs linkek a Kurzus Katalógus és Mentor Foglalás oldalakra.
- Gyors statisztika megjelenítés az összes beiratkozott kurzus és teljesített fejezet számával.

**Chart.js implementáció**: A diagram implementációhoz lásd a [hivatalos Chart.js dokumentációt](https://www.chartjs.org/docs/latest/).

#### Kurzus Katalógus

A kurzus katalógus az összes elérhető kurzust megjeleníti beiratkozási státusz jelzőkkel.

Az oldalnak a következő elemeket kell tartalmaznia:

- Kurzus kártyák megjelenítése: cím, leírás, nehézségi szint, összes fejezet, összes elérhető kredit.
- Minden kurzus kártyánál a beiratkozási státuszt egyértelműen jelezni kell:
  - Ha a felhasználó **nincs beiratkozva**: Jeleníts meg egy "Beiratkozás" gombot, amely azonnali beiratkozást indít.
  - Ha a felhasználó **beiratkozott**: Jeleníts meg egy "Tanulás folytatása" gombot, amely a kurzus oldalra navigál.
- Keresési funkcionalitás a kurzusok cím vagy leírás szerinti szűréséhez.
- Szűrési lehetőségek nehézségi szint szerint (Kezdő, Középszintű, Haladó).
- Vizuális jelzők a beiratkozási státusz megjelenítéséhez minden kurzusnál.

A kurzus beiratkozásnak azonnali vizuális visszajelzést kell adnia, és frissítened kell a gomb állapotát.

#### Kurzus oldal

Az egyéni kurzus oldalak részletes haladást és fejezetkezelést jelenítenek meg a beiratkozott kurzusokhoz.

##### Kurzus fejléc

- Kurzus címe és leírása
- Vizuális haladásjelző a teljesített fejezetek számát mutatja az összes fejezethez képest
- Kredit haladásjelző a megszerzett krediteket mutatja a lehetséges összes kredithöz képest

##### Fejezetkezelés

Az összes kurzus fejezet teljes listázása a következő információkkal mindegyikhez:

- Fejezet címe és rövid leírása
- Kredit érték (3-5 kredit fejezetként)
- Teljesítési státusz megfelelő műveletekkel:
  - **Ha nincs teljesítve**: "Teljesítésként jelölés" gomb, amely krediteket ad a felhasználó fiókjához kattintáskor
  - **Ha teljesítve**: "Fejezet teljesítve" címke és "Eredmény megosztása" gomb LinkedIn megosztáshoz
- Egy "Fejezet megtekintése" gomb, amely letiltott/inaktívként jelenik meg, hogy a jövőbeli funkcionalitást reprezentálja. Ezt a gombot úgy kell stílusoznod, hogy egyértelműen jelezze, hogy nem funkcionális (pl. szürkítve, letiltott kurzorral)

##### Fejezet teljesítési viselkedés

Amikor egy felhasználó egy fejezetet teljesítésként jelöl:

- A krediteket azonnal hozzá kell adni a fiókjához
- A "Teljesítésként jelölés" gombot le kell cserélni egy teljesítési címkére és LinkedIn megosztási gombra
- A haladásjelzőket frissíteni kell az új teljesítési státusz tükrözéséhez

##### LinkedIn megosztási integráció

- Lásd az `assets/third-party/README.md` fájlt az implementációs részletekért
- Konfigurálnod kell a megosztási tartalmat a kurzus címe, fejezet neve, megszerzett kreditek és a felhasználó összes haladása alapján

#### Mentor ülés foglalási oldal

A mentor ülés foglalási oldal az elérhető jövőbeli mentor üléseket jeleníti meg, amelyeket a felhasználók foglalhatnak és követhetik a foglalási visszaigazolásokat.

Az oldalnak a következő elemeket kell tartalmaznia:

- Elérhető mentor ülések listája a következő információkkal minden üléshez:
  - Mentor neve és kulcsfontosságú információ (szakértési területek, tapasztalati szint).
  - Egy "Profil megtekintése" gomb, amely letiltott/inaktívként jelenik meg, hogy a jövőbeli funkcionalitást reprezentálja. Ezt a gombot úgy kell stílusoznod, hogy egyértelműen jelezze, hogy nem funkcionális (pl. szürkítve, letiltott kurzorral).
  - Ülés dátuma és időpontja.
  - Ülés időtartama (mindig egy óra).
  - Az ülés kredit költsége a mentor óradíja alapján (8-15 kredit/óra).
  - "Ülés foglalása" gomb a foglalási kérelem elküldéséhez.
- Foglalási elküldés után az üléseknek "Visszaigazolásra vár" státuszt kell mutatniuk.
- Valós idejű lekérdezés 30 másodpercenként a mentor válaszok ellenőrzéséhez.
- Státusz frissítések, amikor a foglalások "pending" állapotból "confirmed" vagy "rejected" állapotba változnak.
- Vizuális értesítések foglalási státusz változások esetén.
- A felhasználó lefoglalt üléseinek listája státuszt, mentort, dátum/időt és költséget mutatva.

A foglalási visszaigazolási rendszernek kezelnie kell a mentor válaszokat és azonnali vizuális visszajelzést kell adnia a felhasználóknak. Lekérdezned kell a mentor ülés visszaigazolásokat 30 másodpercenként a foglalási elküldés után. Frissítened kell a felhasználói felületet, amikor a foglalások "pending" állapotból "confirmed" vagy "rejected" állapotba változnak.

## Értékelés

A D modult a biztosított Google Chrome verzióval értékelik. Az értékelés funkcionális teszteket és felhasználói élményt tartalmaz.

**Fontos**: A biztosított C modul API megoldás bármilyen módosítása, beleértve az adatbázis változtatásait, nem kerül figyelembevételre az értékelés során. Csak a biztosított API végpontokat használd változatlanul.

## Pontszám eloszlás

Az alábbi táblázat bemutatja, hogyan oszlanak meg a pontok és hogyan illeszkednek a WorldSkills Occupation Standards (WSOS) szabványokhoz.
Kérjük, olvasd el a Műszaki Leírást a WorldSkills Occupation Standards teljes magyarázatához.

| WSOS SZAKASZ | Leírás                                     | Pontok |
| ------------ | ------------------------------------------ | ------ |
| 1            | Munkaszervezés és önkezelés                | 0      |
| 2            | Kommunikáció és interperszonális készségek | 0      |
| 3            | Tervezési implementáció                    | 5      |
| 4            | Front-End fejlesztés                       | 17     |
| 5            | Back-End fejlesztés                        | 0      |
|              |                                            |        |
| **Összesen** |                                            | 22     |
