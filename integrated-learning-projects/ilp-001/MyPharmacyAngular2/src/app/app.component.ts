import { PharmacyService } from './pharmacy/pharmacy.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [PharmacyService]
})
export class AppComponent {
  
}
