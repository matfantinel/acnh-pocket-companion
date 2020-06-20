import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import {
  Plugins
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AppState } from 'src/app/app.state';
import { Store, select } from '@ngrx/store';
import { LoadTodoItems, UpsertTodoItem, DeleteTodoItem } from 'src/app/domains/todo/todo.actions';
import { TodoItem } from 'src/app/domains/todo/todo.model';
import { selectDoneTodoItems, selectNotDoneTodoItems } from 'src/app/domains/todo/todo.reducer';
import { Observable, Subscription } from 'rxjs';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  doneTodoItems: TodoItem[];
  notDoneTodoItems: TodoItem[];

  done$: Subscription;
  notDone$: Subscription;

  constructor(public utils: Utils, private platform: Platform, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodoItems());
    this.loadTodoItems();
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#FFC9D3' });
    }
  }

  loadTodoItems() {
    this.notDone$ = this.store.select(selectNotDoneTodoItems).subscribe(
      result => {
        if (result) {
          this.notDoneTodoItems = result;
          if (this.notDone$) {
            this.notDone$.unsubscribe();
          }
        } else {
          this.notDoneTodoItems = [];
        }
      }
    );

    this.done$ = this.store.select(selectDoneTodoItems).subscribe(
      result => {
        if (result) {
          this.doneTodoItems = result;
          if (this.done$) {
            this.done$.unsubscribe();
          }
        } else {
          this.doneTodoItems = [];
        }
      }
    );
  }

  toggleDone(item: TodoItem) {
    item.done = !item.done;

    setTimeout(() => {
      this.saveTodoItem(item, true);
    }, 500);
  }

  saveTodoItem(newItem: TodoItem, doneToggled?: boolean, reloadAfterSave?: boolean) {
    this.store.dispatch(new UpsertTodoItem({ data: { ...newItem } }));

    if (doneToggled) {
      if (newItem.done) {
        this.doneTodoItems.push(newItem);
        this.notDoneTodoItems.splice(this.notDoneTodoItems.indexOf(newItem), 1);
      } else {
        this.notDoneTodoItems.push(newItem);
        this.doneTodoItems.splice(this.doneTodoItems.indexOf(newItem), 1);
      }
    }

    if (reloadAfterSave) {
      setTimeout(() => {
        this.loadTodoItems();
      }, 100);  
    }
  }

  deleteTodoItem(item: TodoItem) {
    this.store.dispatch(new DeleteTodoItem({ data: item }));

    setTimeout(() => {
      this.loadTodoItems();
    }, 100);
  }

  addTodoItem() {
    this.notDoneTodoItems.push(new TodoItem());

    setTimeout(() => {
      // Focus on the new input field
      document.getElementById(`notDoneItem-${this.notDoneTodoItems.length - 1}`)
        .getElementsByTagName('ion-input')[0]
        .getElementsByTagName('input')[0].focus();
    }, 100);
  }
}
