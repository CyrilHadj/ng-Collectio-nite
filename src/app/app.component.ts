import { Component } from '@angular/core';
import { provideRouter, RouterLink, RouterOutlet } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Collectio-nite';
  
}
