export interface ItemCart
{
    objectID: string;
    id: string;
    cartID: string;
    name: string;
    type: string;

    businessName: string;
    businessID: string;

    customerName: string;
    customerID: string;

    price: number;
    currency: string;
    image: any;
    category: string;
    stock: number;
    barcode: string;
    inventory_productID: string;
    finalPrice: number;
    quantity: number;
    status: string;

    city: string;
    locationDescription: string;

    orderID: string;
}
