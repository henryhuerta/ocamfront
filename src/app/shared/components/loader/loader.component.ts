import { Component, OnInit } from '@angular/core';
import { delay, Subject } from 'rxjs';
import { LoaderService } from 'src/app/_base/services/loader.service';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
	loading$ = this.loader.loading$;
	constructor(public loader: LoaderService) {}
	ngOnInit(): void {
	}
}
