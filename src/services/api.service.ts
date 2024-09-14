import { Injectable } from '@angular/core';
import { Collection } from '../utils/interface/Collection';
import { Item } from '../utils/interface/Item';
import { Category } from '../utils/interface/Category';
import { CategoryAndItemId } from '../utils/interface/CategoryAndItemId';
import { imageCollectionId } from '../utils/interface/imageCollectionId';
import { imageItemId } from '../utils/interface/imageItemId';
import { Url } from '../utils/interface/Url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
//collection
  public async getCollections() : Promise<Collection[]>{
    return  fetch("http://localhost:8000/collection/all",{
      headers : {
        "Content-type" : "application/json",
        
      }
    })
    .then(res=>res.json())
    .catch(error=> console.log(error))
  };

  public async postCollection(collectionBody : Collection){
    return await fetch("http://localhost:8000/collection",{
      method : "post",
      headers : {
        "Content-type" : "application/json",
      },    
      body: JSON.stringify(collectionBody)
    })
    .then(res=>res.json())
  };

  public async deleteCollection(collectionId : number){
    return await fetch("http://localhost:8000/collection/" + collectionId,{
      method : "delete",
      headers : {
        "Content-type" : "application/json",
      },
    })
    .then(res=>res.json())
  };
  
  public async updateCollection(collectionBody : Collection){
    return await fetch("http://localhost:8000/collection",{
      method : "put",
      headers : {
        "Content-type" : "application/json",
      },    
      body: JSON.stringify(collectionBody)
    })
    .then(res=>res.json())
  };

  public async getCollection(collectionId : number){
    return await fetch("http://localhost:8000/collection/" + collectionId,{
      method : "get",
      headers : {
        "Content-type" : "application/json",
      },
    })
    .then(res=>res.json())
  };

//item
public async getItemById(itemId : number) : Promise<Item>{
  return  fetch("http://localhost:8000/item/"+itemId,{
    headers : {
      "Content-type" : "application/json",
    }
  })
  .then(res=>res.json())
  .catch(error=> console.log(error))
};

  public async getCollectionItems(collectionId : number) : Promise<Item[]>{
    return await fetch("http://localhost:8000/item/all/collection/" + collectionId,{
      method : "get",
      headers : {
        "Content-type" : "application/json",
      },
    })
    .then(res=>res.json())
  };
 
  public async postCollectionItem(CollectionId : number, itemBody : Item){
    return await fetch("http://localhost:8000/item/collection/"+ CollectionId,{
      method : "post",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify({
        name : itemBody.name
      })
    })
    .then(res=>res.json())
  };

  public async deleteItem(itemId : number){
    return await fetch("http://localhost:8000/item/"+ itemId,{
      method : "delete",
      headers : {
        "Content-type" : "application/json"
      }
    })
    .then(res=>res.json())
  }

  public async updateItem(item : Item){
    return await fetch("http://localhost:8000/item",{
      method : "put",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify(item)
    })

  };

  public async postCategory(category : Category){
    return await fetch ("http://localhost:8000/category",{
      method : "post",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify(category)
    })
  };

  public async addCategoryToItem(itemAndCategoryId : CategoryAndItemId){
    return await fetch ("http://localhost:8000/item/category",{
      method : "post",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify(itemAndCategoryId)
    })
  };

  public async getCategories() : Promise<Category[]>{
    return await fetch("http://localhost:8000/category/all",{
      headers : {
        "Content-type" : "application/json"
      }
    }
    )
    .then(res=>res.json())
    .catch(error=> console.log(error))
  }

  public async getItemByCategory(categoryId : number) : Promise<Item[]>{
    return await fetch("http://localhost:8000/item/category/" + categoryId,{
      method : "get",
      headers : {
        "Content-type" : "application/json"
      }
    })
    .then(res=>res.json())
    .catch(error=> console.log(error))
  }

  public async updateCategory(category : Category){
    return await fetch("http://localhost:8000/category",{
      method : "put",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify(category)
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
  }

  public async getCategoryById(categoryId : number) : Promise<Category>{
    return await fetch("http://localhost:8000/category/" + categoryId,{
      method : "get",
      headers : {
        "Content-type" : "application/json"
      },
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
  }

  public async deleteCategory(categoryId : number){
    return await fetch("http://localhost:8000/category/" + categoryId,{
      method : "delete",
      headers : {
        "Content-type" : "application/json"
      },
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
  }


//Images
  public async postImageToServ(formData : FormData) : Promise<any>{
    return await fetch("http://localhost:8090/upload",{
      method : "post",
      body : formData,
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
  }

  public async postimageToCollection(body : imageCollectionId){
    return await fetch("http://localhost:8000/image/collection",{
      method : "post",
      body : JSON.stringify(body),
      headers : {
        "Content-type" : "application/json"
      },
    })
    .then(res =>res.json())
    .catch(error=>console.log(error))
  };

  public async getImageByCollection(collectionId : number) : Promise<Url>{
    return await fetch("http://localhost:8000/image/collection/"+collectionId,{
       method: "get",
       headers : {
        "Content-type" : "application/json"
      },
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
  };

  public async postImageToItem(body : imageItemId){
    return await fetch("http://localhost:8000/image/item",{
      method : "post",
      body : JSON.stringify(body),
      headers : {
        "Content-type" : "application/json"
      },
    })
    .then(res =>res.json())
    .catch(error=>console.log(error))
  };

  public async getImageByItem(itemId : number){
    return await fetch("http://localhost:8000/image/item/"+itemId,{
      method: "get",
      headers : {
        "Content-type" : "application/json"
      }
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
  };
  
}
