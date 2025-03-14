import { Component, OnInit } from '@angular/core';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-layout',
  imports: [RouterModule, AsideComponent, FooterComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{
   constructor() {}
   ngOnInit(): void {}
}
