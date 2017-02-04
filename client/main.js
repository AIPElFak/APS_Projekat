//OBRATITI PAZNJU ZA APS PRILIKOM ISTOVREMENOG KLIKA ZA ULAZAK U SOBU!

import { Template } from 'meteor/templating';

/*import { TopTen } from '../imports/api/top_10.js';

import { Rooms } from '../imports/api/rooms.js';*/

TopTen = new Mongo.Collection('top_10');
Rooms = new Mongo.Collection('rooms');
GuessWords = new Mongo.Collection('guess_words');

import { ReactiveVar } from 'meteor/reactive-var';


import './main.html';

//biram vreme


	var canvas, canvas1, ctx, flag = false,		
	        prevX = 0,		
	        currX = 0,		
	        prevY = 0,		
	        currY = 0,		
	        dot_flag = false;		
			
	 var position;

	 var interval;

	 var arrya_points_draw = [];		
			
	    var x = "black",		
	        y = 2;		


//definisem stream
const streamer = new Meteor.Streamer('chat');

Session.set("firstTimeOnSite",0);

Session.set("numberOfPoints",0);

var tipSobe = "All";
var returnRooms = Rooms.find({gameStatus: "0"});

var id_room;
var id_rly_1;

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
Router.route('/guess/:_id',{
	name: 'guess',
	template: 'guess',


	onBeforeAction: function(){

        var currentUser = Meteor.userId();


        if(currentUser){
           var id_room_url = this.params._id;

           if(id_room_url)
           {
           		//ispitujem da li je igrac u nekoj sobi
           		var is_in_room = Meteor.users.findOne({_id: currentUser});

	          if(is_in_room && is_in_room.profile.in_game)
	           {
	           		//ako jeste ispitujem da li je on u toj sobi
		       	 	var his_room = Rooms.findOne({_id: id_room_url, player_ids: currentUser});

		       	 	if(his_room)
		       	 	{
		       	 		/*for(var i = 0; i < his_room.pointsArray.length; i++)
		       	 		{
		       	 			console.log(his_room.pointsArray[i]);
		       	 		}*/
		       	 		//ako jeste super
		       	 		Session.set("id_room_url",id_room_url);
		       	 		
		       	 		this.next();
		       	 		
		       	 		Session.set("drawIdPlayer",his_room.drawIdPlayer);
		       	 	}

		       	 	else
		       	 	{
		       	 		var his_room = Rooms.findOne({player_ids: currentUser});
		       	 		//ako nije vracam ga u njegovu sobu
		       	 		Router.go('/guess/'+his_room._id);
		       	 	}
		       	}

		       	 else
		       	 {
		       	 	//ako igrac nije u ovoj sobi, ispitujem da li je igra pocela

		       	 	var his_room = Rooms.findOne({_id: id_room_url});

		       	 	if(his_room && his_room.gameStatus == "0")
		       	 	{
		       	 		//igra nije pocela ispitujemo br igraca

		       	 		if(his_room.maxPlayer > his_room.player_ids.length)
		       	 		{
		       	 			//ima slobodnih mesta

			       	 		if(his_room.passwordRoom.length == 0)
			       	 		{
			       	 			//nema sifru samo ga ubacujemo
			       	 			Rooms.update({_id: id_room_url}, {$addToSet: {player_ids: Meteor.userId()}});
	    						Rooms.update({_id: id_room_url}, {$push: {player_points: [0]}});
	    						this.next();
		       	 		        Meteor.users.update({_id: currentUser}, {$set: {"profile.in_game": true}});
			       	 		}

			       	 		else
			       	 		{
			       	 			//ima sifra moramo da mu izbacim polje da unese
			       	 			alert("MORA UNESES SIFRU DECKO!!!");
			       	 		}
			       	 	}

			       	 	else
			       	 	{
			       	 		//max igraca je u sobi
			       	 		Router.go('loby');
			       	 	}
		       	 	}

		       	 	else
		       	 	{
		       	 		//igra je pocela
		       	 		Router.go('loby');
		       	 	}
		       	 }
            }

            else
            {
            	Router.go('loby');
            }

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

           var is_in_room = Meteor.users.findOne({_id: currentUser});

            if(is_in_room && !is_in_room.profile.in_game){
            	this.next();
           }

           else
           {
           		var his_room = Rooms.findOne({player_ids: currentUser});
           		Router.go('/guess/'+his_room._id);
           }

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
				        avatar: "/images/user.png",
				        in_game: false
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
		'click .logout': function(event){
	    	Meteor.logout();
	    	Router.go('home');
	    	//location.reload(); 
	    },

	    'click .changeAvatar': function(event){
	    	var avatar_tmp = $(".selectAvatar").val();
	    	Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": avatar_tmp}});
	    	//Meteor.users.update(Meteor.userId(), {$set: {profile: {avatar: avatar_tmp}}});
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
	    		id_rly_1 = Rooms.insert({ name: roomName, image: roomImage, maxPlayer: maxPlayer, numberRounds: numberRounds, timeRound: timeRound, passwordRoom: passwordRoom, player_ids: [Meteor.userId()], pointsArray: [], player_points: [0], gameStatus: "0", roomType: true, drawIdPlayer: Meteor.userId() });
	    	}

	    	else
	    	{
	    		id_rly_1 = Rooms.insert({ name: roomName, image: roomImage, maxPlayer: maxPlayer, numberRounds: numberRounds, timeRound: timeRound, passwordRoom: passwordRoom, player_ids: [Meteor.userId()], pointsArray: [], player_points: [0], gameStatus: "0", roomType: false, drawIdPlayer: Meteor.userId() });
	    	}

	    	Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.in_game": true}});

	    	Session.set("id_room",id_rly_1);
	    	$(".createRoom").attr("action","/guess/"+id_rly_1);
	    	Router.go('guess', {query: 'q=s'});

	    	//window.location.href = "/guess/"+id_rly_1;

	    },

	    'click #closeModal': function(event){
	    	//alert("SADSA");
	    	$("#closeModal").modal('hide');
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
	    },

	    'click .imgClick': function(event){
	    	var id_element = event.target.id;

	    	var id_element_arr = id_element.split('.');

	    	var id_rly = id_element_arr[1];

	    	var room_tmp = Rooms.findOne({_id: id_rly});

	    	var max_player = room_tmp.maxPlayer;

	    	var trenutno_player = room_tmp.player_ids.length;

	    	if( max_player == (trenutno_player + 1) )
	    	{

	    		Rooms.update({_id: id_rly}, {$set: {gameStatus: "1"}});
	    		Rooms.update({_id: id_rly}, {$addToSet: {player_ids: Meteor.userId()}});
	    		Rooms.update({_id: id_rly}, {$push: {player_points: [0]}});

	    		Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.in_game": true}});

	    		Session.set("id_room",id_rly);
		    	/*$(".createRoom").attr("action","/guess?id="+id_rly);
		    	Router.go('guess', {query: 'q=s'});*/

		    	window.location.href = "/guess/"+id_rly;

		    	//Router.go('guess', {query: 'id='+id_rly});

	    		/*Session.set("id_room",id_rly);
	    		Router.go('guess');*/
	    	}

	    	else if( max_player > trenutno_player)
	    	{
	    		Rooms.update({_id: id_rly}, {$addToSet: {player_ids: Meteor.userId()}});
	    		Rooms.update({_id: id_rly}, {$push: {player_points: [0]}});

	    		Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.in_game": true}});

	    		Session.set("id_room",id_rly);
		    	/*$(".createRoom").attr("action","/guess/"+id_rly);
		    	Router.go('guess', {query: 'q=s'});*/

		    	//Router.go('guess', {query: 'id='+id_rly});

		    	window.location.href = "/guess/"+id_rly;

	    		/*Session.set("id_room",id_rly);
	    		Router.go('guess');*/
	    	}
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
		},

		id_room_rly: function(){
			return id_rly_1;
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
		 },

	  	getCountdown: function(){
			return countdown.get();
		},

		playersInfoInRoom: function(){
			var jsonObj = [];

			var allUsersInRoom = Rooms.findOne({_id: Session.get("id_room_url")});

			for(var j = 0; j < allUsersInRoom.player_ids.length; j++)
			{
				var item = {};

				var usersInfo = Meteor.users.findOne({_id: allUsersInRoom.player_ids[j]});

				item["username"] = usersInfo.username;
		        item["image"] = usersInfo.profile.avatar;
		        item["points"] = allUsersInRoom.player_points[j];

		        jsonObj.push(item);

				//string += {username: usersInfo.username, image: usersInfo.profile.avatar, points: allUsersInRoom.player_points[j]};

			}
			//var dasdasasd = JSON.parse[string];

			return jsonObj;

			//return JSON.parse[string];
		},

		test: function(){

			if(Meteor.userId() != Session.get("drawIdPlayer") || Session.get("firstTimeOnSite") == 0)
	    	{
	    		var p = Session.get("numberOfPoints");

				var query = Rooms.findOne({_id: Session.get("id_room_url")});

				var boja;

				for( p; p < query.pointsArray.length; p++ )
		    	{
		    		switch(query.pointsArray[p])
		    		{
		    			case 0:
		    				boja = query.pointsArray[++p];
		    			break;

		    			case 1:

		    			break;

		    			case 2:
		    				ctx.beginPath();
		    				ctx.moveTo(query.pointsArray[p - 2],query.pointsArray[p - 1]);
		    				ctx.lineTo(query.pointsArray[++p],query.pointsArray[++p]);
		    				ctx.lineWidth = y;
		    				ctx.strokeStyle = boja;		
			       			ctx.stroke();
		    				ctx.closePath();
		    			break;

		    			case 3:
		    				ctx.beginPath();
		    				ctx.strokeStyle = boja;
		    				ctx.fillRect(query.pointsArray[++p],query.pointsArray[++p],2,2);		    							
		    				ctx.closePath();
		    			break;
		    		}
		    		/*ctx.beginPath();	
			        ctx.moveTo(query.pointsArray[p], query.pointsArray[p + 1]);		
			        ctx.lineTo(query.pointsArray[p + 2], query.pointsArray[p + 3]);*/

		    	}

		    	Session.set("numberOfPoints", query.pointsArray.length);

		    	Session.set("firstTimeOnSite",1);
		    }

			return true;
		},

		keyWord: function(){

			var keyWord = "";

			if(Meteor.userId() == Session.get("drawIdPlayer"))
			{
				keyWord = "Nova rec";
			}

			return keyWord;
		}
	});
		
	Template.guess.rendered = function() {		
	    if(!this._rendered) {		
	      this._rendered = true;		
	      console.log('Template onLoad');		
	      init();		
	    }		
	}

	/*Template.guess.helpers({
		test: function
	});*/

	Template.guess.events({

		'click #start': function(event){

			countdown.start(function() {

	    // radi nesto kad se zavrsi
	    		clearInterval();
			});

		},

		'click #penred': function(event)
		{
			var pen = document.getElementById("can");
 			pen.style.cursor = "url('/room/red.cur'), auto"
 			x="red";
 			arrya_points_draw.push(0);//naredba za boju
	        arrya_points_draw.push(x);

		},

		'click #penblue': function(event)
		{
			var pen = document.getElementById("can");
 			pen.style.cursor = "url('/room/blue.cur'), auto"
 			x="blue";
 			arrya_points_draw.push(0);//naredba za boju
	        arrya_points_draw.push(x);

		},

		'click #penyellow': function(event)
		{
			var pen = document.getElementById("can");
 			pen.style.cursor = "url('/room/yellow.cur'), auto"
 			x="yellow";
 			arrya_points_draw.push(0);//naredba za boju
	        arrya_points_draw.push(x);

		}
		,

		'click #pengreen': function(event)
		{
			var pen = document.getElementById("can");
 			pen.style.cursor = "url('/room/green.cur'), auto";
 			x="green";
 			arrya_points_draw.push(0);//naredba za boju
	        arrya_points_draw.push(x);

		},

		'click #penblack': function(event)
		{
			var pen = document.getElementById("can");
 			pen.style.cursor = "url('/room/black.cur'), auto";
 			x="black";
 			arrya_points_draw.push(0);//naredba za boju
	        arrya_points_draw.push(x);

		},

		'click #eraser': function(event)
		{
			var pen = document.getElementById("can");
 			pen.style.cursor = "url('/room/eraser.cur'), auto";
 			x="white";
 			arrya_points_draw.push(0);//naredba za boju
	        arrya_points_draw.push(x);
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

	//-----------------FUNKCIJA ZA CRTANJE---------------------
	    		
	    function init() {		
	        canvas = document.getElementById('can');		
	        canvas1 = $( "#can" );		
	        ctx = canvas.getContext("2d");		
	        w = canvas.width;		
	        h = canvas.height;		

	        
			
	        position =  canvas1.offset();		
			
	    	if(Meteor.userId() == Session.get("drawIdPlayer"))
	    	{	
		        canvas.addEventListener("mousemove", function (event) {		
		            findxy('move', event)		
		        }, false);		
		        canvas.addEventListener("mousedown", function (event) {		
		            findxy('down', event)		
		        }, false);		
		        canvas.addEventListener("mouseup", function (event) {		
		            findxy('up', event)		
		        }, false);		
		        canvas.addEventListener("mouseout", function (event) {		
		            findxy('out', event)		
		        }, false);		
		    }

		    	if(Session.get("firstTimeOnSite") == 0)
		    	{
		    		var p = Session.get("numberOfPoints");

					var query = Rooms.findOne({_id: Session.get("id_room_url")});

					var boja;

					for( p; p < query.pointsArray.length; p++ )
			    	{
			    		switch(query.pointsArray[p])
			    		{
			    			case 0:
			    				boja = query.pointsArray[++p];
			    			break;

			    			case 1:

			    			break;

			    			case 2:
			    				ctx.beginPath();
			    				ctx.moveTo(query.pointsArray[p - 2],query.pointsArray[p - 1]);
			    				ctx.lineTo(query.pointsArray[++p],query.pointsArray[++p]);
			    				ctx.lineWidth = y;
			    				ctx.strokeStyle = boja;		
				       			ctx.stroke();
			    				ctx.closePath();
			    			break;

			    			case 3:
			    				ctx.beginPath();
			    				ctx.strokeStyle = boja;
			    				ctx.fillRect(query.pointsArray[++p],query.pointsArray[++p],2,2);		    							
			    				ctx.closePath();
			    			break;
			    		}
			    		/*ctx.beginPath();	
				        ctx.moveTo(query.pointsArray[p], query.pointsArray[p + 1]);		
				        ctx.lineTo(query.pointsArray[p + 2], query.pointsArray[p + 3]);*/

			    	}

			    	Session.set("numberOfPoints", query.pointsArray.length);

			    	Session.set("firstTimeOnSite",1);
		    	
		    	/*var arrya_points = Rooms.findOne({_id: Session.get("id_room_url")});

		    	for(var p = 0; p < arrya_points.pointsArray.length; p = p + 4 )
		    	{
		    		ctx.beginPath();
		    		console.log(arrya_points.pointsArray[p]);		
			        ctx.moveTo(arrya_points.pointsArray[p], arrya_points.pointsArray[p + 1]);		
			        ctx.lineTo(arrya_points.pointsArray[p + 2], arrya_points.pointsArray[p + 3]);

			        ctx.strokeStyle = x;		
			        ctx.lineWidth = y;		
			        ctx.stroke();		
			        ctx.closePath();	
		    	}*/
		    }
	    }		
	
	    		
	    function draw() {		
	        ctx.beginPath();		
	        ctx.moveTo(prevX, prevY);		
	        ctx.lineTo(currX, currY);

	        ctx.strokeStyle = x;		
	        ctx.lineWidth = y;		
	        ctx.stroke();		
	        ctx.closePath();		
	    }		
	    		
	    function erase() {		
	        var m = confirm("Want to clear");		
	        if (m) {		
	            ctx.clearRect(0, 0, w, h);		
	            document.getElementById("canvasimg").style.display = "none";		
	        }		
	    }		
	    		
	    function save() {		
	        document.getElementById("canvasimg").style.border = "2px solid";		
	        var dataURL = canvas.toDataURL();		
	        document.getElementById("canvasimg").src = dataURL;		
	        document.getElementById("canvasimg").style.display = "inline";		
	    }		
	    		
	    function findxy(res, e) {		
	        if (res == 'down') {
	        	interval = setInterval(insertPointsInToDB(), 100);
	            prevX = currX;		
	            prevY = currY;		
	            currX = e.clientX - position.left;		
	            currY = e.clientY - position.top;		
	    		
	            flag = true;		
	            dot_flag = true;		
	            if (dot_flag) {		
	                ctx.beginPath();		
	                ctx.fillStyle = x;		
	                ctx.fillRect(currX, currY, 2, 2);		
	                ctx.closePath();		
	                dot_flag = false;

	                //Dot
	                arrya_points_draw.push(3);
	                arrya_points_draw.push(currX);
	                arrya_points_draw.push(currY);

	                //Rooms.update({_id: Session.get("id_room_url")}, {$set: {pointsArray: [currX,currY,2,2]}});
	                //Rooms.update({ _id: Session.get("id_room_url") },{ $push: { pointsArray: { $each: [ currX, currY, 2, 2 ] } } });
	            }		
	        }		
	        if (res == 'up' || res == "out") {		
	            flag = false;
	            clearInterval(interval);
	            insertPointsInToDB();		
	        }		
	        if (res == 'move') {		
	            if (flag) {		
	                prevX = currX;		
	                prevY = currY;		
	                currX = e.clientX - position.left;		
	                currY = e.clientY - position.top;

	                //LineTo
	                arrya_points_draw.push(2);
	                arrya_points_draw.push(currX);
	                arrya_points_draw.push(currY);

	                //Rooms.update({ _id: Session.get("id_room_url") },{ $push: { pointsArray: { $each: [ prevX, prevY, currX, currY ] } } });
	                //Rooms.update({_id: Session.get("id_room_url")}, {$set: {pointsArray: [prevX,prevY,currX,currY]}});		
	                draw();		
	            }		
	        }		
	    }

	    function insertPointsInToDB()
	    {
	    	Rooms.update({ _id: Session.get("id_room_url") },{ $push: { pointsArray: { $each: arrya_points_draw } } });
	    	arrya_points = [];
	    }

//------------------------------END---------------------------------------

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
	timer = document.querySelector('timeout'),

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
	   //timer.setAttribute('style', 'color: yellow;');
	}

	//izmedju druge i trece, pravi trecu cetvrtinu
	else if (progress > secnd && progress <= thirdquad) {
	  quad1.setAttribute('style', 'transform: skew(-90deg)'); // krije prvi luk
	  quad2.setAttribute('style', 'transform: skewY(90deg)'); // krije drugi luk
	  quad3.setAttribute('style', 'transform: skew(' + (progress - secnd) * (-90 / firstquad) + 'deg)'); // iscrtava treci
	  progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 20px orange');
	 // timer.setAttribute('style', 'color: orange;');
	}

	//izmedju trece i cetvrte, pravi cetvrtu cetvrtinu
	else if (progress > thirdquad && progress <= maxcounter) {
	  quad1.setAttribute('style', 'transform: skew(-90deg)'); // krije prvi luk
	  quad2.setAttribute('style', 'transform: skewY(90deg)'); // krije drugi luk
	  quad3.setAttribute('style', 'transform: skew(-90deg)'); // krije treci luk
	  quad4.setAttribute('style', 'transform: skewY(' + (progress - thirdquad) * (90 / firstquad) + 'deg)'); //iscrtava cetvrti
	  progressbar.setAttribute('style', 'box-shadow: inset 0px 0px 0px 20px red');
	//  timer.setAttribute('style', 'color: red;');
	}
	}


};

if(Meteor.isServer)
{
	streamer.allowRead('all');
    streamer.allowWrite('all');

    
}


