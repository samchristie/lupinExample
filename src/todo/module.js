//This todo application is a bit more complex than necessary so you 
//can scale the example into a more substantial application
//This example is defined in modules - but there is only one module

import Immutable from 'immutable';
import Riot from 'riot';


import TODO_STATE from './model';
import processor from './processor.js';
import './tags.js';

export function init( core) {
  // set ToDoProcessor to recieve all events
  // should lupin support subscriptions on a event basis ?
  core.register( processor);

  // enable riot for the todo module by mounting the top level tag
  Riot.mount('todo-app', {core});
}


