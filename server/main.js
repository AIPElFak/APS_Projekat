import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/*import '../imports/api/top_10.js';

import '../imports/api/rooms.js';*/

TopTen = new Mongo.Collection('top_10');
Rooms = new Mongo.Collection('rooms');
Words = new Mongo.Collection('words');

Meteor.startup(() => {

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


const streamer = new Meteor.Streamer('chat');
streamer.allowRead('all');
streamer.allowWrite('all');

	Meteor.methods({
	  startGame: function (id_room_url_new) {

			console.log('on server, startGame called');

			var his_room = Rooms.findOne({_id: id_room_url_new, player_ids: Meteor.userId()});

			var random_number_for_word = Math.floor((Math.random() * 2));

			var random_number_for_word_string = random_number_for_word.toString();

			var word_string = Words.findOne({_id: random_number_for_word_string});

			Rooms.update({_id: id_room_url_new}, {$set: {"gameStatus": "1", "currentWord": word_string.word}});
			//Session.set("word",word_string.word);

			return his_room.drawIdPlayer;
		
	  },

	});


});
