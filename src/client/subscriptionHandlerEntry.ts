import { UInt32 } from "../types/baseTypes";
import { Id } from "./id";

export class SubscriptionHandlerEntry{
    constructor(
        public subscriptionId:UInt32,
        public handle: UInt32, 
        public id:Id, 
        public callback: (data: { id: Id, value: unknown }[]) => void
    ){}
}