import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { SnapshotService } from "../snapshot.service";
import { BookItem } from '../Book-Item';

@Component({
  selector: 'app-order-book-snapshot',
  templateUrl: './order-book-snapshot.component.html',
  styleUrls: ['./order-book-snapshot.component.css'],
})
export class OrderBookSnapshotComponent implements OnInit {

  // Form properties
  rForm: FormGroup;
  post: any;
  msg: string = '';

  // Snapshot properties
  snapshot_bids: BookItem[] = [];
  snapshot_asks: BookItem[] = [];
  snapshot_set: boolean = false;

  columnsToDisplay = ['Price', 'Count', 'Exchange'];

  // Pagination property
  p: number = 1;

  constructor(private snap_service: SnapshotService, private fb: FormBuilder) {
    this.rForm = fb.group({
      'exchange': [null, Validators.required],
      'price_greater_than': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.snap_service.get_snapshot().subscribe(data => {
      this.createSnapshot(data);
      this.snapshot_set = true;
    }, err => {
      console.log("Error occurred while getting snapshot");
    })
  }

  createSnapshot(data) {
    data.forEach(item => {
      let book_item = new BookItem(item.id, item.exchange, item.pairname, item.type, item.price, item.count);
      if (item.type === "bid" && item.count > 0) {
        this.snapshot_bids.push(book_item);
      }
      else if (item.type === "ask" && item.count > 0) {
        this.snapshot_asks.push(book_item);
      }
    });
    // Change detection
    this.snapshot_bids = [...this.snapshot_bids];
    this.snapshot_asks = [...this.snapshot_asks];
  }

  onSubmit(post) {
    let exchangeParam = post.exchange;
    if (exchangeParam === "Both") {
      exchangeParam = "";   // no value retrieves both
    }

    let priceParam = '';


    if (isNaN(post.price_greater_than)) {
      // Validation for price_greater_than
      this.msg = "Price must be a number";
      this.rForm.reset();
    }
    else {
      // Send request to server
      priceParam = Math.abs(post.price_greater_than).toString();

      this.send_get_request(priceParam, exchangeParam);
      this.msg = "";
      this.rForm.reset();
    }
  }

  send_get_request(price_greater_than, exchange) {
    // Form submission get request
    // Reset the arrays
    this.snapshot_asks = [];
    this.snapshot_bids = [];
    this.snap_service.get_snapshot(price_greater_than, exchange).subscribe(data => {
      this.createSnapshot(data);
    }, err => {
      console.log("Error occurred while getting snapshot");
    });
  }
}
