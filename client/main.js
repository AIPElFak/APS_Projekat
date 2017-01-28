import { Template } from 'meteor/templating';

/*import { TopTen } from '../imports/api/top_10.js';

import { Rooms } from '../imports/api/rooms.js';*/

TopTen = new Mongo.Collection('top_10');
Rooms = new Mongo.Collection('rooms');

import { ReactiveVar } from 'meteor/reactive-var';


import './main.html';

//biram vreme


//definisem stream
const streamer = new Meteor.Streamer('chat');


var tipSobe = "All";
var returnRooms = Rooms.find({gameStatus: "0"});

Meteor.startup(function () {

    sAlert.config({
        effect: '',
        position: 'top-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });

});


//var currentUser = Meteor.userId();

Router.route('/register',{
	name: 'register',
	template: 'register',


	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(!currentUser){
           // this.next();
           // alert("Logovan");
            this.next();
        } else {

            Router.go('loby');
        }
    }
});
Router.route('/guess',{
	name: 'guess',
	template: 'guess',


	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
           // this.next();
           // alert("Logovan");
            this.next();
        } else {

            Router.go('home');
        }
    }
});


Router.route('/', {
	name: 'home',
	template: 'home',


	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(!currentUser){
           // this.next();
           // alert("Logovan");
            this.next();
        } else {
            Router.go('loby');
        }
    }
});
Router.configure({
	layoutTemplate: 'main'
});
Router.route('/forgot',{
  name: 'forgot'
});
Router.route('/loby',{
	name: 'loby',
	template: 'loby',

	onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
           // this.next();
           // alert("Logovan");
            this.next();
        } else {
            Router.go('home');
        }
    }
});

	$("select.image-picker").imagepicker({});

