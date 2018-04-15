import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { RealTimeBookComponent } from "./real-time-book/real-time-book.component";
import { OrderBookSnapshotComponent } from './order-book-snapshot/order-book-snapshot.component';

const routes: Routes = [
  { path: 'realtime-order-book', component: RealTimeBookComponent },
  { path: 'order-book-snapshot', component: OrderBookSnapshotComponent},
  { path: '', redirectTo: '/realtime-order-book', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
