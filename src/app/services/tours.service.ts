import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/api';
import { ITour, ITourServerRes } from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  getTours(): Observable<ITourServerRes> {
    return this.http.get<ITourServerRes>(API.tours);
  }

  getTourById(id: string): Observable<ITour> {
    const tourAPI = API.tour;
    return this.http.get<ITour>(`${tourAPI}/${id}`);
  }

 getNearestTourByLocationId(id: string): Observable<ITour[]> {
  return this.http.get<ITour[]>(API.nearestTours, {
    params: {locationId: id}
  });
 }



  searchTours(tours: ITour[], value: string): ITour[] {
    if(Array.isArray(tours)) {
      return tours.filter((tour) => {
        if(tour && typeof tour.name=== 'string') {
          return tour.name.toLowerCase().includes(value.toLowerCase());
        } else {
          return false;
        }
      });
    } else {
      return [];
    }
  
}}