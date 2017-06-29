Za pokretanje projekta potrebno je instalirati meteor.js -> https://www.meteor.com/install
Zatim u odabranom folderu pokreniti cmd i izvršiti sledeci niz naredbi:

//kreiranje projekta
meteor create myapp
cd myapp
meteor npm install

Zatim u tom projeku prekopirati naš projekat.
U pokrenutom cmd-u u lokaciji projekta, izvršiti sledeci niz naredbi radi instaliranja neophodnih paketa:

meteor add twbs:bootstrap
meteor add iron:router
meteor add fortawesome:fontawesome
meteor add juliancwirko:s-alert
meteor add session
meteor add accounts-facebook
meteor add accounts-google
meteor add accounts-twitter
meteor add service-configuration
meteor add accounts-password
meteor add flyandi:reactive-countdown
meteor add rocketchat:streamer

//startovanje meteora
meteor