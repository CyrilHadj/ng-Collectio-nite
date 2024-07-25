import { Injectable } from '@angular/core';
import { Collection } from '../utils/interface/Collection';
import { Item } from '../utils/interface/Item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
//collection
  public async getCollections() : Promise<Collection[]>{
    return  fetch("http://localhost:8000/collection/all",{
      headers : {
        "content-type" : "application/json",
        
      }
    })
    .then(res=>res.json())
    .catch(error=> console.log(error))
  }

  public async postCollection(collectionBody : Collection){
    return await fetch("http://localhost:8000/collection",{
      method : "post",
      headers : {
        "Content-type" : "application/json",
      },    
      body: JSON.stringify(collectionBody)
    })
    .then(res=>res.json())
  }

  public async deleteCollection(collectionId : number){
    return await fetch("http://localhost:8000/collection/" + collectionId,{
      method : "delete",
      headers : {
        "content-type" : "application/json",
      },
    })
    .then(res=>res.json())
  }
  
  public async updateCollection(collectionBody : Collection){
    return await fetch("http://localhost:8000/collection",{
      method : "put",
      headers : {
        "Content-type" : "application/json",
      },    
      body: JSON.stringify(collectionBody)
    })
    .then(res=>res.json())
  }

  public async getCollection(collectionId : number){
    return await fetch("http://localhost:8000/collection/" + collectionId,{
      method : "get",
      headers : {
        "content-type" : "application/json",
      },
    })
    .then(res=>res.json())
  }

//item
public async getItemById(itemId : number) : Promise<Collection>{
  return  fetch("http://localhost:8000/item/"+itemId,{
    headers : {
      "content-type" : "application/json",
    }
  })
  .then(res=>res.json())
  .catch(error=> console.log(error))
}

  public async getCollectionItems(collectionId : number){
    return await fetch("http://localhost:8000/item/all/collection/" + collectionId,{
      method : "get",
      headers : {
        "content-type" : "application/json",
      },
    })
    .then(res=>res.json())
  }
 
  public async postCollectionItem(CollectionId : number, itemBody : Item){
    return await fetch("http://localhost:8000/item/collection/"+ CollectionId,{
      method : "post",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(itemBody)
    })
    .then(res=>res.json())
  }

  public async deleteItem(itemId : number){
    return await fetch("http://localhost:8000/item/"+ itemId,{
      method : "delete",
      headers : {
        "content-type" : "application/json"
      }
    })
    .then(res=>{res.json()})
  }

  public async updateItem(item : Item){
    return await fetch("http://localhost:8000/item",{
      method : "put",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(item)
    })

  }
}
