//This todo application is a bit more complex than necessary so you 
//can scale the example into a more substantial application
//This example is defined in modules - but there is only one module

import Immutable from 'immutable';
import Riot from 'riot';
import { Lupin } from 'lupin'


import { ModuleName, TODO_STATE } from './model';  // MVVM Model
import * as procs from './processors'; 
import './tags.js';  // MVVM View

// define the functions for creating each command for the module
export var addTodo, toggleTodo, clearTodos, initTodos;


export function init( core) {
  // set up the command processors for the module
  core.module( ModuleName)  // optional unless you need to specify postprocessor or catcher

  // these should be declared in approximate order of frequency for efficiency
  // set up toggleTodo( key=todo.id)
  toggleTodo = core.command( [ ModuleName, "Toggle"], procs.toggleProcessor); 
  // set up addTodo( todoTitle, todoDescription)
  addTodo = core.command( [ ModuleName, "Add"], procs.addProcessor );
  clearTodos = core.command( [ ModuleName, "Clear"], procs.clearProcessor ); // clearTodos() takes no parameters
  initTodos = core.command( [ ModuleName, "Init"], procs.initProcessor); // initTodos() takes no parameters

  // enable riot for the todo module by mounting the top level tag
  Riot.mount('todo-app', {core});
}


