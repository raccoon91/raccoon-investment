import DexieBase, { Table } from "dexie";

export class Dexie extends DexieBase {
  charts!: Table<ICandleChartData>;
  trades!: Table<ITradeData>;
  markers!: Table<IMarkerData>;

  constructor() {
    super("raccoon-investment");

    this.version(1).stores({
      charts: "[symbol_id+time]",
      trades: "[symbol_id+id]",
      markers: "[symbol_id+id]",
    });
  }
}

export const db = new Dexie();
