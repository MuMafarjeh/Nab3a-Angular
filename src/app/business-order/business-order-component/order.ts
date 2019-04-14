import { DateAdapter } from '@angular/material';
import { Timestamp } from 'rxjs';
import { Time } from '@angular/common';
export interface Order
{
    name: string;
    customerName: string;
    price: number;
    timeGenerated: Date;
    timeReceiving: Date;
    id:string;
    TGDate: Date;
    TRDate: Date;
}
