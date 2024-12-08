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
};

export const mockVehicleData: Vehicle[] = [
  {
    name: 'Ford F-150',
    type: 'truck',
    status: 'mint',
    inTransit: false,
    inventory: [
      { name: 'Tires', quantity: 4 },
      { name: 'Engine Oil', quantity: 5 },
      { name: 'Spare Parts', quantity: 10 },
      { name: 'Jet Fuel', quantity: 200 }, // Shared with Boeing 747
    ],
  },
  {
    name: 'Boeing 747',
    type: 'plane',
    status: 'degraded',
    inTransit: true,
    inventory: [
      { name: 'Jet Fuel', quantity: 20000 }, // Shared with Ford F-150
      { name: 'Air Filters', quantity: 50 },
      { name: 'Tires', quantity: 6 }, // Shared with Ford F-150
    ],
  },
  {
    name: 'Tesla Model S',
    type: 'car',
    status: 'mint',
    inTransit: false,
    inventory: [
      { name: 'Tires', quantity: 4 }, // Shared with Ford F-150 and Boeing 747
      { name: 'Charging Cables', quantity: 2 },
      { name: 'Brake Pads', quantity: 4 }, // Shared with Chevy Silverado
    ],
  },
  {
    name: 'Yamaha 242X',
    type: 'boat',
    status: 'destroyed',
    inTransit: false,
    inventory: [
      { name: 'Life Jackets', quantity: 8 },
      { name: 'Fuel', quantity: 500 },
      { name: 'Tires', quantity: 2 }, // Shared with Tesla Model S and Boeing 747
    ],
  },
  {
    name: 'Chevy Silverado',
    type: 'truck',
    status: 'degraded',
    inTransit: true,
    inventory: [
      { name: 'Brake Pads', quantity: 10 }, // Shared with Tesla Model S
      { name: 'Coolant', quantity: 5 },
      { name: 'Towing Hitch', quantity: 1 },
      { name: 'Tires', quantity: 6 }, // Shared with Tesla Model S
    ],
  },
];
