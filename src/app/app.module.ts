import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { WebSocketService } from './web-socket.service';
import { RealTimeBookComponent } from './real-time-book/real-time-book.component';
import { NgxPaginationModule } from "ngx-pagination";
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { OrderBookSnapshotComponent } from './order-book-snapshot/order-book-snapshot.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    RealTimeBookComponent,
    OrderBookSnapshotComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
