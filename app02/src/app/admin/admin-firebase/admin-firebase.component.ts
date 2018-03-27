import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/item';

// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-firebase',
  templateUrl: './admin-firebase.component.html',
  styleUrls: ['./admin-firebase.component.css']
})
export class AdminFirebaseComponent implements OnInit {

  user: Observable<firebase.User>;
  items: AngularFireList<Item>;
  itemList: Observable<Item[]>;
  msgVal: string;
  hiddenForm: true;
  hideenTable: false;

  constructor(public angularFireAuth: AngularFireAuth, public angularFireDatabase: AngularFireDatabase) {
    this.user = angularFireAuth.authState;
    this.items = angularFireDatabase.list('items');
    this.itemList = angularFireDatabase.list<Item>('items').valueChanges();
    this.msgVal = '';
  }

  ngOnInit() {
     // Actualiza la barra latera y el footer
    AdminLTE.init();
  }

  login() {
    this.angularFireAuth.auth.signInAnonymously();
    console.log(this.user);
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  Send(desc: any) {
    const booking = new Item(desc);
    this.items.push(booking);
  }

}
