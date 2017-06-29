Zbog specifičnosti situacije razvijanja aplikacije u Meteoru, implicitno smo koristili sledeće paterne:

 
 ## Publish–subscribe
 <a href="https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern">Publish–subscribe </a> patern se koristi prilikom komunikacije sa bazom, gde se klijent pretplati na određene delove baze i bude obavešten prilikom svake njene promene od strane servera. Više o metodama kojima se služi Meteor možete pogledati <a href="https://docs.meteor.com/api/pubsub.html">ovde</a>.
 
 
 ## Client-server
 Sama struktura Meteor projekta je u slojevitoj arhitekturi i kao takva je jedan od osnovnih dizajn paterna.
 
 
## MVC
 <a href="https://sr.wikipedia.org/wiki/MVC_arhitektura">MVC arhitektura</a>  je softverski patern Model-view-controller koji odvaja prikaz informacija od interakcije korisnika sa tim informacijama. Model se sastoji od podataka aplikacije, poslovnih pravila, logike i funkcija. View može da bude bilo koji izlazni prikaz podataka, kao što je dijagram ili grafik. Više prikaza istog podatka je moguće, kao što je grafik sa barovima za menadžment i tabelarni prikaz za računovođe. Controller uzima ulazne podatke i konvertuje ih u komande za model ili view.
 
 
 ## Facade pattern
 <a href="http://www.dofactory.com/javascript/facade-design-pattern ">Facade patern</a> omogućava interfejs koji štiti korisnika od komplesnih struktura, funkcionalnosti u jednom ili više podsistemu. Ovo je jedan od osnovnih paterna jer sam Meteor forsira pakete.
 
 
 ## Compound pattern
 *Ime za određen broj paterna koji funkcionišu dobro zajedno u dizajnu i koji se mogu koristiti za više problema: compound pattern* (500. strana knjige *Head First Design Patterns*). Samim tim implicitno se koristi i ovaj patern koji je skup svih ostalih paterna.
