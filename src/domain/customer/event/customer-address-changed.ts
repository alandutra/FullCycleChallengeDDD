import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

export default class CustomerAddressChangedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;
    id: string;
    name: string;
    newAddress: Address;

    constructor(eventData: any) {
      this.dataTimeOccurred = new Date();
      this.id = eventData.id;
      this.name = eventData.name;
      this.newAddress = eventData.Address;
    }
  }