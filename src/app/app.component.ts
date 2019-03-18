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

  modelAuthor:author = {
    knree: "phu",
    name: "Nguyen"
  }

  // tạo trong 1 collection bình thường
  create() {
    this.collectionData.add(this.model)
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  // tạo trong 1 subcollection
  // thì theo quy luật, muốn tạo được cái subcollection thì phải vào bên trong document chứa nó rồi hãy add
  createSubcollection(){
    this.collectionData.doc('d2yJ5AAMRRpI3XNLnWjp').collection('performer').add(this.modelAuthor)
        .then(function(){
          console.log("Document successfully written!");
        })
        .catch(function(error){
          console.log("Error writing document: ", error);
        })
  }
  get(){
    this.collectionData = this.db.collection('songs').doc('d2yJ5AAMRRpI3XNLnWjp').collection('performer');
    this.collectionData.valueChanges().subscribe((res) => {
      if(res){
        console.log(res);
      }
    }, (err) =>{
      console.log("error");
    });
  }

  getSubcollection(){
    this.documentData = this.db.collection('songs').doc('6FEt28GOG8vseMJ4cAox').collection('author').doc('2SlTN8MCzrRtV9Xr4XOY');
    this.documentData.valueChanges().subscribe((res) => {
      if(res){
        
        console.log(res);
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
    this.db.collection('songs').doc('d2yJ5AAMRRpI3XNLnWjp').delete().then(() =>{
      console.log("Delete Success");
    }).catch(() => {
      console.log("Error");
    });
    this.get();
  }
  deleteSubcollection(){
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
export interface author{
  knree: string,
  name: string,
}
