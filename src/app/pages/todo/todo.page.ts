import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/utils';
import {
  Plugins
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AppState } from 'src/app/app.state';
import { Store, select } from '@ngrx/store';
import { LoadTodoItems, UpsertTodoItem, DeleteTodoItem, BulkUpsertTodoItem } from 'src/app/domains/todo/todo.actions';
import { TodoItem } from 'src/app/domains/todo/todo.model';
import { selectDoneTodoItems, selectNotDoneTodoItems, selectLastUpsertedItem } from 'src/app/domains/todo/todo.reducer';
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
  lastUpserted$: Subscription;

  showCompleted: boolean;
  renderCompleted: boolean;

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

    // This observable checks for any upserts to items, allowing the page to refresh data without
    // having to re-render all list items
    this.lastUpserted$ = this.store.select(selectLastUpsertedItem).subscribe(
      result => {
        if (result) {
          if (result.done) {
            const existingIndex = this.doneTodoItems.indexOf(this.doneTodoItems.find(q => q.id === result.id || q.text === result.text));
            if (existingIndex >= 0) {
              this.doneTodoItems[existingIndex] = result;
            } else {
              this.doneTodoItems.push(result);
            }
          } else {
            const existingIndex = this.notDoneTodoItems.indexOf(this.notDoneTodoItems.find(q => q.id === result.id || q.text === result.text));
            if (existingIndex < 0) {
              this.notDoneTodoItems.push(result);
            } else if (!this.notDoneTodoItems[existingIndex].id) {
              this.notDoneTodoItems[existingIndex].id = result.id;
            }
          }
          this.sortList();
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

  saveTodoItem(newItem: TodoItem, doneToggled?: boolean) {
    if (!newItem.text) {
      return;
    }

    this.store.dispatch(new UpsertTodoItem({ data: { ...newItem } }));

    if (doneToggled) {
      if (newItem.done) {
        this.notDoneTodoItems.splice(this.notDoneTodoItems.indexOf(newItem), 1);
      } else {
        this.doneTodoItems.splice(this.doneTodoItems.indexOf(newItem), 1);
      }
    }

    this.sortList();
  }

  deleteTodoItem(item: TodoItem) {
    if (item.id) {
      this.store.dispatch(new DeleteTodoItem({ data: item }));

      setTimeout(() => {
        this.loadTodoItems();
      }, 100);
    } else {
      if (item.done) {
        this.doneTodoItems.splice(this.doneTodoItems.indexOf(item), 1);
      } else {
        this.notDoneTodoItems.splice(this.notDoneTodoItems.indexOf(item), 1);
      }
    }
  }

  addTodoItem() {
    this.notDoneTodoItems.push(new TodoItem(this.notDoneTodoItems.length));

    setTimeout(() => {
      // Focus on the new input field
      document.getElementById(`notDoneItem-${this.notDoneTodoItems.length - 1}`)
        .getElementsByTagName('ion-input')[0]
        .getElementsByTagName('input')[0].focus();
    }, 100);
  }

  doReorder(event: any) {
    // Get the item in the origin index, and set its order to the destination index
    this.notDoneTodoItems[event.detail.from].order = event.detail.to;

    // Now we need to get all the indexes between origin and destination
    // And increment or decrement their order

    const incr = event.detail.from < event.detail.to;
    for (
      let i = incr ? (event.detail.from + 1) : (event.detail.from - 1);
      incr ? (i <= event.detail.to) : (i >= event.detail.to);
      incr ? i++ : i--) {
      incr ? this.notDoneTodoItems[i].order = i-1 : this.notDoneTodoItems[i].order = i+1;
    }

    this.sortList();

    // Save the changed items on DB
    this.store.dispatch(new BulkUpsertTodoItem({ data: Utils.deepSpreadArray(this.notDoneTodoItems) }));

    // Complete the event
    event.detail.complete();
  }

  sortList() {
    this.notDoneTodoItems.sort((a, b) => a.order > b.order ? 1 : -1);
  }

  toggleCompletedDisplay() {
    if (!this.renderCompleted) {
      this.renderCompleted = true;
    } else {
      setTimeout(() => {
        this.renderCompleted = false;
      }, 500);
    }

    this.showCompleted = !this.showCompleted;

  }
}
