/*
	This file defines the module specific events 
   
	The events in this application are scoped by module "Todo:" to avoid
	name conflicts between modules. The namespace is shared between all modules
	in your application. The variable names you use to hold them are not exposed outside
	the module.

*/

export const ADD_TODO = 'Todo:Add'; // includes a full todo instance
export const TOGGLE_TODO = 'Todo:Toggle' // includes the index of the todo instance
export const CLEAR_TODOS = 'Todo:Clear' // no parameters
export const INIT_TODOS = 'Todo:Init' // no parameters

// define the functions for creating each event type for the module
export function addTodo( todo) { return { type: ADD_TODO, todo }; }
export function toggleTodo( key) { return { type: TOGGLE_TODO, key }; }
export function clearTodos( ) { return { type: CLEAR_TODOS }; }
export function initTodos( ) { return { type: INIT_TODOS }; }
