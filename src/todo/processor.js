// TodoProcessor definition.
// The processor implements the application logic by responding to 
// relevant events emitted via the Lupin.

'use strict';
import Immutable from 'immutable';
import * as events from './signals';  // module specific events
import { todo, TODO_STATE } from './model'; // module specific data model


export default function processor( state, signal) {
  // this is a single event processor for the entire module. Multiple processors
  // could be used to segregate functions
  switch (signal.type) {
    case events.ADD_TODO:
      state = state.setIn(
        // find the todo list in the state and set the key
        [ TODO_STATE, signal.todo.toJS().id ], 
        // insert the new todo instance from the signal
        signal.todo 
      );
      break;

    case events.TOGGLE_TODO:
      // find the right todo in state and flip its done status
      state = state.updateIn( [ TODO_STATE, signal.key, "done"], done => !done);
      break;

    case events.CLEAR_TODOS:
      // remove the todos that are flagged as done
      state = state.update( TODO_STATE, 
        todos => todos.filterNot( todo => todo.get('done')));

      break;

    case events.INIT_TODOS:
      // load stored todos or other startup step 

      // initialize the core store for this module's model
      // this should be part of "register" up in lupin
      state = state.set( TODO_STATE, Immutable.Map());
      // Lupin should probably manage the state stack     
    break;
  }
  return [state];
}
