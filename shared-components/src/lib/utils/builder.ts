import { AdaptedType, adaptType } from "./resolver";
import { DomainType } from "./test-data";

export interface StringEntryInput {
    key: string;
    value: string;
}

export interface IntegerEntryInput {
    key: string;
    value: number;
}

export interface BooleanEntryInput {
    key: string;
    value: boolean;
}

export interface ExtendedBuilder extends GqlParamsBuilder {
    addName(name: string): this;
    addID(id: number): this;
}

export class GqlParamsBuilder {
    constructor(
        public primaryKeys: string[],
        public strings: StringEntryInput[],
        public integers: IntegerEntryInput[],
        public booleans: BooleanEntryInput[],
    ) { }

    // SETTER
    public addPrimaryKeys(keys: string[]) {
        this.primaryKeys = [...keys];
        return this;
    }
    public addStrings(strings: StringEntryInput[]) {
        this.strings = [...strings];
        return this;
    }
    public addIntegers(integers: IntegerEntryInput[]) {
        this.integers = [...integers];
        return this;
    }
    public addBooleans(booleans: BooleanEntryInput[]) {
        this.booleans = [...booleans];
        return this;
    }

    // APPENDERS
    public addKey(key: string) {
        this.primaryKeys = [...this.primaryKeys, key];
        return this;
    }
    public addString(key: string, value: string) {
        this.strings = [...this.strings, { key, value }];
        return this;
    }
    public addInteger(key: string, value: number) {
        this.integers = [...this.integers, { key, value }];
        return this;
    }
    public addBoolean(key: string, value: boolean) {
        this.booleans = [...this.booleans, { key, value }];
        return this;
    }
}

/**
 * Dynamic Params Builder with High order function
 * @todo consider using composition instead of inheritance
 */
type Callback = (data: any) => void;
/** Dynamic Params Builder @extends {GqlParamsBuilder} */
export class DynamicParamsBuilder extends GqlParamsBuilder {
    constructor(domainType: DomainType) {
        // const primaryKeys: string[] = [];
        const strings: StringEntryInput[] = [];
        const integers: IntegerEntryInput[] = [];
        const booleans: BooleanEntryInput[] = [];

        const { type, attributes } = domainType;
        const adaptedType: AdaptedType = attributes.reduce(adaptType, {
            primaryKey: '',
            stringAttributes: [],
            integerAttributes: []
        } as AdaptedType);
        const { primaryKey, stringAttributes, integerAttributes } = adaptedType;
        super([primaryKey], [], [], [])
    }

    /**
     * Add Name
     * @method adds name based on dynamic type
     * @param callback 
     * @param input 
     * @returns 
     */
    public addName(callback: Callback, input: any): this {
        callback(input);
        return this;
    }

    /**
     * Add ID
     * @method adds id based on dynamic type
     * @param callback 
     * @param input 
     * @returns 
     */
    public addID(callback: Callback, input: any): this {
        callback(input);
        return this;
    }
}

// Experimenting with Domain Specific Stuff
export class EventParamsBuilder extends GqlParamsBuilder implements ExtendedBuilder {
    constructor() {
        const primaryKeys = ['EventID']
        super(primaryKeys, [], [], [])
    }

    /**
     * Add Event Name
     * @param {string} name 
     * @returns {EventParamsBuilder}
     */
    public addName(name: string): this {
        const strings = [
            {
                key: 'EventName',
                value: name,
            },
            {
                key: 'universalName',
                value: name,
            },
        ]
        return this.addStrings(strings);
    }

    /**
     * Add Event ID
     * @param {string} id 
     * @returns {EventParamsBuilder}
     */
    public addID(id: number): this {
        const integers = [
            {
                key: 'EventID',
                value: id,
            },
            {
                key: 'universalID',
                value: id,
            },
        ]
        return this.addIntegers(integers);
    }
}


export class EventProdParamsBuilder extends GqlParamsBuilder implements ExtendedBuilder {
    constructor() {
        const primaryKeys = ['EventProducerID']
        super(primaryKeys, [], [], [])
    }

    /**
     * Add Event Producer Name
     * @param {string} name 
     * @returns {EventProdParamsBuilder}
     */
    public addName(name: string): this {
        const strings = [
            {
                key: 'Name',
                value: name,
            },
            {
                key: 'universalName',
                value: name,
            },
        ]
        return this.addStrings(strings);
    }

    /**
     * Add Event Producer ID
     * @param {number} id 
     * @returns {EventProdParamsBuilder}
     */
    public addID(id: number): this {
        const integers = [
            {
                key: 'EventProducerID',
                value: id,
            },
            {
                key: 'universalID',
                value: id,
            },
        ]
        return this.addIntegers(integers);
    }
}

export class EventReceiverParamsBuilder extends GqlParamsBuilder implements ExtendedBuilder {
    constructor() {
        const primaryKeys = ['EventReceiverID']
        super(primaryKeys, [], [], [])
    }

    /**
     * Add Event Receiver name
     * @param {string} name 
     * @returns {EventReceiverParamsBuilder}
     */
    public addName(name: string): this {
        const strings = [
            {
                key: 'EventReceiverName',
                value: name,
            },
            {
                key: 'universalName',
                value: name,
            },
        ]
        return this.addStrings(strings)
    }

    /**
     * Add Event Receiver ID
     * @param {number} id 
     * @returns {EventReceiverParamsBuilder}
     */
    public addID(id: number): this {
        const integers = [
            {
                key: 'EventReceiver',
                value: id,
            },
            {
                key: 'universalID',
                value: id,
            },
        ]
        return this.addIntegers(integers);
    }
}