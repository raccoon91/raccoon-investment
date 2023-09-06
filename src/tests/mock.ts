import { ArgumentsType } from "vitest";
import { CalculateProfitAndLoss } from "../utils";

type Mock = {
  params: ArgumentsType<CalculateProfitAndLoss>[0];
  result: ReturnType<CalculateProfitAndLoss>;
}[];

export const profitAndLossExceptionMocks: Mock = [
  { params: {}, result: null },
  { params: { bp: 1000 }, result: null },
  { params: { bp: 1000, sp: 1000 }, result: null },
  { params: { bp: 1000, sp: 1000, nos: -10 }, result: null },
  { params: { bp: -1000 }, result: null },
  { params: { bp: -1000, sp: -1000 }, result: null },
  { params: { bp: -1000, sp: -1000, nos: 10 }, result: null },
];

export const profitAndLossMocks: Mock = [
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

/*
  bp: 154.83
  sp: 155.77
  nox: 5
  bcp: 0.1
  scp: 0.1

  cp: 1.54
  ttp: 0.02
  pal: 3.14
*/

export const profitAndLossWithTaxMocks: Mock = [
  {
    params: { bp: 1000, sp: 1000, nos: 10, bcp: 0.1, scp: 0.1 },
    result: {
      buyingCommission: 10,
      sellingCommission: 10,
      totalCommission: 20,
      transactionTax: 20,
      profitAndLoss: -40,
    },
  },
  {
    params: { bp: 1000, sp: 900, nos: 10, bcp: 0.1, scp: 0.1 },
    result: {
      buyingCommission: 10,
      sellingCommission: 9,
      totalCommission: 19,
      transactionTax: 18,
      profitAndLoss: -1000 - 19 - 18,
    },
  },
  {
    params: { bp: 1000, sp: 1100, nos: 10, bcp: 0.1, scp: 0.1 },
    result: {
      buyingCommission: 10,
      sellingCommission: 11,
      totalCommission: 21,
      transactionTax: 22,
      profitAndLoss: 1000 - 21 - 22,
    },
  },
];
