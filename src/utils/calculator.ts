/*
  bp: buying price,
  sp: selling price,
  nos: number of stock,
  bcp: buying commission percentage,
  scp: selling commission percentage,
  ttp: transaction tax percentage,
*/

import { isNil } from "lodash-es";

export type CalculateStockReturn = ({
  bp,
  sp,
  nos,
  bcp,
  scp,
  ttp,
}: {
  bp?: number;
  sp?: number;
  nos?: number;
  bcp?: number;
  scp?: number;
  ttp?: number;
}) => {
  buyingCommission: number | null;
  sellingCommission: number | null;
  transactionTax: number | null;
  totalCommission: number | null;
  profitAndLoss: number;
} | null;

export const calculateStockReturn: CalculateStockReturn = ({ bp, sp, nos, bcp, scp, ttp }) => {
  if (isNil(bp) || isNil(sp) || isNil(nos)) return null;

  if (bp < 0 || sp < 0 || nos < 0) return null;

  let buyingCommission = null;
  let sellingCommission = null;
  let transactionTax = null;
  let totalCommission = null;
  let profitAndLoss = 0;

  if (!isNil(bcp) && !isNil(scp) && !isNil(ttp)) {
    buyingCommission = bp * nos * (bcp / 100);
    sellingCommission = sp * nos * (scp / 100);
    transactionTax = sp * nos * (ttp / 100);
    totalCommission = buyingCommission + sellingCommission;
    profitAndLoss = (sp - bp) * nos - (buyingCommission + sellingCommission + transactionTax);
  } else {
    profitAndLoss = (sp - bp) * nos;
  }

  return {
    buyingCommission,
    sellingCommission,
    totalCommission,
    transactionTax,
    profitAndLoss,
  };
};
