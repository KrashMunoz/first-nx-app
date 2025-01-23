import { ExtendedBuilder, GqlParamsBuilder } from "./builder";
import { Attribute, DomainType } from "./test-data";

export class GqlParamsResolver {
    constructor(builder: ExtendedBuilder) {
        console.log("Extend Builder Resolver", builder)
    }
}

/**
 * @todo Add a property for name attribute and id attribute that can be passed in dynamic params class
 */
export interface AdaptedType {
    primaryKey: string;
    stringAttributes: string[];
    integerAttributes: string[];
}

// Should Return {ExtendedBuilder}
export const resolveBuilderType = (domainType: DomainType) => {
    const { type, attributes } = domainType;
    const adaptedType: AdaptedType = attributes.reduce(adaptType, {
        primaryKey: '',
        stringAttributes: [],
        integerAttributes: []
    } as AdaptedType);
    const { primaryKey, stringAttributes, integerAttributes } = adaptedType;
    // return new GqlParamsBuilder([primaryKey], stringAttributes, integerAttributes, [])
}

export const adaptType = (acc: AdaptedType, currType: Attribute) => {
    const { primary, key, input } = currType;
    if (primary) {
        acc.primaryKey = key;
    }
    if (input === 'integer') {
        acc.integerAttributes.push(key);
    }
    if (input === 'string') {
        acc.stringAttributes.push(key);
    }
    return acc;
}