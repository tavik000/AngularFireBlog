import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdService } from '../ad.service';
// import { AllComment } from '../app.module';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Input } from '@angular/core'
import { Post } from '../app.component';

export interface AllComment {
  author: string;
  body: string;

}


@Component({
  selector: 'app-ad-listing',
  templateUrl: './ad-listing.component.html',
  styleUrls: [
  './ad-listing.component.css',
  '../public/stylesheets/bootstrap.css',
  '../public/stylesheets/style.css',
  '../public/stylesheets/blogStyle.css']
})

export class CommentComponent {

  @Input() selectedPost: Post;
  // showFieldState
  @Input() showFieldState: '';

  name = '';
  comment = '';
  docID = "";
  docPath = "";

  cmtCollectionRef;
  // cmt$: Observable<AllComment[]>;
  cmt$: AllComment[];
  AFS: AngularFirestore;
  private postDoc: AngularFirestoreDocument<Post>;
  postItem: Observable<Post>;

  // Get each comment
  // cat$: BehaviorSubject<string|null>;

  constructor(private afs: AngularFirestore) {
    this.AFS = afs;

    let userDoc = this.AFS.firestore.collection('post');
    // this.cat$ = new BehaviorSubject(null);


    userDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.docID = doc.id;
        this.docPath = "post/" + this.docID;

        if (doc.data().title == this.selectedPost.title) {
          // console.log('test');
          this.cmtCollectionRef = userDoc.doc(this.docID).collection('comments');
          this.cmt$ = this.cmtCollectionRef.get().then(function(querySnapshot) {
            var allCmt = querySnapshot.docs.map(function (documentSnapshot) {
              return documentSnapshot.data();
            });
            return allCmt;
          });
        }
      })
    });
  }


  addCmt() {


    // Add comment to sub-collection

    let docID = "";
    let docPath = "";
    // let updatePost = {};
    let tempName:string = this.name;
    let tempComment:string = this.comment;
    this.name = '';
    this.comment = '';

    let userDoc = this.AFS.firestore.collection('post');

    userDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docID = doc.id;
        docPath = "post/" + docID;
        this.postDoc = this.AFS.doc<Post>(docPath);
        this.postItem = this.postDoc.valueChanges();
        if (doc.data().title == this.selectedPost.title) {
          let newComment = {
            name: tempName,
            comment: tempComment
          };
        userDoc.doc(docID).collection('comments').add(newComment);

        }
      })
    });


    let updatePost:any;
    
    // Comment Count +1
    
    userDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docID = doc.id;
        docPath = "post/" + docID;
        this.postDoc = this.AFS.doc<Post>(docPath);
        this.postItem = this.postDoc.valueChanges();
        if (doc.data().title == this.selectedPost.title) {
          updatePost = {
            title: this.selectedPost.title,
            author: this.selectedPost.author,
            body: this.selectedPost.body,
            category: this.selectedPost.category,
            createDate: this.selectedPost.createDate,
            likes: this.selectedPost.likes,
            commentCount: this.selectedPost.commentCount + 1,
            image: this.selectedPost.image,
          };
          this.postDoc.update(updatePost);
        }
      })
    })


    // Refresh Comment in the post, get the comment from firestore

    userDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.docID = doc.id;
        this.docPath = "post/" + this.docID;

        if (doc.data().title == this.selectedPost.title) {
          // console.log('test');
          this.cmtCollectionRef = userDoc.doc(this.docID).collection('comments');
          this.cmt$ = this.cmtCollectionRef.get().then(function(querySnapshot) {
            var allCmt = querySnapshot.docs.map(function (documentSnapshot) {
              return documentSnapshot.data();
            });
            return allCmt;
          });
        }
      })
    });

    this.showFieldState = '';
  }
  




}

