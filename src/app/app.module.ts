// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatRadioModule, MatInputModule, MatPaginatorModule, MatTableModule } from "@angular/material";

// 3rd party imports
import { NgxPaginationModule } from "ngx-pagination";

// project imports
import { AppRoutingModule } from './/app-routing.module';
import { WebSocketService } from './web-socket.service';
import { SnapshotService } from './snapshot.service';
import { RealTimeBookComponent } from './real-time-book/real-time-book.component';
import { OrderBookSnapshotComponent } from './order-book-snapshot/order-book-snapshot.component';




@NgModule({
  declarations: [
    AppComponent,
    RealTimeBookComponent,
    OrderBookSnapshotComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [WebSocketService, SnapshotService],
  bootstrap: [AppComponent]
})
export class AppModule { }

