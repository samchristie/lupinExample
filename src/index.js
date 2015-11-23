/*
 Simple Todo app leveraging riot, lupin and Immutable
 */
'use strict';

// riot provides the light weight means to implement MVVM and custom tags.
import Riot from 'riot';

//lupin provides a simple event/state distribution subsystem
import Lupin from 'lupin';

//using immutable so that we can easily compare
//versions of the objects so we can optimize UI updates 
//and can support undo operations.
import Immutable from 'immutable';  

//Create the event dispatcher - state manager instance
// this should be part of lupin
let core = Lupin( Immutable.Map());

//generate easy console handles for debug of each event
core.signals.observe(console.log.bind(console));

//generate easy console handles for debug of the state on every state change
core.state.observe(console.log.bind(console));

// load the modules of the application
//This todo application is a bit more complex than necessary so you 
//can scale the example into a more substantial application
//This example is defined in modules - but there is only one module

import * as todo from './todo/module';
todo.init( core);

