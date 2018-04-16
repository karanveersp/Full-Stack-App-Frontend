import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { BookItem } from "./Book-Item";

@Injectable()
export class SnapshotService {

  constructor(private http: HttpClient) { }

  get_snapshot(price_greater_than = 0, exchange = ''): Observable<BookItem[]> {
    return this.http.get<BookItem[]>('http://localhost:5000/snapshot', {
      params: new HttpParams()
        .set('price_greater_than', price_greater_than.toString())
        .set('exchange', exchange)
    });
  }

}
