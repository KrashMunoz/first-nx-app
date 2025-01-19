import { BooleanEntryInput, EventParamsBuilder, EventProdParamsBuilder, EventReceiverParamsBuilder, GqlParamsBuilder, IntegerEntryInput, StringEntryInput } from "./builder";

export enum ParamsBuilderEnum {
    FIRST,
    SECOND,
    THIRD
}

/**
 * Creating a factory by passing in different values when instantiating classes
 */
export class ParamsFactory {
    createBuilder(type: ParamsBuilderEnum): GqlParamsBuilder {
        const primaryKeys: string[] = [];
        const strings: StringEntryInput[] = [];
        const integers: IntegerEntryInput[] = [];
        const booleans: BooleanEntryInput[] = [];

        switch (type) {
            case ParamsBuilderEnum.FIRST:
                primaryKeys.push('FIRST');
                booleans.push({ key: 'isFirst', value: true });
                return new GqlParamsBuilder(primaryKeys, strings, integers, booleans);
            case ParamsBuilderEnum.SECOND:
                primaryKeys.push('SECOND');
                booleans.push({ key: 'isFirst', value: false });
                return new GqlParamsBuilder(primaryKeys, strings, integers, booleans);
            case ParamsBuilderEnum.THIRD:
                primaryKeys.push('THIRD');
                strings.push({ key: 'ObjectName', value: "Object1" });
                integers.push({ key: 'ObjectID', value: 1 });
                return new GqlParamsBuilder(primaryKeys, strings, integers, booleans);
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

