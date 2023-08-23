import DexieBase, { Table } from "dexie";

export class Dexie extends DexieBase {
  etfs!: Table<IETFData>;
  stocks!: Table<IStockData>;
  favorites!: Table<ISymbolData>;
  charts!: Table<ICandleChartData>;

  constructor() {
    super("raccoon-investment");

    this.version(1).stores({
      etfs: "symbol",
      stocks: "symbol",
      favorites: "symbol",
      charts: "[symbol+time]",
    });
  }
}

export const db = new Dexie();