if(Meteor.isClient)
{
	/*Meteor.logout();
	console.log(Meteor.userId());*/
	console.log(Meteor.userId());

	//Froma za registraciju
	Template.register.events({
		//zabranjujem space karaktere
		'keypress .registerForm': function(event){
			var code = event.charCode || event.keyCode;
		  	if(code == 32)
		    	return false;
		},
	    'submit .registerForm': function(event){
	        event.preventDefault();
	        var username = event.target.username.value;
	        var email = event.target.email.value;
	        var password = event.target.password.value;
	        var password_confirm = event.target.password_confirm.value;
	        var points = 0;

	        if(password == password_confirm)
	        {
		        Accounts.createUser({
		        	username: username,
		            email: email,
		            profile: {
				        points: points,
				        avatar: "/images/user.png"
				    },
		            password: password
		            
		        }, function(error){
					    // code goes here    
					    if(error){
					    	$("#errorRegister").html("<p style='color:red;'>"+error.reason+"</p>");
					        console.log(error.reason); // Output error if registration fails
					    }

					    else
					    {
					    	Meteor.logout();
					    	Router.go('home');
					    }
				});
	        	//Router.go('loby');
	       	}

	       	else
	       	{
	       		$("#errorRegister").html("<p style='color:red;'>Password no match</p>");
	       	}
	    }
	});

	Template.home.events({
		//zabranjujem space karaktere
		'keypress .loginForm': function(event){
			var code = event.charCode || event.keyCode;
		  	if(code == 32)
		    	return false;
		},
	    'submit .loginForm': function(event){
	        event.preventDefault();
	        var username = event.target.username.value;
	        var password = event.target.password.value;

	        Meteor.loginWithPassword(username, password, function(error){
			    if(error)
			    {
			        $("#errorLogin").html("<p style='color:red;'>"+error.reason+"</p>");
			    } 
			    else 
			    {
			        Router.go('loby');
			    }
			});
	    },
	    'click .facebookLogin': function(event){

	    	Meteor.loginWithFacebook({
			  requestPermissions: ['user_friends', 'public_profile', 'email']
			}, (err) => {
			  if (err) {
			    // handle error
			    $("#errorLogin").html("<p style='color:red;'>"+err.reason+"</p>");
			  } else {
			    // successful login!
			    Router.go('loby');
			  }
			});
	    },

	    'click .googleLogin': function(event){

	    	//Meteor.loginWithGoogle();
	    	Meteor.loginWithGoogle({
			  requestPermissions: ['email']
			}, (err) => {
			  if (err) {
			    // handle error
			    $("#errorLogin").html("<p style='color:red;'>"+err.reason+"</p>");
			  } else {
			    // successful login!
			    Router.go('loby');
			  }
			});
	    },

	    'click .twitterLogin': function(event){

	    	Meteor.loginWithTwitter({
			  requestPermissions: ['user_friends', 'public_profile', 'email']
			}, (err) => {
			  if (err) {
			    // handle error
			    $("#errorLogin").html("<p style='color:red;'>"+err.reason+"</p>");
			  } else {
			    // successful login!
			    Router.go('loby');
			  }
			});
	    }
	});

	Template.loby.events({

		'click .test':function(event)
		{
			$('#configModal').modal('hide');
		},

		'click .logout': function(event){
	    	Meteor.logout();
	    	Router.go('home');
	    	//location.reload(); 
	    },

	    'click .changeAvatar': function(event){
	    	var avatar_tmp = $(".selectAvatar").val();
	    	Meteor.users.update(Meteor.userId(), {$set: {profile: {avatar: avatar_tmp}}});
	    },

	    'click .savePassword': function(event){

	    	var oldPassword = $("#oldPassword").val();
	    	var newPassword = $("#newPassword").val();
	    	var confirmNewPassword = $("#confirmNewPassword").val();

	    	if( (oldPassword.length >= 6 && oldPassword.length <= 15) && (newPassword.length >= 6 && newPassword.length <= 15) )
	    	{

		    	if(newPassword == confirmNewPassword)
		    	{
		    		Accounts.changePassword(oldPassword, newPassword, function(error){

					    if(error)
					    {

							sAlert.error(error.reason, {timeout: 2000, position: 'top'});
					       //$(".changePasswordForm").html("<div class='alert alert-success'><strong>ASDSAD</strong></div>");
					    } 

					    else
					    {
					    	sAlert.success('Change password successfuly', {timeout: 2000, position: 'top'});
					    	$("#oldPassword").val("");
					    	$("#newPassword").val("");
					    	$("#confirmNewPassword").val("");
					    }
				    
					});
		    	}

		    	else
		    	{
		    		//ne podudaraju se sifre
		    		sAlert.error('Password mismatch', {timeout: 2000, position: 'top'});
		    	}
		    }
		    else
		    {
		    	sAlert.error('Password must be between 6 and 15 characters', {timeout: 2000, position: 'top'});
		    	//previse karaktera
		    }
	    	
	    },

	    'submit .createRoom': function(event){
	    	var roomName = $(".roomName").val();
	    	var roomImage = $(".roomImage").val();
	    	var maxPlayer = $(".maxPlayer").val();
	    	var numberRounds = $(".numberRounds").val();
	    	var timeRound = $(".timeRound").val();
	    	var passwordRoom = $(".passwordRoom").val();

	    	//gameStatus oznacava da li je igra pocela ili ne 0-igra nije statovana 1-igra startovana

	    	//roomType oznacava da li je soma private ili publuc, false-public, true-private

	    	if(passwordRoom.length > 0)
	    	{
	    		Rooms.insert({ name: roomName, image: roomImage, maxPlayer: maxPlayer, numberRounds: numberRounds, timeRound: timeRound, passwordRoom: passwordRoom, player_ids: [Meteor.userId()], gameStatus: "0", roomType: true });
	    	}

	    	else
	    	{
	    		Rooms.insert({ name: roomName, image: roomImage, maxPlayer: maxPlayer, numberRounds: numberRounds, timeRound: timeRound, passwordRoom: passwordRoom, player_ids: [Meteor.userId()], gameStatus: "0", roomType: false });
	    	}
	    },

	    'change #sel1': function(event){

	    	var tipSobe = $("#sel1").val();


	    	if(tipSobe == "All")
	    	{
	    		returnRooms = Rooms.find({gameStatus: "0"}).fetch();
	    	}

	    	else if(tipSobe == "Private")
	    	{
	    		returnRooms = Rooms.find({gameStatus: "0", roomType: true}).fetch();
	    	}

	    	else
	    	{
	    		returnRooms = Rooms.find({gameStatus: "0", roomType: false}).fetch();
	    	}

	    	//alert(returnRooms.length);

	    	$(".listaSoba").html("");

	    	returnRooms.forEach(function(myDoc) {
	    		var roomType_tmp;

		    	if(myDoc.roomType)
	    		{
	    			roomType_tmp = "Private";
	    		}

	    		else
	    		{
	    			roomType_tmp = "Public";
	    		}
	    		$(".listaSoba").append("<a href ='#' class='roomclick'><div class='li-group-item'><li class='list-group-item'><img src ='"+myDoc.image+"'/></li><span class='room'>Room: </span><span class='name'>"+myDoc.name+"</span> <span class='players'>Players: </span><span class='prvideo'>"+myDoc.player_ids.length+"</span><span class='drugideo'>/</span><span class='trecideo'>"+myDoc.maxPlayer+"</span><span class='status'>Status:</span><span class='statusname'>"+roomType_tmp+"</span></div></a>");
	    	});
	    }


	});

	//promenjive koja pamti da li je user regsitrovan ili ne
	Template.loby.helpers({
		user_id: function(){
			var user_login;
			if(Meteor.userId())
			{
				user_login = true;
			}

			else
			{
				user_login = false;
			}

			return user_login;
		},

		topUsers: function(){
			
			return TopTen.find();
		},

		playerUsername: function(){
	    	var user_tmp = Meteor.users.findOne({_id: Meteor.userId()});
			return user_tmp && user_tmp.username;
		},

		playerAvatar: function(){
			var user_tmp = Meteor.users.findOne({_id: Meteor.userId()});
			return user_tmp && user_tmp.profile.avatar;
		},

		rooms: function(){
			return returnRooms
		}

		
	});

	Template.home.helpers({
		user_id: function(){
			var user_login;
			if(Meteor.userId())
			{
				user_login = true;
			}

			else
			{
				user_login = false;
			}

			return user_login;
		}
	});

	Template.register.helpers({
		user_id: function(){
			var user_login;
			if(Meteor.userId())
			{
				user_login = true;
			}

			else
			{
				user_login = false;
			}

			return user_login;
		}
	});

	Template.forgot.helpers({
		user_id: function(){
			var user_login;
			if(Meteor.userId())
			{
				user_login = true;
			}

			else
			{
				user_login = false;
			}

			return user_login;
		}
	});

	Template.guess.helpers({

		chatsend: function(message) {
    streamer.emit('message', message);
    console.log('me: ' + message);
  }
	});

	 sendMessage = function(message) {
    streamer.emit('message', message);
    console.log('me: ' + message);
  };

  streamer.on('message', function(message) {
    console.log('user: ' + message);
  });

}


