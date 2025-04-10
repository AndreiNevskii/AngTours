import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-settings',
  imports: [ButtonModule, RouterOutlet, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent { 
   menuItems = [
    {
      path: 'statistic',
      label: 'Статистика'
    },
    {
      path: 'chage-password',
      label: 'Смена пароля'
    }
   ]

}
