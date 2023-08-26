import DexieBase, { Table } from "dexie";

export class Dexie extends DexieBase {
  favorites!: Table<ISymbolData>;
  charts!: Table<ICandleChartData>;
  markers!: Table<IMarkerData>;

  constructor() {
    super("raccoon-investment");

    this.version(1).stores({
      favorites: "id",
      charts: "[id+time]",
      markers: "[id+time]",
    });
  }
}

export const db = new Dexie();
