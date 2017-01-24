import { Template } from 'meteor/templating';

import { TopTen } from '../imports/api/top_10.js';

import { ReactiveVar } from 'meteor/reactive-var';


import './main.html';


var currentUser = Meteor.userId();

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
})

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
}

if(Meteor.isServer)
{

}