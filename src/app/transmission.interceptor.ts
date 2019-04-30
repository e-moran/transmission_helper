import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class TransmissionInterceptor implements HttpInterceptor {
    private csrfToken = '';
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('transmission')) {
            console.log(req);
            return next.handle(this.applyCredentials(req)).pipe(
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 409) {
                        const htmlParser = new DOMParser();
                        const html = htmlParser.parseFromString(err.error, 'text/html');
                        let csrf = html.getElementsByTagName('code')[0].innerText;
                        csrf = csrf.split(' ')[1];
                        this.csrfToken = csrf;
                        return next.handle(this.applyCredentials(req));
                    }
                    return throwError(err);
                })
            );
        } else {
            return next.handle(req);
        }
    }
    private applyCredentials(req: HttpRequest<any>): HttpRequest<any> {
        return req.clone({
            setHeaders: {
                'X-Transmission-Session-Id': this.csrfToken,
                'Content-Type': 'application/json'
            }
        });
    }
}
