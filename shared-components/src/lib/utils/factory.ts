import { EventParamsBuilder, EventProdParamsBuilder, EventReceiverParamsBuilder, GqlParamsBuilder } from "./builder";

export enum ParamsBuilderEnum {
    FIRST,
    SECOND,
    THIRD
}
export type ParamsBuilderType = ParamsBuilderEnum;

/**
 * Creating a factory by passing in different values when instantiating classes
 */
export class ParamsFactory {
    createBuilder(type: ParamsBuilderEnum): GqlParamsBuilder {
        const primaryKeys = [];
        switch (type) {
            case ParamsBuilderEnum.FIRST:
                primaryKeys.push('FIRST')
                return new GqlParamsBuilder(primaryKeys, [], [], [{ key: 'isFirst', value: true }]);
            case ParamsBuilderEnum.SECOND:
                primaryKeys.push('SECOND')
                return new GqlParamsBuilder(primaryKeys, [], [], [{ key: 'isFirst', value: false }]);
            case ParamsBuilderEnum.THIRD:
                primaryKeys.push('THIRD')
                return new GqlParamsBuilder(primaryKeys, [{ key: 'ObjectName', value: "Object1" }], [{ key: 'ObjectID', value: 1 }], []);
        }
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

