import { Component, OnInit, OnDestroy } from '@angular/core';

import { WebSocketService } from '../web-socket.service';
import { Subscription } from 'rxjs';
import { BookItem } from "../Book-Item";

@Component({
  selector: 'app-real-time-book',
  templateUrl: './real-time-book.component.html',
  styleUrls: ['./real-time-book.component.css']
})
export class RealTimeBookComponent implements OnInit, OnDestroy {
  ob = {"bids": {} , "asks": {}};                   // order book object
  Object = Object;                                  // Makes Object available to template for the ability to iterate over key/values using Object.keys(obj)
  p: number = 1;                                    // For pagination
  sub: Subscription;                                // Subscription to websocket

  constructor(private wsService: WebSocketService) { }


  ngOnInit() {
    this.sub = this.wsService.createObservableSocket("ws://localhost:5000/websocket").subscribe(data => {
      let message = JSON.parse(data);
      
      if (message.constructor === Array) {
        this.createSnapshot(message);
      }
      else {
        this.update(message);
      }
    });
  }

  createSnapshot(message): void {
    message.forEach(item => {
      let book_item = new BookItem(item.id, item.exchange, item.pairname, item.type, item.price, item.count);
      if (book_item.type === "bid" && book_item.count != 0) {
        this.ob.bids[book_item.id] = book_item;
      }
      else if (book_item.type === "ask" && book_item.count != 0){
        this.ob.asks[book_item.id] = book_item;
      }
    });
    this.ob.bids = {...this.ob.bids};
    this.ob.asks = {...this.ob.asks};
  }

  update(message) {

    let update_item = new BookItem(message.id, message.exchange, message.pairname, message.type, message.price, message.count);

    if (update_item.type === "bid") {                                             
      if (update_item.count === 0) {
        delete this.ob.bids[update_item.id];
        // console.log("Deleting " + update_item.print());
      }
      else {                                                                       // else update the count
        if (this.ob.bids[update_item.id]){
          this.ob.bids[update_item.id].count = update_item.count;
              
          // console.log("Updating " + update_item.print());     
        }
        else {
          this.ob.bids[update_item.id] = update_item;                              // create new bid item
          
          // console.log("Adding " + update_item.print())
        } // End else
      } // End else
    } // End if
    else {                                                                               // iterate through asks
      if (update_item.count === 0) {
        // this.ob.asks = this.ob.asks.filter(row => row.id != update_item.id); // delete the row by filtering
        delete this.ob.asks[update_item.id];
        // console.log("Deleting " + update_item.print());
      }
      else {
        if (this.ob.asks[update_item.id]){
          this.ob.asks[update_item.id].count = update_item.count;          
          // console.log("Updating " + update_item.print());     
        }
        else {
          this.ob.asks[update_item.id] = update_item;                              // create new bid item
          // console.log("Adding " + update_item.print())
        }
      }
    }
    this.ob.bids = {...this.ob.bids};
    this.ob.asks = {...this.ob.asks};
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
} // End class definition
