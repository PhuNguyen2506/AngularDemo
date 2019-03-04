import { Component } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  music: any[];
  title = 'Phu Nguyen Ho Ngoc';
  music$: AngularFireList<any>;
  musicForobject: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {
    db.list('/Music/Music/5').valueChanges().subscribe(music => {
      this.music = music;
      console.log(this.music);
    });
  }
  create() {
    var ex = {
      "9" : {
        "Author" : 'Dinh Tien Hoan',
        "Date" : '11/11/2011',
        "Name Song" : 'Bla Bla Bla'
      }
    };
    //this.db.object('/Music').update(ex);
    this.music.push(ex);
    console.log(this.music);
    this.db.object('/Music/Music/5/9').update({'Author': 'Peter Parker'});
  }
}
