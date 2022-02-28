import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Country } from '../country';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  updateCountry: boolean = false;  
  countries: Country[] | any;  
  Country: Country = new Country();  
  
  countryId = null;  
  isToggle: boolean = false;  
  formSubmitted: boolean | undefined;  
  isDelete: boolean | undefined;  
  
  CountryList: AngularFireList<any> | any;  
  
  constructor(countryservice:CountryService,
    private angularFireDatabase: AngularFireDatabase  
  ) {  
    this.getAllCountry();  
  }  
  ngOnInit(): void{
   
  }
  
  getAllCountry() {  
    this.CountryList = this.angularFireDatabase.list('Country');  
    this.CountryList.snapshotChanges().subscribe((data: any) => {  
      this.countries = data.map((e: { payload: { key: any; val: () => Country; }; }) => {  
        return {  
          id: e.payload.key,  
          ...e.payload.val()  
        } as Country;  
      });  
      console.log(this.countries);  
    });  
  
  }  
  
  onSubmit(f: { form: { valid: any; }; submitted: boolean; }) {  
    if (f.form.valid) {  
  
      if (this.countryId == null) {  
        this.CountryList.push({  
          CountryName: this.Country.Title,  
          CountryShortName: this.Country.Blogcontent,  
         
        })  
  
      } else {  
        this.CountryList.update(this.countryId, { 
          CountryName: this.Country.Title,  
          CountryShortName: this.Country.Blogcontent,  
           
        })  
      }  
      this.Country = new Country();  
      f.submitted = false;  
      this.formSubmitted = true;  
      this.updateCountry = false;  
      setInterval(() => {  
        this.formSubmitted = false;  
      }, 2000);  
    }  
  }  
  
  //Edit Country method  
  editCountry(countryId: any) {  
    this.countryId = countryId;  
    let obj: any = this.countries.filter((x: any) => {  
      return x.id == countryId;  
    });  
    this.updateCountry = true;  
    this.Country = obj[0];  
  }  
  
  // Delete Country method  
  deleteCountry(countryId: any) {  
    if (confirm('Please note! This action can NOT be undone. Are you sure you want to delete?')) {  
  
      this.CountryList.remove(countryId);  
      this.isDelete = true;  
      setInterval(() => {  
        this.isDelete = false;  
      }, 2000);  
    }  
  }  
  
}  