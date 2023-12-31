import DexieBase, { Table } from "dexie";

export class Dexie extends DexieBase {
  charts!: Table<ICandleChartData>;

  constructor() {
    super("raccoon-investment");

    this.version(1).stores({
      charts: "[symbol_id+time]",
    });
  }
}

export const dexie = new Dexie();
