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
import { Observable } from 'rxjs';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  doneTodoItems: TodoItem[];
  notDoneTodoItems: TodoItem[];

  saveTimers: any[] = [];

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
    const notDone$ = this.store.select(selectNotDoneTodoItems).subscribe(
      result => {
        if (result) {
          this.notDoneTodoItems = result;
          notDone$.unsubscribe();
        } else {
          this.notDoneTodoItems = [];
        }
      }
    );

    const done$ = this.store.select(selectDoneTodoItems).subscribe(
      result => {
        if (result) {
          this.doneTodoItems = result;
          done$.unsubscribe();
        } else {
          this.doneTodoItems = [];
        }
      }
    );
  }

  toggleDone(item: TodoItem) {
    item.done = !item.done;

    const timer = setTimeout(() => {
      if (this.saveTimers.filter(q => q.id === item.id).length === 1) {
        this.saveTodoItem(item);
      }
      this.saveTimers.splice(this.saveTimers.indexOf(timer), 1);
    }, 2000);

    this.saveTimers.push({ id: item.id, timer });
  }

  saveTodoItem(newItem: TodoItem) {
    this.store.dispatch(new UpsertTodoItem({ data: newItem }));
  }

  deleteTodoItem(item: TodoItem) {
    this.store.dispatch(new DeleteTodoItem({ data: item }));
  }
}
