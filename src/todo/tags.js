"use strict";

import riot from 'riot';
import Lupin from 'lupin';
import Immutable from 'immutable';

// module specific imports
import * as cmds from './module';
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
    this.on('mount', () => cmds.initTodos());
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
        cmds.addTodo( this.todoTitle.value, this.todoDescription.value);
        // now clear the user's input
        this.todoTitle.value = '';
        this.todoDescription.value = '';
      }
    };

    this.clear = cmds.clearTodos;
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
    this.todoMap = null;

    // debug log to see if we get what we want
    this.opts.core.observe( TODO_STATE, (state) => {
        this.todoMap = state;
        // tell riot to update the view
        console.log( "todo-list observer: ", state)
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
    this.toggle = () => cmds.toggleTodo(opts.todo.id);
  }
);
