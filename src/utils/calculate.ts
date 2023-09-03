/*
  bp: buying price,
  sp: selling price,
  nos: number of stock,
  bcp: buying commission percentage,
  scp: selling commission percentage,
*/

import { isNil } from "lodash-es";

export type CalculateStockReturn = ({
  bp,
  sp,
  nos,
  bcp,
  scp,
}: {
  bp?: number | null;
  sp?: number | null;
  nos?: number | null;
  bcp?: number | null;
  scp?: number | null;
}) => {
  buyingCommission: number | null;
  sellingCommission: number | null;
  transactionTax: number | null;
  totalCommission: number | null;
  profitAndLoss: number;
} | null;

export const calculateStockReturn: CalculateStockReturn = ({ bp, sp, nos, bcp, scp }) => {
  if (isNil(bp) || isNil(sp) || isNil(nos)) return null;

  if (bp < 0 || sp < 0 || nos < 0) return null;

  let buyingCommission = null;
  let sellingCommission = null;
  let transactionTax = null;
  let TAFTax = null;
  let SECTax = null;
  let totalCommission = null;
  let profitAndLoss = 0;

  if (!isNil(bcp) && !isNil(scp)) {
    buyingCommission = Number((bp * nos * (bcp / 100)).toFixed(2));
    sellingCommission = Number((sp * nos * (scp / 100)).toFixed(2));
    totalCommission = Number((buyingCommission + sellingCommission).toFixed(2));

    TAFTax = (nos * 0.0145) / 100;
    SECTax = (sp * nos * 0.0008) / 100;

    if (TAFTax < 0.01) {
      TAFTax = 0.01;
    } else if (TAFTax > 7.27) {
      TAFTax = 7.27;
    }

    if (SECTax < 0.01) {
      SECTax = 0.01;
    }

    transactionTax = Number((TAFTax + SECTax).toFixed(2));
    profitAndLoss = Number(((sp - bp) * nos - (buyingCommission + sellingCommission + transactionTax)).toFixed(2));
  } else {
    profitAndLoss = Number(((sp - bp) * nos).toFixed(2));
  }

  return {
    buyingCommission,
    sellingCommission,
    totalCommission,
    transactionTax,
    profitAndLoss,
  };
};
