import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { SafeUrl } from '@angular/platform-browser';
import { User } from '../../../utils/interface/User';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [NgFor],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  user : User= {
    id: 0,
    name: '',
    email: '',
    password: ''
  };
  defaultProfilePicture = 'https://avatar.iran.liara.run/public'; 
  imageDeProfile!: string;
  imageUrls: { [key: number]: SafeUrl } = {};  
  constructor(private auth : AuthService, private router : Router,private api : ApiService ){}
  latestCollections : Collection[]= [];

  ngOnInit(){
    const token = this.auth.getPayload()
    if(token){
      this.auth.getUserById(token.id)
      .then((user)=>{
        this.user = user
      })
      .then(()=>{
   
        this.auth.getUserImage(this.user.id)
        .then((image)=>{
          console.log(image)
          this.imageDeProfile = image.url
        })
      })
    }
    
    this.auth.getUserCollection()
    ?.then((collections)=>{
     this.latestCollections = collections
    })
    .then(()=>{
      this.latestCollections.forEach(async (collection)=>{
        const imageUrl = await this.api.getImageByCollection(collection.id)
        console.log(imageUrl)
        this.imageUrls[collection.id] = imageUrl.url
      })
    })
  }

  openUpdateUser(){
    
  }


  logout() {
    
    this.auth.logout();
    this.router.navigate(['/signin']);
  }


}
