import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  
})
export class HeaderComponent implements OnInit, OnDestroy {
  dateTime: Date;
  constructor()  {}

  ngOnInit(): void {
    setInterval(() => {
      this.dateTime = new Date();
    }, 1000);
  }
  ngOnDestroy() {}

}