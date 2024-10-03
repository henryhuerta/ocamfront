import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../_base/AppComponentBase';
import { RequestTypesService } from '../../../data/request-types/request-types.service';
import { RequestTypeDto } from '../../../data/request-types/dtos/request-type-dtos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent extends AppComponentBase implements OnInit {
  requestTypesSource: RequestTypeDto[] = [];
  SubTitle: string = "";

  constructor(
    private router: Router,
    private requestTypesService: RequestTypesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRequestTypes();
  }

  getRequestTypes() {
    this.requestTypesService.getActives().subscribe((res: RequestTypeDto[]) => {
      this.requestTypesSource = res;
    });
  }

  goToCreateRequest(type: RequestTypeDto) {
    this.SubTitle = type.name;
    this.router.navigate([`/request/create-request/${type.id}`]);
  }

}
