import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed";

export class SendMailWhenChangedAddress implements EventHandlerInterface<CustomerAddressChangedEvent>
{
    handle(event: CustomerAddressChangedEvent ): void {
        console.log(
          `Endereço do cliente: ${event.id}, ${event.name} 
           alterado para: ${event.newAddress._street},
           ${event.newAddress._number}, 
           ${event.newAddress._zip}, 
           ${event.newAddress._city}`,
        );
      }
}