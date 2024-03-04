import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed";
import CustomerCreatedEvent from "../customer-created.event";

export class SendMailWhenChangedAddress implements EventHandlerInterface<CustomerAddressChangedEvent>
{
    handle(event: CustomerAddressChangedEvent ): void {
        //console.log(event);
        console.log(
          `Endereço do cliente: ${event.id}, ${event.name} 
           alterado para: ${event.newAddress._street},
           ${event.newAddress._number}, 
           ${event.newAddress._zip}, 
           ${event.newAddress._city}`,
        );
      }
}