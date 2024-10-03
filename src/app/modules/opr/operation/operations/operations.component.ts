import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '../../../../_base/AppComponentBase';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent extends AppComponentBase implements OnInit {
  operations: any = {
    'register-project': 'register-project',
    transfers: 'transfers',
    redemptions: 'redemptions',
    cancellations: 'cancellations',
  };

  titles: any = {
    'register-project': '',
    transfers: '¿Qué tipos de certificados desea transferir?',
    redemptions: '¿Qué tipo de certificados desea redimir?',
    cancellations: '¿Qué tipo de certificados desea cancelar?',
  };
  selectedOperation: string = 'register-project';
  
  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    let urls = this.router.url.split('/');

    let optionToSelect = this.operations[urls[urls.length - 1]];
    if (this.isUndefinedOrNull(optionToSelect)) {
      this.selectedOperation = 'register-project';
      this.router.navigate([`/operation/${this.selectedOperation}`]);
    } else {
      this.selectedOperation = optionToSelect;
      this.router.navigate([`/operation/${this.selectedOperation}`]);
    }
  }

  setSelectedOperation(option: string) {
    this.selectedOperation = option;
  }

  goToRegisterProject() {
    this.setSelectedOperation('register-project');
    this.router.navigate(['/operation/register-project']);
  }

  goToTranferCertificates() {
    this.setSelectedOperation('transfers');
    this.router.navigate(['/operation/transfers']);
  }
  goToRedeemCertificates() {
    this.setSelectedOperation('redemptions');
    this.router.navigate(['/operation/redemptions']);
  }
  goToCancelCertificates() {
    this.setSelectedOperation('cancellations');
    this.router.navigate(['/operation/cancellations']);
  }
}
