/* 
	This file defines the module specific  objects which will be stored in the
	application state. These objects and collections should all be immutable.
   
*/

// Use immutable from facebook to manage state objects
import Immutable from 'immutable';

// define the module name
export const ModuleName = "ToDo";

// define the label for all application state from this module
export const TODO_STATE = "ToDos"; 

// create the objects for the module
export function todo(title, description) {

  // create a "unique tag" for each task. Lots of other ways to do this
  function guid() { 
	function S4() {
		// create a substring filled with random characters
    	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}

	// then to call it, plus stitch in '4' in the third group
	return (S4() + S4() + "-" + S4() + "-4" + 
		S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  }

  return Immutable.fromJS( {
    id: guid(),
	title,
	description,
	done: false
  })
} 
