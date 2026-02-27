import { Id } from "./id";

export class SubscriptionHandlerEntry{
    constructor(
        public subscriptionId:number,
        public handle: number, 
        public id:Id, 
        public callback: (data: { id: Id, value: unknown }[]) => void
    ){}
}