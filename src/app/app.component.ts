import { Component } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2'
import {Observable} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public song: Observable<any[]>;
  title = 'Phu Nguyen Ho Ngoc';
  listSong: Song[] = [];
  newData: Song;
  documentData: AngularFirestoreDocument<Song>;
  collectionData: AngularFirestoreCollection<Song>;
  newName = "Ma na";
  constructor(private db: AngularFirestore) {
    // get list
    this.song = db.collection('/songs').valueChanges();
    this.collectionData = db.collection<Song>('songs');
  }
  model:Song = {
    author: "Captain America",
    name: "Live Angeles",
    id: "5",
    publish: "02/02/2014"
  };
  create() {
    this.collectionData.add(this.model)
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  get(){
    this.collectionData = this.db.collection('songs');
    this.collectionData.valueChanges().subscribe((res) => {
      if(res){
        res.forEach((e) => {
          this.listSong.push(e);
        })
        console.log(this.listSong);
      }
    }, (err) =>{
      console.log("error");
    });
  }
  update(){
    this.documentData = this.db.doc('songs/JlE2MyLgpyz89QscSbVm');
    this.documentData.update({name: this.newName});

    // get lấy giá trị của song vừa mới update
    this.documentData.valueChanges().subscribe((res) => {
      if(res){
        this.newData = res;
        console.log("Success");
      }
    }, (err) =>{
      console.log("Error");
    })
  }
  delete(){
    this.db.collection('songs').doc('JlE2MyLgpyz89QscSbVm').delete().then(() =>{
      console.log("Delete Success");
    }).catch(() => {
      console.log("Error");
    });
    this.get();
  }
}
export interface Song{
  author: string,
  name: string,
  id:string,
  publish: string
}
