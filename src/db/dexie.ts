import DexieBase, { Table } from "dexie";

export class Dexie extends DexieBase {
  etfs!: Table<IETFData>;
  stocks!: Table<IStockData>;

  constructor() {
    super("raccoon-investment");

    this.version(1).stores({
      etfs: "symbol",
      stocks: "symbol",
    });
  }
}

export const db = new Dexie();
