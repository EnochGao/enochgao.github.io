import { Component } from '@angular/core';

import { ProfileComponent } from './component/profile/profile.component';

@Component({
  selector: 'app-root',
  imports: [ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
