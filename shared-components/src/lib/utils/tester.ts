import { EventParamsBuilder, EventProdParamsBuilder, EventReceiverParamsBuilder, GqlParamsBuilder } from "./builder";
import { EventParamsFactory, ParamsBuilderEnum, ParamsFactory } from "./factory";

/**
 * Facade for Parameter Factory and Builders
 */
class ParamsFacade {
    public factory: ParamsFactory;
    public defaultBuilder: GqlParamsBuilder;
    public basic: GqlParamsBuilder;
    public advanced: GqlParamsBuilder;

    constructor() {
        this.factory = new ParamsFactory();
        this.defaultBuilder = this.factory.createBuilder(ParamsBuilderEnum.FIRST);
        this.basic = this.factory.createBuilder(ParamsBuilderEnum.SECOND);
        this.advanced = this.factory.createBuilder(ParamsBuilderEnum.THIRD);
    }

    /**
     * Log Param Builders
     */
    testParams() {
        this.basic
            .addString('Name', 'Krash')
            .addString('Description', 'The best description ever.')
            .addInteger('ID', 1);

        console.log({
            basicBuilder: this.basic,
            advancedBuilder: this.advanced,
            defaultBuilder: this.defaultBuilder
        });

    }
}

/**
 * Facade for Event Factory and Builders
 */
class EventFacade {
    public eventFactory: EventParamsFactory;
    public event: EventParamsBuilder;
    public eventProducer: EventProdParamsBuilder;
    public eventReceiver: EventReceiverParamsBuilder;

    constructor() {
        this.eventFactory = new EventParamsFactory();
        this.event = this.eventFactory.createBuilder('event');
        this.eventProducer = this.eventFactory.createBuilder('producer');
        this.eventReceiver = this.eventFactory.createBuilder('receiver');
    }

    /**
     * Log Event Builders
     */
    testEvents() {
        this.event
            .addID(1)
            .addName('Event1');
        this.eventProducer
            .addID(1)
            .addName('EventProducer1');
        this.eventReceiver
            .addID(1)
            .addName('EventReceiver1');

        console.log({
            event: this.event,
            eventProducer: this.eventProducer,
            eventReceiver: this.eventReceiver
        });
    }
}

/**
 * Function to test all design patterns
 */
export const testerFn = (): void => {
    // Instantiate Systems
    const paramsFacade = new ParamsFacade();
    const eventFacade = new EventFacade();
    // Log Data
    paramsFacade.testParams();
    eventFacade.testEvents();
}