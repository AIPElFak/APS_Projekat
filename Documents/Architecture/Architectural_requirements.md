# Arhitekturni zahtevi aplikacije Sketcher

U ovom dokumentu je dat pregled funkcionalnosti, arhitekturnih i nefunkcionalnih zahteva za aplikaciju Sketecher.

## Funkcionalnosti

Sketcher je online web igra, samim tim mora zadovoljiti neke osnovne funkcionalnosti:
* Kreiranje nove sobe sa svim neophodnim parametrima
* Izlistavanje svih soba
* Odabir jedne sobe
* Mogućnost crtanja i prikazivanja svim ostalim igračima koji su u sobi
* Manipulacija bojama
* Mogućnost pogađanja pojma
* Mogućnost komunciranja sa ostalim igračima preko chat-a

Kroz navedene funkcionalnosti je implementirana funkcionalna specifikacija projekta dobijena od strane klijenta (profesora):

1. Snimanje partije uz mogućnost nastavka kada svi igrači budu bili u sobi.<br/>
2. Podrška za istovremeni rad više klijenata na jednom dokumentu (partiji igre) pri čemu prvi korisnik (crtač) koji je napravio sobu može na početku da unosi izmene, a svi ostali mogu u realnom vremenu da prate izmene i učestvuju u igri. Na kraju runde, uloga crtača se prenosi na drugoga (na onog koji je pogodio reč ili na proizvoljno izabranog ako reč nije pogođena).<br/>
3. Implementirana sinhronizacija dokumenta kod svih klijenata.<br/>
4. Omogućiti istovremeni rad više igara istovremeno.<br/>
5. Omogućiti adekvatnu vizuelizaciju veceg broja soba u lobiju pri čemu je moguće videti sve bitne informacije za sobu (ime sobe, broj igrača, maksimalni broj igrača).<br/>
6.  Prilikom implementacija na odgovarajućim mestima iskoristiti barem 3 različita projektna obrasca.<br/>


## Nefunkcionalni zahtevi i ograničenja

Prilikom projektovanja Sketcher aplikacije, ustanovljena je potreba za sledećim nefunkcionalnim zahtevima:

* Proširljivost
* Reupotrebljivost 
* Pouzdanost
* Lakoća testiranja
* Lakoća korišćenja 
* Performanse
* Emocionalni faktori 
* Podrška za različite internet pregledače
* Lako održavanje
* Otvoren kod

## Arhitekturni zahtevi

Na osnovu navedenih nefunkcionalnih zahteva (odnosno atributa kvaliteta) i ograničenja, imamo sledeće arhitekturne zahteve:

* *Proširljivost* - Arhitektura aplikacije mora da bude takva da omogući lako dodavanje novih funkcionalnosti na bazi trenutne aplikacije. 
* *Reupotrebljivost* - Komponente aplikacije treba da budu projektovane tako da mogu lako da se iskoriste u budućim projektima slične funkcionalnosti.
* *Pouzdanost* - Aplikacija ne sme da prikaže netačne rezultate izvršenja algoritama. Takođe ne sme doći do gubljenja poruka koje se razmenjuju između korisnika i servera.
* *Lakoća testiranja* - Komponente sistema treba projektovati tako da je njihovo testiranje lako, odnosno komponente treba da su u slaboj međusobnoj sprezi.
* *Lakoća korišćenja* - Korisnički interfejs treba da bude jednostavan i lak za korišćenje. Korisnik treba inuitivno da zna koji alat čemu služi..
* *Performanse* - Odziv aplikacije pri normalnim uslovima korišćenja ne sme da bude veći od 3 sekunde.
* *Emocionalni faktori* - Aplikacija treba da ostavi jak emotivni utisak zabave i euforije kod korisnika kako bi što više igrao.
* *Podrška za raličite internet pregledače* - Rad u aplikaciji treba da je moguć korišćenjem bilo kog internet pregledača (Google Chrome, Mozilla Firefox, Microsoft Edge, itd) u njihovim najnovijim verzijama.
* *Lako održavanje* - Komponente sistema treba da imaju jednostavna i lako razumljiva imena koja opisuju njihovu svrhu u cilju lakšeg održavanja koda u budućnosti i lakog integrisanja novih članova tima u ceo proces.
* *Otvoren kod* - Kod aplikacije treba da bude dostupan na javnom repozitorijumu na GitHub-u. 
