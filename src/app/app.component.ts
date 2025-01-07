import { Component } from '@angular/core';

import { BlogCardComponent } from './component/blog-card/blog-card.component';
import { ProfileComponent } from './component/profile/profile.component';

@Component({
  selector: 'app-root',
  imports: [BlogCardComponent, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
