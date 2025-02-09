import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EnacmentPruebaColoresComponent } from "./EnacmentPrueba-Colores/EnacmentPrueba-Colores.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, EnacmentPruebaColoresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'enacmentPrueba';
}
