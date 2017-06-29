# MongoDB
MongoDB je vodeća NoSQL baza podataka. MongoDB čuva podatke kao JSON dokumente sa dinamičkim šemama. 
JSON (JavaScript Object Notation) je otvoreni standard zasnovan na tekstu, osmišljen za razmenu podataka koji su pogodni za čitanje ljudima.
Meteor.js koristi MongoDB u pozadini. </br>
U nastavku je pregled podataka koje čuvamo u bazi.


## Rooms

| No  | Ime promenljive | Objašnjenje    |
| :---- | :--------------- |:---------------|
| 1   | _id            | ID sobe  |
| 2   | name            | Ime sobe  |
| 3   | image           | Avatar sobe       |
| 4   | maxPlayer       |  Maksimalni broj igrača       |
| 5   | timeRound       | Vreme trajanja runde       |
| 6   | passwordRoom       | Password sobe |
| 7   | player_ids       | Niz ID-eva igrača       |
| 8   | player_points       | Niz broja poena igrača       |
| 9   | roomType       | Da li je soba javna ili privatna       |
| 10   | drawIdPlayer       | ID crtača       |
| 11   | pointsArray       | Niz kodiranih tačaka        |
| 12   | gameStatus       | 0: igra nije počela; 1: igra je počela; 2: Završila se partija        |
| 13   | numberRounds       | Broj rundi       |


## Users

| No  | Ime promenljive | Objašnjenje    |
| :---- | :--------------- |:---------------|
| 1   | _id           | ID korisnika  |
| 2   | profile.avatar           | Avatar       |
| 3   | profile.in_game       |  Da li je igrač trenutno u igri       |


## Words

| No  | Ime promenljive | Objašnjenje    |
| :---- | :--------------- |:---------------|
| 1   | _id           | ID reči od 0 do Broj reči  |
| 2   | word           | Reč       |
