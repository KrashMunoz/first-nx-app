import { EventParamsFactory, ParamsFactory } from "./factory";

export const testerFn = () => {
    // Generic Params Factory
    const factory = new ParamsFactory();
    const basicBuilder = factory.createBuilder('basic');
    const advancedBuilder = factory.createBuilder('advanced');
    const defaultBuilder = factory.createBuilder('default');

    // Domain Specific Factory
    const eventFactory = new EventParamsFactory();
    const event = eventFactory.createBuilder('event');
    const eventProducer = eventFactory.createBuilder('producer');
    const eventReceiver = eventFactory.createBuilder('receiver');

    // Append Items to Basic
    basicBuilder
        .addString('Name', 'Krash')
        .addString('Description', 'The best description ever.')
        .addInteger('ID', 1);

    console.log({
        basicBuilder,
        advancedBuilder,
        defaultBuilder
    });


    // Build Out each builder
    event
        .addID(1)
        .addName('Event1');

    eventProducer
        .addID(1)
        .addName('EventProducer1');

    eventReceiver
        .addID(1)
        .addName('EventReceiver1')

    console.log({
        event,
        eventProducer,
        eventReceiver
    });
}