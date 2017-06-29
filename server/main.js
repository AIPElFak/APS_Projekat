import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/*import '../imports/api/top_10.js';

import '../imports/api/rooms.js';*/

TopTen = new Mongo.Collection('top_10');
Rooms = new Mongo.Collection('rooms');
Words = new Mongo.Collection('words');

const streamer = new Meteor.Streamer('chat');

SaveRooms = new Mongo.Collection('save_rooms');


Meteor.startup(() => {

	/*Words.insert({ _id: "0", word:"ghost" });
	Words.insert({ _id: "1", word:"kite" });
	Words.insert({ _id: "2", word:"dog" });
	Words.insert({ _id: "3", word:"egg" });
	Words.insert({ _id: "4", word:"mouse" });
	Words.insert({ _id: "5", word:"star" });
	Words.insert({ _id: "6", word:"spider web" });
	Words.insert({ _id: "7", word:"cookie" });
	Words.insert({ _id: "8", word:"jacket" });
	Words.insert({ _id: "9", word:"skateboard" });
	Words.insert({ _id: "10", word:"duck" });
	Words.insert({ _id: "11", word:"horse" });
	Words.insert({ _id: "12", word:"door" });
	Words.insert({ _id: "13", word:"garbage" });
	Words.insert({ _id: "14", word:"pirate" });
	Words.insert({ _id: "15", word:"treasure" });
	Words.insert({ _id: "16", word:"frog" });
	Words.insert({ _id: "17", word:"mailman" });
	Words.insert({ _id: "18", word:"lightsaber" });
	Words.insert({ _id: "19", word:"nature" });
	Words.insert({ _id: "20", word:"password" });
	Words.insert({ _id: "21", word:"electricity" });
	Words.insert({ _id: "22", word:"jungle" });
	Words.insert({ _id: "23", word:"lie" });
	Words.insert({ _id: "24", word:"catalog" });
	Words.insert({ _id: "25", word:"laser" });
	Words.insert({ _id: "26", word:"rubber" });
	Words.insert({ _id: "27", word:"logo" });
	Words.insert({ _id: "28", word:"barber" });
	Words.insert({ _id: "29", word:"mirror" });
	Words.insert({ _id: "30", word:"jazz" });
	Words.insert({ _id: "31", word:"professor" });
	Words.insert({ _id: "32", word:"landscape" });
	Words.insert({ _id: "33", word:"exponential" });
	Words.insert({ _id: "34", word:"philosopher" });
	Words.insert({ _id: "35", word:"landfill" });
	Words.insert({ _id: "36", word:"eureka" });
	Words.insert({ _id: "37", word:"archaeologist" });
	Words.insert({ _id: "38", word:"observatory" });
	Words.insert({ _id: "39", word:"Atlantis" });*/

	ServiceConfiguration.configurations.upsert({
  	service: "facebook"
	}, {
	  $set: {
	    appId: "1022696844524002",
	    loginStyle: "popup",
	    secret: "a3763c673ba0d39a6028d89cb280c009"
	  }
	});

	ServiceConfiguration.configurations.upsert({
  	service: "google"
	}, {
	  $set: {
	    clientId: "142824363488-lo1h69v8l5jmibnag5nn6tjrhn9ha8se.apps.googleusercontent.com",
	    loginStyle: "popup",
	    secret: "cYc8dV3k9Xen03pTBEOIdhri"
	  }
	});

	ServiceConfiguration.configurations.upsert({
  	service: "twitter"
	}, {
	  $set: {
	    consumerKey: "w9izu9W2hcZCg7BMV0bfmtssQ",
	    loginStyle: "popup",
	    secret: "jWIBkPdbgzWVaZ3M3UIktOFPoRwYnvkpMYX18Zqnd72B8k8jAZ"
	  }
	});
  // code to run on server at startup
/*OVDE PISEMO KOD ZA SLANJE AKTIVACIONOG EMAIL-A*/

 /*Accounts.config({
        sendVerificationEmail: true
    });*/



		
streamer.allowRead('all');
streamer.allowWrite('all');

Meteor.users.allow({
    insert: function (userId, doc) {
           //Normally I would check if (this.userId) to see if the method is called by logged in user or guest
           //you can also add some checks here like user role based check etc.,
           return true;
        },
    
    update: function (userId, doc, fieldNames, modifier) {
           //similar checks like insert
           return true;
        },
    
    remove: function (userId, doc) {
           //similar checks like insert
           return true;
        }
    
});

	Meteor.methods({
	  startGame: function (id_room_url_new) {

			console.log('on server, startGame called');

			var his_room = Rooms.findOne({_id: id_room_url_new, player_ids: Meteor.userId()});

			var random_number_for_word = Math.floor((Math.random() * Words.find().count()));

			var random_number_for_word_string = random_number_for_word.toString();

			var word_string = Words.findOne({_id: random_number_for_word_string});

			Rooms.update({_id: id_room_url_new}, {$set: {"gameStatus": "1", "currentWord": word_string.word}});
			//Session.set("word",word_string.word);

			return his_room.drawIdPlayer;
		
	  },

	  updateusersPoints: function(pointsArray, playerIdArray){
	  	for(var i = 0; i < playerIdArray.length; i++)
		{
			var query = Meteor.users.findOne({_id: playerIdArray[i]});

			var ukupno = query.profile.points + pointsArray[i];

			Meteor.users.update({_id: playerIdArray[i]}, {$set: {"profile.points": ukupno}});
		}

		Rooms.remove({_id: id_room_url_new});

		return true;
	  }

	});


});
