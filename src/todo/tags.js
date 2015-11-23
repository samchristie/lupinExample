import riot from 'riot';
import Lupin from 'lupin';
import * as events from './signals';
import Immutable from 'immutable';
import { todo, TODO_STATE } from './model';

riot.tag('todo-app',

  `<h3>Todos</h3>
   <todo-form core="{opts.core}"></todo-form>
   <todo-list core="{opts.core}"></todo-list>
   <p>
     Want a second fully synchronized list? Just declare another list component:
     no code required, no events to wire up!
   </p>
   <todo-list core="{opts.core}"></todo-list>`,

  function(opts) {
    // set up the todo list once the form has been mounted
    this.on('mount', () => this.opts.core.signals.push( events.initTodos()));
  }

);


riot.tag('todo-form',

  `<input id="todoTitle" type="text" placeholder="New Todo Title" autofocus="true">
   <input id="todoDescription" type="text" placeholder="Description">
   <button onclick="{add}">Add ToDo</button>
   <button onclick="{clear}">Clear Completed</button>`,

  function(opts) {
    let core = this.opts.core;

    this.add = (e) => {
      // handle the user click on the add button
      if (this.todoTitle.value) {
        core.signals.push( // raise an event to update the model state
          events.addTodo( // create the event
            // this event needs a new todo instance
            todo( this.todoTitle.value, this.todoDescription.value)
          )
        );
        // now clear the user's input
        this.todoTitle.value = '';
        this.todoDescription.value = '';
      }
    };

    this.clear = (e) => {
      // handle the user click on the clear button
      // create the clear event and raise it
      core.signals.push( events.clearTodos() );
    };
  }

);


riot.tag('todo-list',

  `<ul>
     <li each="{todo in todoMap.toArray()}">
       <todo-item core="{parent.opts.core}" todo="{todo.toObject()}">
     </li>
   </ul>`,

  function(opts) {
    // initialise the shadow DOM viewmodel to empty.
    if( !("todoMap" in this) ) this.todoMap = null;

    // subscribe to changes in the relevant state
    this.opts.core.state.observe( (state) => { 
      // on each change, update the viewmodel content
      // get the todo module state if it exists
      var tmp = state.get( TODO_STATE);

      if( tmp !== undefined && // the todo state has been established
          this.todoMap !== tmp) { // the state is not the same as last time
        // attach the immutalbe map to the list
        this.todoMap = tmp;
        // tell riot to update the view
        this.update();
      }
    })
  }

);


riot.tag('todo-item',

  `<span class="{done: opts.todo.done}" onclick="{toggle}">
     {opts.todo.title} - {opts.todo.description}
   </span>`,

  function(opts) {
    // handle clicks on tasks 
    this.toggle = () => {
      // raise the toggle event
      this.opts.core.signals.push( 
        // create the toggle event with the id of the clicked task
        events.toggleTodo( this.todo.toObject().id) 
      );
    }
  }

);
