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
})