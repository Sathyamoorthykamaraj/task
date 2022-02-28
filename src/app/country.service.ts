import { Injectable } from '@angular/core';  
import { HttpClientModule } from '@angular/common/http';  
import { AngularFirestore } from '@angular/fire/compat/firestore';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class CountryService {  
  
  constructor(public httpClient: HttpClientModule, private angularFirestore: AngularFirestore) {  
  }  
  
  getAllCountry() {  
    return this.angularFirestore.collection('Country').snapshotChanges();  
  }  
  
  //Adding new Country   
  addCountryInforamtion(countryInfo: any) {  
    return this.angularFirestore.collection('Country').add(countryInfo);  
  }  
  //Update Existing Country  
  updateCountryInforamtion(countryid: string|any, countryInfo:any) {  
    delete countryInfo.id;  
    this.angularFirestore.doc('Country/' + countryid).update(countryInfo);  
  }  
  
  //Delete Country  
  deleteCountry(id: string|any) {  
    this.angularFirestore.doc('Country/' + id).delete();  
  }  
} 

