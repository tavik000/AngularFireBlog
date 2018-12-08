/*

Simple blog front end demo in order to learn AngularJS - You can add new posts, add comments, and like posts.

*/

    // window.alert("sadf");

// $(document).ready(function(){

   
// });


//------

// var maintext = document.getElementById("maintext");
// var submitBtn = document.getElementById("submitBtn");
// var fireHeading = document.getElementById("fireHeading");

// var fireHeadingRef = firebase.database().ref().child("Heading");


// fireHeadingRef.on('value', function(datasnapshot){
//     fireHeading.innerText = datasnapshot.val();
// });




// var myVar = setInterval(myTimer, 1000);

// function myTimer() {
   
// }
    



function submitClick(){
    var firebaseRef = firebase.database().ref();

    firebaseRef.child("Text").set("Some Value");
    // firebaseRef.push().set("Some Value");
}

var app = angular.module("blogApp", ["firebase"]);


  app.controller('BlogController', function ($scope, $firebaseObject) {
    var blog = this;
    blog.title = "Key Blog";
   
      

    blog.posts = {};
// window.alert("K00");


    // var firebaseRef = firebase.database().ref();
    // firebaseRef.child("angular").set("JS");


    // var ref = firebase.database().ref().child("data");
    // // download the data into a local object
    // var syncObject = $firebaseObject(ref);
    // // synchronize the object with a three-way data binding
    // // click on `index.html` above to see it used in the DOM!
    // syncObject.$bindTo($scope, "data");



    


    blog.posts = [
                    {
                          title: 'Blog Post One',
                          body: [
                            "Lorem ipsum dolor sit am et, consectetur adipisicing elit. Dolorem deleniti quae, neque libero voluptate maiores ullam unde voluptatem assumenda velit dolores impedit quis qui! Neque, cupiditate labore nulla? Atque, tenetur.",
                            "Numquam nobis nam voluptas blanditiis eveniet in quasi possimus voluptatem temporibus doloremque delectus dolorum, voluptatum laborum aut dolorem? In rerum necessitatibus soluta incidunt nihil numquam fugit quas pariatur dolores nesciunt?",
                            "Quibusdam placeat quisquam iure repellendus ad in, nihil numquam quaerat, facere alias illo. Tempora perferendis incidunt, ratione eveniet esse earum, corporis sit? Modi enim commodi odio placeat minus, error id?",
                            "Corrupti voluptates asperiores ratione laudantium, eveniet molestiae possimus deleniti officia, incidunt quae et. Amet, ducimus eum ipsa reprehenderit ad, et nihil, veritatis ea doloremque ab placeat dolore impedit, quia eius."
                          ],
                          "author": "Nick Moreton",
                          "comments": [
                            {
                              "body":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos possimus porro earum dolor sint fuga laborum velit laudantium distinctio quos sunt veritatis unde inventore, autem ad tenetur voluptatibus mollitia vel!",
                              "author": "trollguy87"
                            }
                          ],
                          "likes":0,
                          "createdOn":1542732621000
                    },
                  ]
    // $http.get('https://blog-c5014.firebaseio.com/Post').success(function(data){
      // blog.posts = data;
    // });
    

    // var rootRef = firebase.database().ref().child("Post");
    // data = $firebaseObject(rootRef);
    // window.alert();
    // blog.posts = data;


    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();

    // Disable deprecated features
    db.settings({
      timestampsInSnapshots: true
    });

    var postRef = db.collection("post");

    // var data = $firebaseObject(postRef);
    blog.posts.push(postRef);
            console.log(blog.posts);
    

    // blog.posts = postRef;
    // window.alert(blog.posts);


    db.collection("post").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });


    // rootRef.orderByChild("commentCount").on("value", snap => {


    //     blog.posts.push(postTemp);

    //     window.alert(blog.posts);

    //     // window.alert(name);
    //     // window.alert(body);
    //     // blog.posts.push(snap);
    //     // blog.posts = name;
    //     // blog.posts = {
    //     //     title: 'abc',
    //     //     body: 'sdf',
    //     //     likes: 0,
    //     // };
        
    // });
// blog.posts = rootRef;
// window.alert(rootRef);

    blog.tab = 'blog';
    
    blog.selectTab = function(setTab){
      blog.tab = setTab;
      console.log(blog.tab)
    };
    
    blog.isSelected = function(checkTab){
      return blog.tab === checkTab;
    };
    
    blog.post = {};
    blog.addPost = function(){
      blog.post.createdDate = Date.now();
      blog.post.comments = [];
      blog.post.likes = 0;
      blog.posts.unshift(this.post);
      blog.tab = 0;
      blog.post ={};
    };   
    
  });



  app.controller('CommentController', function(){
    this.comment = {};
    this.addComment = function(post){
      this.comment.createdOn = Date.now();
      post.comments.push(this.comment);
      this.comment ={};
    };
  });


// (function(){
//   console.log("abc")
//   var app = angular.module('blogApp',[]);
  
//   app.controller('BlogController', ['$http', function($http){
    
    // var blog = this;
    // blog.title = "AngularJS Blog App";
    
    // blog.posts = {};
    // $http.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/110131/posts_1.json').success(function(data){
    //   blog.posts = data;
    // });
    
    // blog.tab = 'blog';
    
    // blog.selectTab = function(setTab){
    //   blog.tab = setTab;
    //   console.log(blog.tab)
    // };
    
    // blog.isSelected = function(checkTab){
    //   return blog.tab === checkTab;
    // };
    
    // blog.post = {};
    // blog.addPost = function(){
    //   blog.post.createdOn = Date.now();
    //   blog.post.comments = [];
    //   blog.post.likes = 0;
    //   blog.posts.unshift(this.post);
    //   blog.tab = 0;
    //   blog.post ={};
    // };   
    
//   }]);
  
//   app.controller('CommentController', function(){
//     this.comment = {};
//     this.addComment = function(post){
//       this.comment.createdOn = Date.now();
//       post.comments.push(this.comment);
//       this.comment ={};
//     };
//   });
 
// })();