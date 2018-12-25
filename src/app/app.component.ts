import { Post } from './app.component';
import { Component, ViewChild, ElementRef, Inject, AfterViewInit, OnInit, } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
// import { DOCUMENT } from '@angular/common'; 
import { switchMap } from 'rxjs/operators';
// import { defineBase } from '@angular/core/src/render3';
import { EditorConfig } from './editor/model/editor-config';
// import { LoginComponent } from './login/login.component';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
// import { CommentComponent } from './ad-listing/ad-listing.component'

import { ModalComponent } from './modal/modal.component';


declare var $:any;

export interface Post{
  title: string;
  author: string;
  body: string;
  category: string;
  createDate: string;
  likes: number;
  commentCount: any;
  image: string;
}


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [
    './public/stylesheets/bootstrap.css',
    './public/stylesheets/style.css',
    './public/stylesheets/blogStyle.css'
  ],
  animations: [
    // For showing the edit and delete animation fade in and fade out
    trigger('popOverState',[
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('200ms ease-in'))
    ])
  ],
})


export class AppComponent {
  // posts: Observable<any[]>;
  // constructor(db: AngularFirestore) {
  //   this.posts = db.collection('post').valueChanges();
  // }

  // User variable
  // user: LoginComponent;
  //user login
  // @ViewChild( LoginComponent ) userLoginComponent: LoginComponent;
  // @ViewChild('childComment') userCommentComponent: CommentComponent;

  @ViewChild('waddleDee') waddleDee: ElementRef;
  @ViewChild('ground') ground: ElementRef;
  @ViewChild('contentHeartElement') contentHeart: ElementRef;
  
  ngAfterViewInit() {

    var dee = this.waddleDee.nativeElement;
    var deeBottom = dee.getBoundingClientRect().height + dee.getBoundingClientRect().top;
    var ground = this.ground.nativeElement;
    var groundPos = ground.getBoundingClientRect().top + window.pageYOffset;
    var offset = 50; // px on the ground

    window.addEventListener('scroll', handleScroll);

    function handleScroll() {
      var pos:number = window.pageYOffset;
      // if (pos > groundPos - deeBottom + offset) {
      if (pos > 5699) {  
        if (!dee.classList.contains('is-sitting')) {
          dee.classList.add('is-sitting');
          dee.style.top = 5699 + dee.getBoundingClientRect().height + offset * 2 + 'px';
        }
      } else {
        dee.classList.remove('is-sitting');
        dee.style.top = null;
      }
    }
  }

  @ViewChild(ModalComponent) modalComponent:ModalComponent;
  // private modalComponent: ModalComponent;
  private postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  cat$: BehaviorSubject<string|null>;

  myDropDown:string;
  selectedPost: Post;

  showFieldState: string;

  // title = 'app';
  conf = new EditorConfig();
  markdown = '## Blog body here...';
  afterMD = '';





  // Add new post
  newPostTitle = "";
  newPostPic = "";
  newPostAuth = "";
  newPostCat = "";

  // Edit post
  editPostTitle = "";
  // editMDbody = "";
  editPostPic = "";
  editPostAuth = "";
  editPostCat = "";


  newPostCollectionRef: AngularFirestoreCollection<Post>;
  newPost$: Observable<Post[]>;




  
  // todayDate is today date
  todayDate:string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  // For listen login child user value
  User:any; 
  userChangedHandler(user: any) {
    this.User = user;
    // console.log('Receive user');
    // console.log(this.User.email);
  }
  IsAdmin:boolean = false;
  isAdminChangedHandler(isAdmin: any) {
    this.IsAdmin = isAdmin;
    this.states = this.posts.pipe(map(() => 'hide'));
  }

  
  // This is a indicater for indicating that return to Dashboard(showing posts without detail)
  defaultHomepagePostRef:Post = {
      title: "blog",
      author: "",
      body: "",
      category: "",
      createDate: "",
      likes: 0,
      commentCount: 0,
      image: "",
  }

  AFS: AngularFirestore;
  private postDoc: AngularFirestoreDocument<Post>;
  postItem: Observable<Post>;

  // For showing the edit and delete animation fade in and fade out
  states:any;
  togglePostIn(i: number) {
    if (this.IsAdmin) {
      this.states = this.posts.pipe(map(() => 'hide'));
      this.states[i] = 'show';
    }
  }
  togglePostOut(i: number) {
    if (this.IsAdmin) {
      this.states = this.posts.pipe(map(() => 'show'));
      this.states[i] = 'hide';
    }
  }


  // For the confirmation pop up window
  
