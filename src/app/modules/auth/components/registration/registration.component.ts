import { CountryService } from './../../../data/country/country.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserModel } from '../../models/user.model';
import { first } from 'rxjs/operators';
import { UserProfileDto } from '../../models/user-profile';
import { AppComponentBase } from '../../../../_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { PlantsTemporaryDto } from './dtos/plants-temporary-dto';
import { AuthenticationService } from 'src/app/_base/services/authentication.service';
import { ThisReceiver } from '@angular/compiler';
import { CountryDto } from 'src/app/modules/data/country/dtos/country-dto';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent
  extends AppComponentBase
  implements OnInit, OnDestroy {
  Model: UserProfileDto = new UserProfileDto();
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  @Input() profile:boolean = false;
  errors: any = {};
  errorPassword: any = {};
  validPassword: boolean = false;
  DxDataSourceUserTypes: any = {};
  DxDataSourceCountries: any = {};
  userDetail: UserProfileDto;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _authenticationService: AuthenticationService,
    private router: Router,
    private _countryService: CountryService
  ) {
    super();
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.getData();
    // this.getUserTypes();
    this.getCountries();
    this.initForm();
  }

  getUserTypes() {
    this.authService.getUserType().subscribe((res: any[]) => {
      this.DxDataSourceUserTypes = this.getDataSourceDx(res);
    });
  }

  getCountries() {
    this._countryService.getCountries().subscribe((res:  CountryDto[]) => {
      this.DxDataSourceCountries = this.getDataSourceDx(res);
    });

  }


  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        businessName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.nullValidator, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        str: [
          '',
          Validators.compose([
            Validators.required,
            Validators.nullValidator, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        businessPhone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.nullValidator, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        businessCountry: [
          '',
          Validators.compose([
            Validators.required,
            Validators.nullValidator, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        businessAddress: [
          '',
          Validators.compose([
            Validators.required,
            Validators.nullValidator, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],

        legalRepresentativeFirstName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.nullValidator, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        legalRepresentativeSurname: [
          '',
          Validators.compose([
            Validators.required,
            Validators.nullValidator, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        firstName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.nullValidator, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        lastName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.nullValidator, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        position: [''],
        phoneNumber: [
          '',
          Validators.compose([
            Validators.required,
            Validators.nullValidator, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }
  addPlant() {
    if (
      this.Model.plantsQty > 0 &&
      this.Model.applicationPlantTemporaries.length < this.Model.plantsQty
    ) {
      this.Model.applicationPlantTemporaries.push(new PlantsTemporaryDto());
    }
  }

  deletePlant(index: number) {
    this.Model.applicationPlantTemporaries.splice(index, 1);
  }

  confirmPassword(password: string) {
    if (this.Model.password !== password) {
      this.errorPassword = {
        confirmPassword: ['Confirmación no coincide con Contraseña'],
      };
      this.validPassword = false;

    } else {
      this.validPassword = true;
      this.errorPassword = {};
    }
  }

  save() {
    if (this.Model.password !== this.Model.confirmPassword) {
      return;
    }
    this.authService
      .registerAccount(this.Model)
      .subscribe((response_: RequestResult) => {
        this.validResponse(response_);
      });

  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.errors = {};
      this.success(requestResult.title, requestResult.messageResponse);
      this.router.navigate(['/auth/login']);
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;

    }
  }
  validUpdate(requestResult: RequestResult) {
    if (requestResult.success) {
      this.errors = {};
      this.success(requestResult.title, requestResult.messageResponse);
      this.router.navigate(['/data/profile']);
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;

    }
  }

  submit() {
    this.hasError = false;
    const result: {
      [key: string]: string;
    } = {};
    Object.keys(this.f).forEach((key) => {
      result[key] = this.f[key].value;
    });
    const newUser = new UserModel();
    newUser.setUser(result);
    const registrationSubscr = this.authService
      .registration(newUser)
      .pipe(first())
      .subscribe((user: UserModel) => {
        if (user) {
          this.router.navigate(['/']);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  getData() {
    this.authService.getCurrentUser().subscribe((result) => {
      this.Model = result;
    });
  }

  update() {
    this.authService.update(this.Model)
    .subscribe((response_: RequestResult) => this.validUpdate(response_));

  }

  changePassword() {
    this.authService.changePassword(this.Model.confirmPassword)
    .subscribe((response_: RequestResult) => this.validUpdate(response_));

  }
  divChangePassword: boolean = false;

  divResumenFunction() {
    this.divChangePassword = true;
  }
}
