import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription } from 'rxjs';
import { User } from '../Models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authNgrx from '../auth/auth.actions';
import * as ieAction from '../ingreso-egreso/income-egress.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public subUser!: Subscription;
  private _user!: User | null;

  get user(){
    return {...this._user};
  }

  constructor(public auth: AngularFireAuth,
    private store: AngularFirestore,
    private storeNgrx: Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(user => {

      if (user === null) {

        this._user = null;
        if(this.subUser)
        {
          this.subUser.unsubscribe();
        }
        this.storeNgrx.dispatch(authNgrx.unSetUser());
        this.storeNgrx.dispatch(ieAction.unSetItems());


      } else {

        this.subUser = this.store.doc(`${user.uid}/user`)
        .valueChanges().subscribe(userStore => {

          const user = User.fromFirebase(userStore)
          this._user = user;
          this.storeNgrx.dispatch(authNgrx.setUser({user}));

        })
      }
    });
  }

  createUser(name: string, email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then(userFire => {
      const newUser = new User(userFire.user!.uid, name, email);
      return this.store.doc(`${userFire.user!.uid}/user`)
      .set({...newUser});
    })
  }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

}
