import { ArgumentsType } from "vitest";
import { CalculateStockReturn } from "../utils";

type Mock = {
  params: ArgumentsType<CalculateStockReturn>[0];
  result: ReturnType<CalculateStockReturn>;
}[];

export const stockReturnExceptionMocks: Mock = [
  { params: {}, result: null },
  { params: { bp: 1000 }, result: null },
  { params: { bp: 1000, sp: 1000 }, result: null },
  { params: { bp: 1000, sp: 1000, nos: -10 }, result: null },
  { params: { bp: -1000 }, result: null },
  { params: { bp: -1000, sp: -1000 }, result: null },
  { params: { bp: -1000, sp: -1000, nos: 10 }, result: null },
];

export const stockReturnMocks: Mock = [
  {
    params: { bp: 1000, sp: 1000, nos: 10 },
    result: {
      buyingCommission: null,
      sellingCommission: null,
      totalCommission: null,
      transactionTax: null,
      profitAndLoss: 0,
    },
  },
  {
    params: { bp: 1000, sp: 900, nos: 10 },
    result: {
      buyingCommission: null,
      sellingCommission: null,
      totalCommission: null,
      transactionTax: null,
      profitAndLoss: -1000,
    },
  },
  {
    params: { bp: 1000, sp: 1100, nos: 10 },
    result: {
      buyingCommission: null,
      sellingCommission: null,
      totalCommission: null,
      transactionTax: null,
      profitAndLoss: 1000,
    },
  },
];

export const stockReturnWithTaxMocks: Mock = [
  {
    params: { bp: 1000, sp: 1000, nos: 10, bcp: 0.1, scp: 0.1, ttp: 0.2 },
    result: {
      buyingCommission: 10,
      sellingCommission: 10,
      totalCommission: 20,
      transactionTax: 20,
      profitAndLoss: -40,
    },
  },
  {
    params: { bp: 1000, sp: 900, nos: 10, bcp: 0.1, scp: 0.1, ttp: 0.2 },
    result: {
      buyingCommission: 10,
      sellingCommission: 9,
      totalCommission: 19,
      transactionTax: 18,
      profitAndLoss: -1000 - 19 - 18,
    },
  },
  {
    params: { bp: 1000, sp: 1100, nos: 10, bcp: 0.1, scp: 0.1, ttp: 0.2 },
    result: {
      buyingCommission: 10,
      sellingCommission: 11,
      totalCommission: 21,
      transactionTax: 22,
      profitAndLoss: 1000 - 21 - 22,
    },
  },
];
