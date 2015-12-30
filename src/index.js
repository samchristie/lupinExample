/*
 Simple Todo app leveraging riot, lupin and Immutable
 */
'use strict';

// riot provides the light weight means to implement MVVM and custom tags.
import Riot from 'riot';

//lupin provides a simple event/state distribution subsystem
import { lupin, logPuter } from 'lupin';

//using immutable so that we can easily compare
//versions of the objects so we can optimize UI updates 
//and can support undo operations.
import Immutable from 'immutable';  



// load the modules of the application
//This todo application is a bit more complex than necessary so you 
//can scale the example into a more substantial application
//This example is defined in modules - but there is only one module

import * as todo from './todo/module';


//Create the event dispatcher - state manager instance
let core = lupin( )
//generate easy console handles for debug of each event, use default logger
core.logSubscribe( logPuter)
todo.init( core);

//generate easy console handles for debug of the state on every state change
core.observe( [], ( state) =>  console.log( "main state observer:", state) );


