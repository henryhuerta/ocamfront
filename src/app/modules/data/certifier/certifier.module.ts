import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CertifierRoutingModule } from './certifier.routing';
import { CreateOrUpdateCertifierComponent } from './create-or-update-certifier/create-or-update-certifier.component';
import { ListCertifierComponent } from './list-certifier/list-certifier.component';

@NgModule({
    declarations: [CreateOrUpdateCertifierComponent, ListCertifierComponent],
    imports: [
        SharedModule,
        CertifierRoutingModule],
    exports: []
})
export class CertifierModule { }