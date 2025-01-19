import { EventParamsBuilder, EventProdParamsBuilder, EventReceiverParamsBuilder, GqlParamsBuilder } from "./builder";

/**
 * Creating a factory by passing in different values when instantiating classes
 */
export class ParamsFactory {
    createBuilder(defaultValues: string): GqlParamsBuilder {
        if (defaultValues === 'basic') {
            return new GqlParamsBuilder([], [], [], [{ key: 'IsBasic', value: true }])
        }
        if (defaultValues === 'advanced') {
            return new GqlParamsBuilder(['ObjectID'], [{ key: 'ObjectName', value: "Object1" }], [{ key: 'ObjectID', value: 1 }], [])
        }
        return new GqlParamsBuilder([], [], [], []);
    }
}

type EventBuilderType = 'receiver' | 'producer' | 'event';
type EventBuilderMap = {
    receiver: EventReceiverParamsBuilder;
    producer: EventProdParamsBuilder;
    event: EventParamsBuilder;
};
/**
 * Creating a factory by returning a differnt builder which extends the generic builder class
 */
export class EventParamsFactory {
    createBuilder<T extends EventBuilderType>(type?: T): EventBuilderMap[T] {
        switch (type) {
            case 'receiver':
                return new EventReceiverParamsBuilder() as EventBuilderMap[T];
            case 'producer':
                return new EventProdParamsBuilder() as EventBuilderMap[T];
            case 'event':
                return new EventParamsBuilder() as EventBuilderMap[T];
            default:
                return new EventParamsBuilder() as EventBuilderMap[T];
        }
    }
}

