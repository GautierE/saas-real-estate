import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) {}

  signIn(params: SignIn): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(params.email, params.password)
    );
  }
}

interface SignIn {
  email: string;
  password: string;
}
