import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


import './main.html';

Router.route('/register',{
	name: 'register'
});

Router.route('/', {
	name: 'home',
	template: 'home'
});
Router.configure({
	layoutTemplate: 'main'
});
Router.route('/forgot',{
  name: 'forgot'
});
Router.route('/loby',{
	name: 'loby'
});

if(Meteor.isClient)
{
	Template.register.events({
	    'submit .registerForm': function(event){
	        event.preventDefault();
	        var email = event.target.email.value;
	        var password = event.target.password.value;

	        Accounts.createUser({
	            email: email,
	            password: password
	        });      
	    }
	});
}

if(Meteor.isServer)
{

}