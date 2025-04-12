import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, map, switchMap } from 'rxjs';
import { API } from '../shared/api';
import { Coords, ICountriesResponseItem, ITour, ITourServerRes } from '../models/tours';
import { IWeatherResponce } from '../models/map';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  private tourTypeSubject = new Subject<any>();
  readonly tourType$ = this.tourTypeSubject.asObservable();
  mapService = inject(MapService)

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

 getCountryByCode(code: string): Observable<any> {
  return this.http.get<Coords[]>(API.countryByCode, {params: {codes: code}}).pipe(
    map((countryDataArr)=> countryDataArr[0]),
   
    switchMap((countryData) => {
      console.log('countryData', countryData);
      const coords = {lat: countryData.latlng[0], lng: countryData.latlng[1]};
      
      return this.mapService.getWeather(coords).pipe(
        map((weatherResponce: IWeatherResponce) => {
          const current = weatherResponce.current;
          const hourly = weatherResponce.hourly;

          const weatherData = {
            isDay: current.is_day,
            snowfall: current.snowfall,
            rain: current.rain,
            currentWeather: hourly.temperature_2m[15]
          };

          console.log('weatherData', weatherData);
          return {countryData, weatherData}

        })
      )
    })
  )
 }

}