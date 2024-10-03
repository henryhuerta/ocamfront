import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlantsTemporaryDto } from '../registration/dtos/plants-temporary-dto';

@Component({
  selector: 'app-plants-temporary',
  templateUrl: './plants-temporary.component.html',
  styleUrls: ['./plants-temporary.component.scss'],
})
export class PlantsTemporaryComponent implements OnInit {
  @Input() Model: PlantsTemporaryDto = new PlantsTemporaryDto();
  @Input() index: number = 0;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  errors: any = {};

  constructor() {}

  ngOnInit(): void {}

  onClickDelete() {
    this.onDelete.emit(this.index);
  }
}
