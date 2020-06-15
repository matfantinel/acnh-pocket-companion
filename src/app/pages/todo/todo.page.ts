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

  doneTodoItems$: Observable<TodoItem[]>;
  notDoneTodoItems$: Observable<TodoItem[]>;

  saveTimers: any[] = [];

  constructor(public utils: Utils, private platform: Platform, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodoItems());
    this.doneTodoItems$ = this.store.pipe(select(selectDoneTodoItems));
    this.notDoneTodoItems$ = this.store.pipe(select(selectNotDoneTodoItems));
  }

  ionViewDidEnter() {
    if (this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: '#FFC9D3' });
    }
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
