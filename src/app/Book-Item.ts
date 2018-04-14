export class BookItem {
    id: number;
    exchange: string;
    pairname: string;
    type: string;
    price: number;
    count: number;

    constructor (id: any, exchange: string, pairname: string, type: string, price: any, count: any){
        this.id = Number(id);
        this.exchange = exchange;
        this.pairname = pairname;
        this.type = type;
        this.price = Number(price);
        this.count = Number(count);
    }

    print(): string {
        return `$${this.price} (${this.count}) <${this.exchange}>`;
    }
}