import { Injectable } from '@angular/core';
import { User } from '../utils/interface/User';
import { Payload } from '../utils/interface/Payload';
import { userAddImage } from '../utils/interface/userAddImage';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Collection } from '../utils/interface/Collection';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authenticated$ = this.authenticatedSubject.asObservable();
  constructor(private router : Router, private api : ApiService,) { }

  public isAuthenticated(): boolean {
    const payload = this.getPayload();
    if(!payload){
      console.log({error : "Le payload est invalide"})
      return false
    }
    if(payload.exp === undefined){
      console.log({error : "Le token n'a pas de date d'expiration"})
      return false
    }
    if (this.isTokenExpired(payload.exp)) {
      console.log("Le token est expiré.");
      return false;
    }
    return true;
  }



  public hasImportance(requiredImportance : number): boolean{
    const payload = this.getPayload();
    if(!payload || payload.importance === undefined){
      return false;
    } 
    return payload.importance === requiredImportance
  }



  public logout() : void {
    localStorage.removeItem("token");
  }

  public getPayload() : Payload | null {

    const token = this.getToken();
    if (!token) return null;
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = atob(payloadBase64);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Invalid token format", error);
      return null;
    }
  }

  public getToken(): string | null {
    return localStorage.getItem("token");
  }

  private isTokenExpired(expiration : number) : boolean{
    const now = Math.floor(Date.now()/ 1000);
    return expiration < now
  }


  getUserCollection(){
    const token = this.getPayload();
    if(token){
      try{
        return this.getCollection(token.id)
      }catch(error){
        console.log("erreur lors du decodage du token")
        return null
      }
    }
    return null
  }




  public async getCollection(userId : number): Promise<Collection[]>{
    try {
      const token = localStorage.getItem('token');

      const response = await fetch("http://localhost:8000/collection/user/" + userId , {
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

  public async signup(user: User): Promise<any> {
    try {
      const reponse = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
   
      if (!reponse.ok) {
        const errorData = await reponse.json();
        throw new Error(errorData.error || "Une erreur est survenue lors de l'inscription");
      }
  
      return await reponse.json();
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error; 
    }
  }

  public async userAddImage(userAddImage: any): Promise<void> {
    try {
      const response = await fetch("http://localhost:8000/user/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAddImage),
      });
  

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'ajout de l'image");
      }
  
      return await response.json(); 
    } catch (error) {
      console.error("Erreur lors de l'ajout d'image:", error);
      throw error; 
    }
  }

  public async getUserById(userId : number) : Promise<User>{
    try{
      const token = this.getToken()
    const reponse = await fetch("http://localhost:8000/user/"+userId,{
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      
    })

    if (!reponse.ok) {
      const errorData = await reponse.json();
      throw new Error(errorData.error || "Erreur lors de la connexion");
    }

    return await reponse.json()

  }catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error; 
  }

  }

  public async getUserImage(userId : number){
    try{
      const token = this.getToken()
      const reponse = await fetch("http://localhost:8000/user/image/"+userId, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
        
      });
      if (!reponse.ok) {
        const errorData = await reponse.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
      
      const lol = await reponse.json();
      console.log(lol)
      return  lol
      
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error; 
    }
  }

  public async signin(user: User): Promise<any> {
    try {
      const reponse = await fetch("http://localhost:8000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!reponse.ok) {
        const errorData = await reponse.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
  
      const body = await reponse.json();
  
      const token = body.token;
      localStorage.setItem("token", token);
  
      return body;  
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error; 
    }
  }
  
}
