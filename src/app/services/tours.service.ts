import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, map } from 'rxjs';
import { API } from '../shared/api';
import { ICountriesResponseItem, ITour, ITourServerRes } from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  private tourTypeSubject = new Subject<any>();
  readonly tourType$ = this.tourTypeSubject.asObservable();

  //date
  private tourDateSubject = new Subject<Date>();
  readonly tourDate$ = this.tourDateSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTours(): Observable<ITour[]> {
    const countries = this.http.get<ICountriesResponseItem[]>(API.countries);
    const tours = this.http.get<ITourServerRes>(API.tours);
  //parallel
  return forkJoin<[ICountriesResponseItem[], ITourServerRes]>([countries, tours]).pipe(
        map((data) => {
          console.log('data', data);
      
      let toursWithCountries = [] as ITour[];
      const toursArr = data[1].tours;
      const countriesMap = new Map();

      data[0].forEach(country => {
        countriesMap.set(country.iso_code2, country);
      });

      if (Array.isArray(toursArr)) {
         toursWithCountries = toursArr.map((tour) => {
          return {
            ...tour,
            country: countriesMap.get(tour.code) || null
          }
        });
      }
       return toursWithCountries;
    })
  )

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
  }

  initChangeTourType(val: any): void {
    this.tourTypeSubject.next(val);
  } 

  initChangeTourDate(val: Date): void {
    this.tourDateSubject.next(val);
  } 



}