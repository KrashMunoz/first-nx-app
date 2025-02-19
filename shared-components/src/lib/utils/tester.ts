import { EventParamsBuilder, EventProdParamsBuilder, EventReceiverParamsBuilder, GqlParamsBuilder } from "./builder";
import { EventParamsFactory, ParamsBuilderEnum, ParamsFactory } from "./factory";
import { GqlParamsResolver } from "./resolver";

/**
 * Facade for Parameter Factory and Builders
 */
class ParamsFacade {
    public factory: ParamsFactory;
    public first: GqlParamsBuilder;
    public second: GqlParamsBuilder;
    public third: GqlParamsBuilder;

    constructor() {
        this.factory = new ParamsFactory();
        this.first = this.factory.createBuilder(ParamsBuilderEnum.FIRST);
        this.second = this.factory.createBuilder(ParamsBuilderEnum.SECOND);
        this.third = this.factory.createBuilder(ParamsBuilderEnum.THIRD);
    }

    /**
     * Log Param Builders
     */
    testParams() {
        this.second
            .addString('Name', 'Krash')
            .addString('Description', 'The best description ever.')
            .addInteger('ID', 1);
        const { factory, ...paramObjects } = this;
        console.log(paramObjects);
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
    public testEvents(): void {
        this.event
            .addID(1)
            .addName('Event1');
        this.eventProducer
            .addID(1)
            .addName('EventProducer1');
        this.eventReceiver
            .addID(1)
            .addName('EventReceiver1');
        const { eventFactory, ...eventData } = this;
        console.log(eventData);
    }

    public testResolver(): void {
        const callResolver = new GqlParamsResolver(this.eventProducer);
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
    eventFacade.testResolver();
}