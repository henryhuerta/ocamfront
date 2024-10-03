import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor(private authenticationService: AuthenticationService,
		private loaderService: LoaderService) {
	}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// add authorization header with jwt token if available
		let currentUser = this.authenticationService.currentUserValue;
		if (currentUser && currentUser.token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser.token}`,
					"App.TenantID": `${currentUser.tenantId}`,
					"Accept": "application/json"
				}
			});
		} else {
			request = request.clone({
				setHeaders: {
					"Content-Type": "application/json",
				}
			});
		}

		this.loaderService.show();
		return next.handle(request).pipe(finalize(() => this.loaderService.hide()));

		// return Observable.create((observer: any) => {
		// 	const subscription = next.handle(request)
		// 		.subscribe(
		// 			event => {
		// 				if (event instanceof HttpResponse) {
		// 					this.removeRequest(request);
		// 					observer.next(event);
		// 				}
		// 			},
		// 			err => {
		// 				this.removeRequest(request);
		// 				observer.error(err);
		// 			},
		// 			() => {
		// 				this.removeRequest(request);
		// 				observer.complete();
		// 			});
		// 	return () => {
		// 		this.removeRequest(request);
		// 		subscription.unsubscribe();
		// 	};
		// });
	}

}