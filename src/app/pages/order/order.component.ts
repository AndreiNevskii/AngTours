import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ITour } from '../../models/tours';
import { ToursService } from '../../services/tours.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { UserService } from '../../services/user.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [RouterLink,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    NgTemplateOutlet
   ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit{ 

 tourId: string = null;
 tour: ITour; 
 userForm: FormGroup;
 userFormFieldsArr = [
  {label: "Имя", placeholder: "Введите имя", control: "firstName", type: "text"},
  {label: "Фамилия", placeholder: "Введите фамилию", control: "lastName", type: "text"},
  {label: "Номер карты", placeholder: "Введите номер карты", control: "cardNumber", type: "text"},
  {label: "Возраст", control: "age", type: "number"},
  {label: "Дата рождения", control: "birthDate", type: "date"},
  {label: "Гражданство", placeholder: "Введите гражданство", control: "citizenship", type: "text"},
 ]


constructor(private tourService: ToursService,
  private route: ActivatedRoute,
  private userService: UserService
) {

}

ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(this.tourId).subscribe((tour) => {
      this.tour = tour;
    })

    this.userForm = new FormGroup ({
        firstName: new FormControl('', {validators: Validators.required}),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        cardNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
        birthDate: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]),
        citizenship: new FormControl('', [Validators.required])
    })
}

initOrder(): void {
 const userLogin = this.userService.getUser().login;
 const personalData = this.userForm.getRawValue();
 const postObj = {
  userLogin,
  tourId: this.tourId,
  personalData: [personalData]
 }
 this.tourService.postOrder(postObj).subscribe();
}

}
