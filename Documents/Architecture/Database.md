# MongoDB
MongoDB je vodeća NoSQL baza podataka. MongoDB čuva podatke kao JSON dokumente sa dinamičkim šemama. 
JSON (JavaScript Object Notation) je otvoreni standard zasnovan na tekstu, osmišljen za razmenu podataka koji su pogodni za čitanje ljudima.
Meteor.js koristi MongoDB u pozadini. </br>
U nastavku je pregled podataka koje čuvamo u bazi.


## Rooms && SaveRooms

| No  | Ime promenljive | Objašnjenje    |
| :---- | :--------------- |:---------------|
| 1   | _id            | ID sobe  |
| 2   | name            | Ime sobe  |
| 3   | image           | Avatar sobe       |
| 4   | maxPlayer       |  Maksimalni broj igrača       |
| 5   | timeRound       | Vreme trajanja runde       |
| 6   | player_ids       | Niz ID-eva igrača       |
| 7   | player_points       | Niz broja poena igrača       |
| 8   | roomType       | Da li je soba javna ili snimljena       |
| 9   | drawIdPlayer       | ID crtača       |
| 10   | pointsArray       | Niz kodiranih tačaka        |
| 11   | gameStatus       | 0: igra nije počela; 1: igra je počela; 2: Završila se partija        |
| 12   | numberRounds       | Broj rundi       |
| 13   | winPlayer       | ID igrača koji je pogodio pojam       |
| 14   | currentRound       | Trenutna runda      |
| 15   | player_ids_now        | Spisak igrača koji su dobijeni iz SaveRooms      |


## Users

| No  | Ime promenljive | Objašnjenje    |
| :---- | :--------------- |:---------------|
| 1   | _id           | ID korisnika  |
| 2   | profile.avatar           | Avatar       |
| 3   | profile.in_game       |  Da li je igrač trenutno u igri       |
| 4   | profile.points      |  Broj poena       |
| 5   | username       | Korisničko ime       |
| 6   | email       |  Korisnički E-mail      |

## Words

| No  | Ime promenljive | Objašnjenje    |
| :---- | :--------------- |:---------------|
| 1   | _id           | ID reči od 0 do Broj reči  |
| 2   | word           | Reč       |

## TopTen

| No  | Ime promenljive | Objašnjenje    |
| :---- | :--------------- |:---------------|
| 1   | _id           | ID |
| 2   | mesto           | Redni broj u tabeli       |
| 3   | username           | Korisničko ime       |
| 4   | points           | Broj poena       |
