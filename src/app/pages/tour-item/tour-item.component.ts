import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITour } from '../../models/tours';

@Component({
  selector: 'app-tour-item',
  imports: [],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss',
})
export class TourItemComponent implements OnInit{
  tourId: string = null;
  tour: ITour;
  constructor(private tourService: ToursService, private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
      this.tourId = this.route.snapshot.paramMap.get('id');
      console.log('tourId', this.tourId)
      this.tourService.getTourById(this.tourId).subscribe((tour) => {
              this.tour = tour;
      })
  }

 }
