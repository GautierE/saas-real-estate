import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) {}

  signedInCheck() {
    return from(this.auth.authState);
  }

  signUp(params: SignUp): Observable<any> {
    return from(
      this.auth.createUserWithEmailAndPassword(params.email, params.password)
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
  email: string;
  password: string;
}

interface SignIn {
  email: string;
  password: string;
}
