import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-completed-uncompleted',
  templateUrl: './transaction-completed-uncompleted.component.html',
  styleUrls: ['./transaction-completed-uncompleted.component.scss']
})
export class TransactionCompletedUncompletedComponent implements OnInit {

  @Input() success: boolean = true;
  @Input() title: string = "Transaccion";

  constructor() { }

  ngOnInit(): void {
  }

}
