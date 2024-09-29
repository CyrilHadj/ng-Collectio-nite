import { Injectable } from '@angular/core';
import { Collection } from '../utils/interface/Collection';
import { Item } from '../utils/interface/Item';
import { Category } from '../utils/interface/Category';
import { CategoryAndItemId } from '../utils/interface/CategoryAndItemId';
import { imageCollectionId } from '../utils/interface/imageCollectionId';
import { imageItemId } from '../utils/interface/imageItemId';
import { Url } from '../utils/interface/Url';
import { Model } from '../utils/interface/Model';
import { Task } from '../utils/interface/Task';
import { TaskToModel } from '../utils/interface/TaskToModel';
import { ContentToModel } from '../utils/interface/ContentToModel';
import { Content } from '../utils/interface/Content';
import { CaracteristiqueToModel } from '../utils/interface/CaracteristiqueToModel';
import { Caracteristique } from '../utils/interface/Caracteristique';
import { imageToModel } from '../utils/interface/ImageToModel';
import { CollectionToUser } from '../utils/interface/CollectionToUser';
import { CategoryToUser } from '../utils/interface/CategoryToUser';
import { updateImageItem } from '../utils/interface/itemAndImageId';




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
//collection
public async getCollections(): Promise<Collection[]> {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch("http://localhost:8000/collection/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de la connexion");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
}

public async postCollection(collectionBody: Collection) {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch("http://localhost:8000/collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(collectionBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de la création de la collection");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création de la collection:", error);
    throw error;
  }
}

public async deleteCollection(collectionId : number){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/collection/"+collectionId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}
  
public async updateCollection(collectionBody : Collection) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/collection", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(collectionBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la modification de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

public async getCollection(collectionId : number) : Promise<Collection>{
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/collection/" + collectionId , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async postCollectionToUser(body : CollectionToUser) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/collection/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}


public async getCollectionItems(collectionId : number): Promise<Item[]>{
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/item/all/collection/" + collectionId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async postCollectionItem(CollectionId : number, itemBody : Item) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/item/collection/"+ CollectionId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body : JSON.stringify({
          name : itemBody.name
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

//item
public async getItemById(itemId : number): Promise<Item>{
  try {
    const token = localStorage.getItem('token');

    const response = await fetch("http://localhost:8000/item/"+itemId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de la connexion");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
}

public async deleteItem(itemId : number){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/item/"+ itemId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}
  
public async updateItem(item : Item) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(item),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la modification de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

//category
public async postCategory(category : Category) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(category),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
} 

public async postCategoryToUser(body : CategoryToUser) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/user/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

public async getCategoryByUser(userId : number):  Promise<Category[]>{
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/user/category/"+userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async addCategoryToItem(itemAndCategoryId : CategoryAndItemId) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/item/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(itemAndCategoryId),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

public async getCategories(): Promise<Category[]> {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/category/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async getItemByCategory(categoryId : number): Promise<Item[]>{
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/item/category/" + categoryId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async updateCategory(category : Category) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/category", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(category),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la modification de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

public async getCategoryById(categoryId : number): Promise<Category>{
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/category/" + categoryId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async deleteCategory(categoryId : number){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/category/" + categoryId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

//Images

public async postImageToServ(formData : FormData): Promise<any> {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8090/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
        body : formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}
  
public async deleteImageToServ(imageUrl : string){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8090/delete", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-type" : "application/json"
        },
        body : JSON.stringify({url : imageUrl}) ,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

public async deleteImageById(imageId : number){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/image/" + imageId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async postimageToCollection(body : imageCollectionId) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/image/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

public async getImageByCollection(collectionId : number): Promise<Url>{
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/image/collection/"+collectionId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async postImageToItem(body : imageItemId) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/image/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

public async getImageByItem(itemId : number){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/image/item/"+itemId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async updateImageItem(itemAndImageId : updateImageItem) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/image/item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body : JSON.stringify(itemAndImageId),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la modification de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

//Model
public async postModel(body : Model) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

public async getModelsByItemId(itemId : number): Promise<Model[]>{
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/model/item/"+itemId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async deleteModel(id : number){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/model/"+id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}
  
public async getModelById(id : number): Promise<Model>{
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/model/"+id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async UpdateModel(body : Model) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/model", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body : JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la modification de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}
//Task
public async postTaskToModel(body : TaskToModel) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/task/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

public async getTaskById(taskId : number){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/task/"+taskId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async getTaskByModel(modelId : number){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/task/all/model/"+modelId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async deleteTaskById(id : number){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/task/"+id,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async updateTask(task : Task) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/task", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body : JSON.stringify(task)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la modification de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}
//Content
public async postContentToModel(body : ContentToModel) {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/content/model",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de la collection");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création de la collection:", error);
      throw error;
    }
}

public async getContentByModel(modelId : number){
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch("http://localhost:8000/content/all/model/"+modelId,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
}

public async updateContent(content : Content) {
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch("http://localhost:8000/content", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
          body : JSON.stringify(content)
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur lors de la modification de la collection");
        }
    
        return await response.json();
      } catch (error) {
        console.error("Erreur lors de la création de la collection:", error);
        throw error;
      }
}

public async deleteContentById(contentId : number){
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch("http://localhost:8000/content/"+contentId,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur lors de la connexion");
        }
    
        return await response.json();
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        throw error;
      }
}
//Caracteristique
public async postCaracteristiqueToModel(body : CaracteristiqueToModel) {
        try {
          const token = localStorage.getItem('token');
      
          const response = await fetch("http://localhost:8000/caracteristique/model",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, 
            },
            body: JSON.stringify(body),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erreur lors de la création de la collection");
          }
      
          return await response.json();
        } catch (error) {
          console.error("Erreur lors de la création de la collection:", error);
          throw error;
        }
}

public async getCaracteristiqueByModel(modelId : number){
        try {
          const token = localStorage.getItem('token');
      
          const response = await fetch("http://localhost:8000/caracteristique/all/model/"+modelId,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erreur lors de la connexion");
          }
      
          return await response.json();
        } catch (error) {
          console.error("Erreur lors de la connexion:", error);
          throw error;
        }
}      
      
public async updateCaracteristique(caracteristique : Caracteristique) {
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch("http://localhost:8000/caracteristique", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
          body : JSON.stringify(caracteristique)
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur lors de la modification de la collection");
        }
    
        return await response.json();
      } catch (error) {
        console.error("Erreur lors de la création de la collection:", error);
        throw error;
      }
}

public async deleteCaracteristiqueById(caracteristiqueId : number){
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch("http://localhost:8000/caracteristique/"+caracteristiqueId,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur lors de la connexion");
        }
    
        return await response.json();
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        throw error;
      }
}

public async postImageToModel(body : imageToModel) {
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch("http://localhost:8000/model/image",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
          body: JSON.stringify(body),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur lors de la création de la collection");
        }
    
        return await response.json();
      } catch (error) {
        console.error("Erreur lors de la création de la collection:", error);
        throw error;
      }
}

public async getImageByModel(modelId : number) : Promise<Url[]>{
      try {
        const token = localStorage.getItem('token');
    
        const response = await fetch("http://localhost:8000/model/images/"+modelId,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur lors de la connexion");
        }
    
        return await response.json();
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        throw error;
      }
}

}

