# Sketcher

U nastavku se nalazi kratak pregled projekta.


## Dokumentacija sadržaj:
1. [Architecture requirements](Architecture/Architecture requirements.md)
2. [Database](Architecture/Database.md)
3. [Behavioral](Architecture/Behavioral.md)
4. [Architectural patterns.md](Architecture/Architectural patterns.md.md)

## Članovi tima:
14905 Nikola Stamenović</br>
14928 Milan Stojanović</br>
14938 Jovan Stojiljković</br>

## Opis projekta:
Naš tim je napravio web igru u kojoj korisnik nakon registracije i prijavljivanja može da menja svoje korisničke detalje, kao i da napravi novu sobu ili da se priključi postojećoj. Igra može da počne ako ima minimum dva igrača, igrač koji je napravio sobu odlučuje kada igra počinje pritiskom na dugme *start*. Crtač je igrač koji ima mogućnost crtanja (promenu dokumenta), on dobija reč koju treba objasniti drugima pomoću crteža. Korisnik koji pogodi reč postaje crtač u sledećoj rundi i dobija sledeću reč za pokazivanje. U slučaju da vreme istekne, korisnik koji je pokazivao gubi poene i pravo na pokazivanje, a sledeći pokazivač je proizvoljna osoba. Način pogađanja je upis u *guess* tekstualno polje, gde se odmah dobija povratna informacija da li je pojam pogođen, tu se i pamti istorija pogađanja. Čet je takođe implementiran koji se koristiti za komunikaciju između igrača.</br>
Moguće je sačuvati trenutno stanje igre i nastaviti je u nekom drugom trenutku, pod uslovom da su isti igrači prisutni. <br/>


<b>Broj osvojenih poena</b> koji se dobija je oređen na sledeći način: <br/>
*Pogođen pojam:*<br/> 
Igrač koji je pogodio += preostaloVreme; <br/>
Crtač += preostaloVreme\*0.2;<br/>
*Isteklo vreme:*<br/>
Crtač -= ukupnoVreme\*0.2<br/>
Ostali igrači -= ukupnoVreme\*0.1<br/>


## Tehnologije:
### Korišćenje tehnologija: 
HTML, CSS
### Korišćenje frameworka: 
MeteorJS, Bootstrap
### Baza podataka: 
MongoDB

## Lista korišćenih Meteor paketa:
<a href="https://atmospherejs.com/meteor/meteor-base">meteor-base</a>,
<a href="https://atmospherejs.com/meteor/mobile-experience">mobile-experience</a>,
<a href="https://atmospherejs.com/meteor/mongo">mongo</a>, 
<a href="https://atmospherejs.com/meteor/blaze-html-templates">blaze-html-templates</a>, 
<a href="https://atmospherejs.com/meteor/reactive-var">reactive-va</a>, 
<a href="https://atmospherejs.com/meteor/jquery">jquery</a>, 
<a href="https://atmospherejs.com/meteor/tracker">tracker</a>, 
<a href="https://atmospherejs.com/meteor/standard-minifier-css">standard-minifier-css</a>, 
<a href="https://atmospherejs.com/meteor/standard-minifier-js">standard-minifier-js</a>, 
<a href="https://atmospherejs.com/meteor/es5-shim">es5-shim</a>, 
<a href="https://atmospherejs.com/meteor/ecmascript">ecmascript</a>, 
<a href="https://atmospherejs.com/meteor/shell-server">shell-server</a>, 
<a href="https://atmospherejs.com/meteor/autopublish">autopublish</a>, 
<a href="https://atmospherejs.com/meteor/insecure">insecure</a>, 
<a href="https://atmospherejs.com/twbs/bootstrap">twbs:bootstrap</a>, 
<a href="https://atmospherejs.com/fortawesome/fontawesome">fortawesome:fontawesome</a>, 
<a href="https://atmospherejs.com/iron/router">iron:router</a>, 
<a href="https://atmospherejs.com/themeteorchef/bert">themeteorchef:bert</a>, 
<a href="https://atmospherejs.com/meteor/session">session</a>, 
<a href="https://atmospherejs.com/meteor/service-configuration">service-configuration</a>, 
<a href="https://atmospherejs.com/meteor/accounts-password">accounts-password</a>, 
<a href="https://atmospherejs.com/flyandi/reactive-countdown">flyandi:reactive-countdown</a>, 
<a href="https://atmospherejs.com/rocketchat/streamer">rocketchat:streamer</a>,
<a href="https://atmospherejs.com/juliancwirko/s-alert">juliancwirko:s-alert</a>, 
<a href="https://atmospherejs.com/meteor/dynamic-import">dynamic-import</a>. 

## Zaduženja: 
Članovi tima će zajedno raditi, tako da podela na početku nije moguca, već ce svaki član dobijati radne zadatke sekvencijalno.


*Zbog slabog poznavanja izabranih tehnologija, sigurno će doći do nekih promena, koje ćemo redovno ažurirati
