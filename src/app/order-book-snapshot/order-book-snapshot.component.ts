import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BookItem } from '../Book-Item';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-order-book-snapshot',
  templateUrl: './order-book-snapshot.component.html',
  styleUrls: ['./order-book-snapshot.component.css'],
})
export class OrderBookSnapshotComponent implements OnInit {

  rForm: FormGroup;
  post: any;
  msg: string = '';


  snapshot_bids: BookItem[] = [];
  snapshot_asks: BookItem[] = [];

  p: number = 1;

  constructor(private http: HttpClient, private fb: FormBuilder) { 
    this.rForm = fb.group({
      'exchange': [null, Validators.required],
      'price_greater_than': [null, Validators.required]
    });
  }

  send_get_request(url){
    this.snapshot_asks = [];
    this.snapshot_bids = [];
    this.http.get(url).subscribe(data => {
      this.createSnapshot(data);
    }, err => {
      console.log("Error occurred while getting snapshot");
    })
  }

  onSubmit(post) {
    let exchangeParam = '';
    let priceParam = '';
    if (isNaN(post.price_greater_than)) {
      this.msg = "Price must be a number";
      this.rForm.reset();
    }
    else {
      if (post.exchange === "Both"){
        exchangeParam = "";
      }
      else {
        exchangeParam = "&exchange=" + post.exchange;
      }
      priceParam = "price_greater_than=" + String(Math.abs(post.price_greater_than));

      let req_url = "http://localhost:5000/snapshot?" + priceParam + exchangeParam;
      console.log(req_url);
      this.send_get_request(req_url);
      this.msg = "";
    }
  }

  ngOnInit() {
    this.http.get('http://localhost:5000/snapshot').subscribe(data => {
      this.createSnapshot(data);
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

    this.snapshot_bids = [...this.snapshot_bids];
    this.snapshot_asks = [...this.snapshot_asks];
  }

}
