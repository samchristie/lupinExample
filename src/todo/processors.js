// TodoProcessor definition.
// In a larger module, these processor definigions might be in multiple files.

'use strict';
import Immutable from 'immutable';

import { todo, TODO_STATE } from './model'; // module specific data model

export function addProcessor( state, signal) {
  // process the add state
  var t = todo(signal.title, signal.description)  // create new todo
  state = state.setIn(
    // find the todo list in the state and set the key
    [ TODO_STATE, t.get('id') ], 
    // insert the new todo instance from the signal
    t  
  );
  return { state }
}

export function toggleProcessor( state, signal) {
  // find the right todo in state and flip its done status
  state = state.updateIn( [ TODO_STATE, signal.key, "done"], done => !done);
  return { state }
}

export function clearProcessor( state, signal) {
  // remove the todos that are flagged as done
  state = state.update( TODO_STATE, 
    todos => todos.filterNot( todo => todo.get('done')));
  return { state };
}

export function initProcessor( state, signal) {
  // load stored todos or other startup step 

  // initialize the core store for this module's model
  // this should be part of "register" up in lupin
  state = state.set( TODO_STATE, Immutable.Map());
  return { state };
}