var maxcounter = 10;
var firstquad = maxcounter/4;
var secnd =maxcounter/2;
var thirdquad = (maxcounter*3)/4;

var countdown = new ReactiveCountdown(maxcounter,

	{
			//posle svakog tika radi nesto
		tick: function() 
		{

				crtanje();
		},	

	});

crtanje = function(){

	var progressbar = document.querySelector('div[data-progress]'),
	quad1 = document.querySelector('.quad1'),
	quad2 = document.querySelector('.quad2'),
	quad3 = document.querySelector('.quad3'),
	quad4 = document.querySelector('.quad4'),

			progress = progressbar.getAttribute('data-progress'); //uzimam trenutnu vrednost
			progress++;
			progressbar.setAttribute('data-progress',progress);
			setPie(progress);
		  function setPie(progress) {
	//prva cetvrtina
	if (progress <= firstquad) {
	  quad1.setAttribute('style', 'transform: skew(' + progress * (-90 / firstquad) + 'deg)'); //iscrtava prvi luk
	}

	//izmedju prve i druge, pravi drugu cetvrtinu
	else if (progress > firstquad && progress <= secnd) {
	  quad1.setAttribute('style', 'transform: skew(-90deg)'); // krije prvi luk
	  quad2.setAttribute('style', 'transform: skewY(' + (progress - firstquad) * (90 / firstquad) + 'deg)'); //iscrtava drugi luk
	  progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 20px yellow'); 
	}

	//izmedju druge i trece, pravi trecu cetvrtinu
	else if (progress > secnd && progress <= thirdquad) {
	  quad1.setAttribute('style', 'transform: skew(-90deg)'); // krije prvi luk
	  quad2.setAttribute('style', 'transform: skewY(90deg)'); // krije drugi luk
	  quad3.setAttribute('style', 'transform: skew(' + (progress - secnd) * (-90 / firstquad) + 'deg)'); // iscrtava treci
	  progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 20px orange');
	}

	//izmedju trece i cetvrte, pravi cetvrtu cetvrtinu
	else if (progress > thirdquad && progress <= maxcounter) {
	  quad1.setAttribute('style', 'transform: skew(-90deg)'); // krije prvi luk
	  quad2.setAttribute('style', 'transform: skewY(90deg)'); // krije drugi luk
	  quad3.setAttribute('style', 'transform: skew(-90deg)'); // krije treci luk
	  quad4.setAttribute('style', 'transform: skewY(' + (progress - thirdquad) * (90 / firstquad) + 'deg)'); //iscrtava cetvrti
	  progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 20px red');
	}
	}


};

Template.guess.helpers({

	getCountdown: function()
	{
		return countdown.get();
	}
});

Template.guess.events({

	'click #start': function(event){

		countdown.start(function() {

    // radi nesto kad se zavrsi
    		clearInterval();
		});



	}


});

if(Meteor.isServer)
{
	 streamer.allowRead('all');
  streamer.allowWrite('all');
}
