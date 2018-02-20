import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signinCompleate: boolean;

  userDetails :{ firstName:string, lastName:string, email:string, password:string, cPassword:string} 
              ={ firstName:"", lastName:"", email:"", password:"", cPassword:""};
  
  currentuser: Observable<firebase.User>;
  users: Observable<any[]>;
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {  
      this.afAuth.auth.signInAnonymously();
      this.currentuser = this.afAuth.authState;
      this.users = db.collection('users').valueChanges();
  }

  onSubmit(){
    firebase.auth().createUserWithEmailAndPassword(this.userDetails.email, this.userDetails.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Errors",errorMessage);
      console.log("Error Code",errorCode);
    });
    this.signinCompleate = true;    
  }

  ngOnInit() {
  }



}
