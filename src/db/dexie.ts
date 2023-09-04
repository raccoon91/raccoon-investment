import DexieBase, { Table } from "dexie";

export class Dexie extends DexieBase {
  charts!: Table<ICandleChartData>;
  trades!: Table<ITradeData>;
  markers!: Table<IMarkerData>;

  constructor() {
    super("raccoon-investment");

    this.version(1).stores({
      charts: "[id+time]",
      trades: "[id+time]",
      markers: "[id+time]",
    });
  }
}

export const db = new Dexie();
