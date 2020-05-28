// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// import * as firebase from "firebase/app";
// import "firebase/auth";

// @Injectable({
//   providedIn: 'root'
// })
// export class GoogleAuthService {

//   constructor(private router: Router) { }

//   login() {
//     debugger;
//     var provider = new firebase.auth.GoogleAuthProvider();

//     const that = this;
//     firebase.auth().signInWithPopup(provider).then(function (result) {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       debugger
//       // var token = result.credential.accessToken;

//       var token = result.credential;

//       // The signed-in user info.
//       var user = result.user;

//       that.router.navigate(['/login']);
//       // ...
//     }).catch(function (error) {
//         debugger
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//       });
//   }
// }
