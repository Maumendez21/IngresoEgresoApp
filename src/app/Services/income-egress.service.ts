import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { IncomeEgress } from '../Models/ingresos-egresos.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeEgressService {

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
  ) { }

  public createIncomeEgress(incomeEgress: IncomeEgress){

    const {amount, description, type}=incomeEgress;

    // o se pudo resolver con: delete incomeEgress.uid;

    return this.fireStore.doc(`${this.authService.user.uid}/income-egress`)
      .collection('items')
      .add({amount, description, type });
  }

  public initIncomeEgress(uid: string){

    // Hacemos solicitud a firebase para obtener la colección de ingresos a partir del uid del ususario
    return this.fireStore.collection(`${uid}/income-egress/items`)
      // nos regresa toda la respuesta 
      .snapshotChanges()
      // pipe para convertir información
      .pipe(
        // map para convertir información y regresarla como deseamos
        map(snapshot => {
          return snapshot.map(doc =>  ({ uid: doc.payload.doc.id,...doc.payload.doc.data() as any}))
        })
      )
  }

  public deleteItem(uidI: string){

    return this.fireStore.doc(`${this.authService.user.uid}/income-egress/items/${uidI}`).delete();

  }
}
