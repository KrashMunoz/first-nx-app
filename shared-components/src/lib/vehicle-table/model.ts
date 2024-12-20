export type Vehicle = {
  name: string;
  type: 'truck' | 'car' | 'plane' | 'boat';
  status: 'mint' | 'degraded' | 'destroyed';
  inTransit: boolean;
  inventory: InventoryItem[];
};

export type InventoryItem = {
  name: string;
  quantity: number;
  maxQuantity: number;
};
export const sortRowsByName = (
  rows: InventoryItem[],
  referenceObj: Record<string, number>
) => {
  return rows.sort((a, b) => {
    // Check if name exists in the reference object
    const aExists = referenceObj.hasOwnProperty(a.name);
    const bExists = referenceObj.hasOwnProperty(b.name);

    // If a and b both exist or both don't exist, maintain original order
    if (aExists === bExists) {
      return 0;
    }

    // Otherwise, prioritize the row that exists in the reference object
    return aExists ? -1 : 1;
  });
};

export const groupInventories = (
  acc: Record<string, number>,
  vehicleEntries: [string, Record<string, number>]
) => {
  for (const key in vehicleEntries[1]) {
    const qty = vehicleEntries[1][key];
    if (!!acc.hasOwnProperty(key)) {
      acc[key] += qty;
    } else {
      acc[key] = qty;
    }
  }
  return acc;
};

export const removeNullOrZeroProperties = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== null && value !== 0)
  );
};

export function compareMaps(
  targetMap: Record<string, number>,
  toMoveMap: Record<string, number>
) {
  // Iterate over each property in targetMap
  for (let key in targetMap) {
    // Check if the property exists in toMoveMap
    if (!toMoveMap.hasOwnProperty(key)) {
      return false; // If the property doesn't exist in toMoveMap, return false
    }

    // Check if the value in toMoveMap is greater than or equal to the value in targetMap
    if (toMoveMap[key] < targetMap[key]) {
      return false; // If the value in toMoveMap is smaller, return false
    }
  }

  // If all properties match the conditions, return true
  return true;
}

export function removeNullOrZeroRecursive(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => {
        // If the value is an object, recursively clean it
        if (!!value && typeof value === 'object') {
          value = removeNullOrZeroRecursive(value); // Recursively clean nested objects

          // If it's an empty object at the first level, return undefined
          if (Object.keys(value as any).length === 0) {
            return undefined;
          }
        }

        // Only return the entry if the value is not null, 0, or an empty object
        if (value !== null && value !== 0) {
          return [key, value]; // Return the key-value pair
        }

        // Return undefined if the value is null, 0, or an empty object
        return undefined;
      })
      .filter((entry): entry is [string, any] => entry !== undefined) // Remove undefined entries
  );
}

export const mockVehicleData: Vehicle[] = [
  {
    name: 'Ford F-150',
    type: 'truck',
    status: 'mint',
    inTransit: false,
    inventory: [
      { name: 'Tires', quantity: 4, maxQuantity: 10 },
      { name: 'Engine Oil', quantity: 5, maxQuantity: 15 },
      { name: 'Spare Parts', quantity: 10, maxQuantity: 10 },
      { name: 'Jet Fuel', quantity: 200, maxQuantity: 400 }, // Shared with Boeing 747
    ],
  },
  {
    name: 'Boeing 747',
    type: 'plane',
    status: 'degraded',
    inTransit: true,
    inventory: [
      { name: 'Jet Fuel', quantity: 20000, maxQuantity: 25000 }, // Shared with Ford F-150
      { name: 'Air Filters', quantity: 50, maxQuantity: 60 },
      { name: 'Tires', quantity: 6, maxQuantity: 10 }, // Shared with Ford F-150
    ],
  },
  {
    name: 'Tesla Model S',
    type: 'car',
    status: 'mint',
    inTransit: false,
    inventory: [
      { name: 'Tires', quantity: 4, maxQuantity: 10 }, // Shared with Ford F-150 and Boeing 747
      { name: 'Charging Cables', quantity: 2, maxQuantity: 10 },
      { name: 'Brake Pads', quantity: 4, maxQuantity: 10 }, // Shared with Chevy Silverado
    ],
  },
  {
    name: 'Yamaha 242X',
    type: 'boat',
    status: 'destroyed',
    inTransit: false,
    inventory: [
      { name: 'Life Jackets', quantity: 8, maxQuantity: 10 },
      { name: 'Fuel', quantity: 500, maxQuantity: 500 },
      { name: 'Tires', quantity: 2, maxQuantity: 5 }, // Shared with Tesla Model S and Boeing 747
    ],
  },
  {
    name: 'Chevy Silverado',
    type: 'truck',
    status: 'degraded',
    inTransit: true,
    inventory: [
      { name: 'Brake Pads', quantity: 10, maxQuantity: 10 }, // Shared with Tesla Model S
      { name: 'Coolant', quantity: 5, maxQuantity: 10 },
      { name: 'Towing Hitch', quantity: 1, maxQuantity: 4 },
      { name: 'Tires', quantity: 6, maxQuantity: 10 }, // Shared with Tesla Model S
    ],
  },
];
