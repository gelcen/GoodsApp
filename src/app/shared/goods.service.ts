import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Good } from './good.model';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  
  private readonly goodsUrl: string = environment.baseApiUrl + "api/Goods";
  
  constructor(private http: HttpClient) { }
  
  addGood(good: Good): Observable<any> {
    return this.http.post<Good>(this.goodsUrl, good)
      .pipe(
        catchError(this.handleError<Good>('addGood'))
      );
  }

  getGoods(): Observable<Good[]> {
    return this.http.get<Good[]>(this.goodsUrl)
      .pipe(
        catchError(this.handleError<Good[]>('getGoods'))
      );
  }

  updateGood(good: Good): Observable<any> {
    const url = `${this.goodsUrl}/${good.id}`;
    return this.http.put(url, good)
      .pipe(
        catchError(this.handleError<any>('updateGood'))
      );
  }

  deleteGood(id: number): Observable<any> {
    const url = `${this.goodsUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError<any>('deleteGood'))
      );
  }

  private handleError<T> (operation = 'operation', result?:T) {
    return (error:any):Observable<T> => {
      
      console.log(error);
      console.log(operation + ' failed');

      return of(result as T);
    }
  }
}
