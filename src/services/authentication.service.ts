import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  signedInCheck() {
    return from(this.auth.authState);
  }

  signUp(params: SignUp): Observable<any> {
    const {
      firstName,
      lastName,
      email,
      phone,
      profession,
      employeesCount,
      password,
    } = params;

    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential: firebase.auth.UserCredential) => {
        const { user } = userCredential;

        if (user) {
          const uid = user.uid;
          const userDoc = this.firestore.collection('users').doc(uid);

          return from(
            userDoc.set({
              firstName,
              lastName,
              email,
              phone,
              profession,
              employeesCount,
            })
          );
        } else {
          return throwError(() => 'Erreur lors de la création du compte');
        }
      })
    );
  }

  signIn(params: SignIn): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(params.email, params.password)
    );
  }

  recoverPassword(email: string): Observable<any> {
    return from(this.auth.sendPasswordResetEmail(email));
  }

  logout() {
    return this.auth.signOut();
  }
}

interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  employeesCount: string;
  password: string;
}

interface SignIn {
  email: string;
  password: string;
}
