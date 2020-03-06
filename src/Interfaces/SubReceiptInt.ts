import Product from './Produtuct';

export default interface SubReceiptInt {
    id: number;
    category: string;
    products: Product[];
    lastId: number;
}