  constructor(
    private afs: AngularFirestore
    ) {

    this.AFS = afs;
    // this.catFilter$ = new BehaviorSubject(null);

    // this.posts = combineLatest(
    //   this.catFilter$,
    // ).pipe(
    //   switchMap(([cat]) => 
    //     afs.collection('post', ref => {
    //       let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
    //       if (cat) { query = query.where('cacategoryt', '==', cat) };
    //       return query;
    //     }).valueChanges()
    //   )
    // );

    // // this.postsCollection = afs.collection<Post>('post', ref => ref.orderBy('createDate', "desc"))
    // this.postsCollection = afs.collection<Post>('post', ref => ref.orderBy('createDate', "desc"))

    // // this.postsCollection = afs.collection<Post>('post', ref => ref.where("category", "==", "web"))
    // this.posts = this.postsCollection.valueChanges();
    // this.selectedPost = new Post();

    this.showFieldState = '';
    this.cat$ = new BehaviorSubject(null);

    
    this.selectedPost = this.defaultHomepagePostRef;
    this.posts = this.cat$.pipe(
      switchMap(cat => 
        afs.collection<Post>('post', ref => {
        // ref.where('category', '==', cat)).valueChanges()
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
       
        if (cat) {
           query = query.where('category', '==', cat) 
          };
          // console.log(query);
        // if (color) { query = query.where('color', '==', color) };
        query = query.orderBy('createDate', "desc");

        return query;
      }).valueChanges()
    ));

    // console.log("thispost: ", this.posts);

    // For showing the edit and delete animation fade in and fade out
    this.states = this.posts.pipe(map(() => 'hide'));




    // this.posts = queryObservable;

    // subscribe to changes
    // queryObservable.subscribe(queriedItems => {
    //   console.log(queriedItems);  
    // });
    
    // trigger the query
    
    // this.cat$.next(null);


  //   blog.isSelected = function(checkTab){
  //     return blog.tab === checkTab;
  //   };
    
  //   blog.post = {};
  //   blog.addPost = function(){
  //     blog.post.createdDate = Date.now();
  //     blog.post.comments = [];
  //     blog.post.likes = 0;
  //     blog.posts.unshift(this.post);
  //     blog.tab = 0;
  //     blog.post ={};
  //   };   
    
  // });



  // app.controller('CommentController', function(){
  //   this.comment = {};
  //   this.addComment = function(post){
  //     this.comment.createdOn = Date.now();
  //     post.comments.push(this.comment);
  //     this.comment ={};
  //   };
  // });
  }
  // End of Constructer


  // 同步属性内容
  syncModel(str): void {
    this.markdown = str;
    // console.log(this.markdown);
  }



  filterByCat(cat: string|null) {
    // console.log('next cat:', cat);
    this.cat$.next(cat);
  }


  onSelect = function(setPost){
    this.selectedPost = setPost;
    // console.log(this.selectedPost);
    // console.log("onselect");

  };
  
  onShowFieldState = function(setShowFieldState){
    this.showFieldState = setShowFieldState;
    // console.log("showFieldState: ", this.showFieldState);
  }

  
  // getUserInfo() {
  //     // this.userLoginComponent.passUser();
  //     this.userEmail = this.userLoginComponent.userInfo;
  //     console.log(this.userEmail);
  // }
  sendDefaultValue = function(setPost){
    this.editPostTitle = setPost.title;
    this.markdown = setPost.body;
    this.editPostPic = setPost.image;
    this.editPostAuth = setPost.author;
    this.editPostCat = setPost.category;
  }




  addLike() {
    
    let heart = this.contentHeart.nativeElement;
    if (!heart.classList.contains('isLighted')) {
      heart.classList.add('isLighted');

      let userDoc = this.AFS.firestore.collection('post');
      let updatePost:any;
      let docID = "";
      let docPath = "";

      this.selectedPost.likes += 1;
      
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
              commentCount: this.selectedPost.commentCount,
              image: this.selectedPost.image,
            };
            this.postDoc.update(updatePost);
          }
        })
      })


    }


  }


  addNewPost() {
    

    this.newPostCollectionRef = this.afs.collection<Post>('post');
    this.newPost$ = this.newPostCollectionRef.valueChanges();

    let newPost = {
      title: this.newPostTitle,
      author: this.newPostAuth,
      body: this.markdown,
      category: this.newPostCat,
      createDate: this.todayDate,
      likes: 0,
      commentCount: 0,
      image: this.newPostPic,
    };

    this.newPostCollectionRef.add(newPost);
    this.showFieldState = "";
    this.selectedPost.title = 'blog';
  }


  // update button
  editPost() {

    let docID = "";
    let docPath = "";
    let updatePost = {};
    let userDoc = this.AFS.firestore.collection('post');


    userDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docID = doc.id;
        docPath = "post/" + docID;
        this.postDoc = this.AFS.doc<Post>(docPath);
        this.postItem = this.postDoc.valueChanges();
        if (doc.data().title == this.selectedPost.title) {
          updatePost = {
            title: this.editPostTitle,
            author: this.editPostAuth,
            body: this.markdown,
            category: this.editPostCat,
            createDate: this.todayDate,
            likes: 0,
            commentCount: 0,
            image: this.editPostPic,
          };
          this.postDoc.update(updatePost);
          this.selectedPost.title = 'blog';
          this.showFieldState = "";
        }
      })
    });


    // this.postDoc = this.AFS.doc<Post>('post/QYMp86KCSiRsclNUnCqZ');
    // this.postItem = this.postDoc.valueChanges();
    // console.log(this.postItem);

  //   private itemDoc: AngularFirestoreDocument<Item>;
  // item: Observable<Item>;
  // constructor(private afs: AngularFirestore) {
  //   this.itemDoc = afs.doc<Item>('items/1');
  //   this.item = this.itemDoc.valueChanges();
  // }
  // update(item: Item) {
  //   this.itemDoc.update(item);
  // }


    
  }

  deletePost() {
    
    let docID = "";
    let docPath = "";
    // let updatePost = {};
    let userDoc = this.AFS.firestore.collection('post');


    userDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docID = doc.id;
        docPath = "post/" + docID;
        this.postDoc = this.AFS.doc<Post>(docPath);
        this.postItem = this.postDoc.valueChanges();
        if (doc.data().title == this.selectedPost.title) {
          
          this.postDoc.delete();
          this.selectedPost.title = 'blog';
          this.showFieldState = "";
        }
      })
    });
  }
  

  openModal() {
    this.modalComponent.open();
  }

  closeModal() {
    this.modalComponent.close();
  }


}

