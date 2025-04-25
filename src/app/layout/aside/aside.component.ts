import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToursService } from '../../services/tours.service';
import { SelectChangeEvent, SelectModule} from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-aside',
  imports: [SelectModule, FormsModule, DatePickerModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit {
  private tourService = inject(ToursService);

  date: Date = null;

  selectedType: any = null;

  tourTypes = [
    {key: 'single', label: 'Одиночный'},
    {key: 'group', label: 'Групповой'},
    {key: 'all', label: 'Все'}
  ]

  checked: boolean = false;

  ngOnInit(): void {
    this.selectedType = this.tourTypes.find((type) => type.key === 'all' )
  }

  changeTourType(ev: SelectChangeEvent): void {
    this.tourService.initChangeTourType(this.selectedType);
    console.log(this.selectedType);
  }

  changeDate(ev: Date): void {
    console.log('date', ev);
    this.tourService.initChangeTourDate(ev);
  }

}
