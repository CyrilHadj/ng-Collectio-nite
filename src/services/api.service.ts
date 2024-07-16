import { Injectable } from '@angular/core';
import { Collection } from '../utils/interface/Collection';




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  public async getCollections() : Promise<Collection[]>{
    return  fetch("http://localhost:8000/collections",{
      headers : {
        "content-type" : "application/json",
        
      }
    })
    .then(res=>res.json())
    .catch(error=> console.log(error))
  }

  public async postCollection(collectionBody : Collection){
    return await fetch("http://localhost:8000/product",{
      method : "POST",
      headers : {
        "Content-type" : "application/json",
      },
      
      body: JSON.stringify({bodyCollection : collectionBody})
   
    })
    .then(res=>res.json());
  }
  
}
