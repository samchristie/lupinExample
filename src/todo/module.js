//This todo application is a bit more complex than necessary so you 
//can scale the example into a more substantial application
//This example is defined in modules - but there is only one module

import Immutable from 'immutable';
import Riot from 'riot';


import TODO_STATE from './model';  // MVVM Model
import * as procs from './processors'; 
import './tags.js';  // MVVM View

const TODO_COMMANDS = "ToDo";
// define the functions for creating each command for the module
export var addTodo, toggleTodo, clearTodos, initTodos;


export function init( core) {
  // set up the command processors for the module
  // set up addTodo( todoTitle, todoDescription)
  addTodo = core.command( [TODO_COMMANDS, "Add"], procs.addProcessor, "title", "description" );
  // set up toggleTodo( key=todo.id)
  toggleTodo = core.command( [TODO_COMMANDS, "Toggle"], procs.toggleProcessor, "key"); 
  clearTodos = core.command( [TODO_COMMANDS, "Clear"], procs.clearProcessor ); // clearTodos() takes no parameters
  initTodos = core.command( [TODO_COMMANDS, "Init"], procs.initProcessor); // initTodos() takes no parameters

  // enable riot for the todo module by mounting the top level tag
  Riot.mount('todo-app', {core});
}


