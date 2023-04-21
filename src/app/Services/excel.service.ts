import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService  {
  private base: string;

 /* constructor(  private discoveryService: DiscoveryService,
                private http: HttpService) {
    this.base = "http://localhost:8082";
  }*/

  constructor(private http: HttpClient) {
    this.base = "http://localhost:8082";
}


 /* public subirArchivo(archivo: File, codigo): Observable<Respuesta<Excel>> {
    let formData = new FormData();
    formData.append("archivo", archivo); // mismo nombre que estaba en el backend
    formData.append("codigo", codigo);
    const url =  `${this.base}/home/excel/upload`;
    return this.http.post<Excel>(url,formData);
  }*/

  subirArchivo(archivo: File, codigo: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo); // mismo nombre que estaba en el backend
    formData.append("codigo", codigo);

    /*let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null)
    {
        httpHeaders= httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    */
    const req = new HttpRequest('POST', `${this.base}/home/excel/upload`, formData, {
        reportProgress: true
    });
    return this.http.request(req);
}

}
