import EventDispatcher from "../../../@shared/event/event-dispatcher";
import Customer from "../../entity/customer";
import Address from "../../value-object/address";
import CustomerAddressChangedEvent from "../customer-address-changed";
import CustomerCreatedEvent from "../customer-created.event";
import { FirstLogChallengeCreateEvent } from "./first-log-challenge-create-event";
import { SecondLogChallengeCreateEvent } from "./second-log-challenge-create-event";
import { SendMailWhenChangedAddress } from "./send-mail-when-changed-address";

describe("Customer created event tests", () => {
	it("should notify all event handlers when customer is created", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler1 = new FirstLogChallengeCreateEvent();
		const eventHandler2 = new SecondLogChallengeCreateEvent();

		const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
		const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

		eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
		eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

		expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

		const eventPayload = {
			customer: {
				id: "123",
				name: "Test Customer"
			}			
		};

		const customerCreatedEvent = new CustomerCreatedEvent(eventPayload);

		eventDispatcher.notify(customerCreatedEvent);

		expect(spyEventHandler1).toHaveBeenCalled();
		expect(spyEventHandler2).toHaveBeenCalled();
	});

    it('should notify all event handlers when customer address change', () => {
        const eventDispatcher = new EventDispatcher();
    
        const sendMessageWhenAddressChangeHandler =
          new SendMailWhenChangedAddress();
    
        /**
         * spyEventHandler fica "espiando" se o método handle é executado
         */
        const spyEventHandlerMessageOne = jest.spyOn(sendMessageWhenAddressChangeHandler,'handle',);
    
        let customer = new Customer('123', 'Customer 1');
    
        const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
        customer.changeAddress(address);
    
        eventDispatcher.register(
          'CustomerAddressChangedEvent',
          sendMessageWhenAddressChangeHandler,
        );
    
        const customerAddressChangeEvent = new CustomerAddressChangedEvent(customer);
            
        eventDispatcher.notify(customerAddressChangeEvent);
    
        expect(spyEventHandlerMessageOne).toHaveBeenCalled();
      });

});