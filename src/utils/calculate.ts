/*
  bp: buying price,
  sp: selling price,
  nos: number of stock,
  bcp: buying commission percentage,
  scp: selling commission percentage,
*/

import { isNil } from "lodash-es";

export type CalculateBuyPrice = ({
  bp,
  nos,
  bcp,
}: {
  bp?: number | null;
  nos?: number | null;
  bcp?: number | null;
}) => {
  price: number;
  buyingCommission: number | null;
  calculatePrice: number;
} | null;

export type CalculateSellPrice = ({
  sp,
  nos,
  scp,
}: {
  sp?: number | null;
  nos?: number | null;
  scp?: number | null;
}) => {
  price: number;
  sellingCommission: number | null;
  TAFTax: number | null;
  SECTax: number | null;
  transactionTax: number | null;
  calculatePrice: number;
} | null;

export type CalculateProfitAndLoss = ({
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

export const calculateBuyPrice: CalculateBuyPrice = ({ bp, nos, bcp }) => {
  if (isNil(bp) || isNil(nos) || isNil(bcp)) return null;

  if (bp < 0 || nos < 0 || bcp < 0) return null;

  let price = 0;
  let buyingCommission = null;
  let calculatePrice = 0;

  price = Number((bp * nos).toFixed(2));
  buyingCommission = Number((bp * nos * (bcp / 100)).toFixed(2));
  calculatePrice = price - buyingCommission;

  return {
    price,
    buyingCommission,
    calculatePrice,
  };
};

export const calculateSellPrice: CalculateSellPrice = ({ sp, nos, scp }) => {
  if (isNil(sp) || isNil(nos) || isNil(scp)) return null;

  if (sp < 0 || nos < 0 || scp < 0) return null;

  let price = 0;
  let sellingCommission = null;
  let transactionTax = null;
  let TAFTax = null;
  let SECTax = null;
  let calculatePrice = 0;

  sellingCommission = Number((sp * nos * (scp / 100)).toFixed(2));

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

  price = Number((sp * nos).toFixed(2));
  transactionTax = Number((TAFTax + SECTax).toFixed(2));
  calculatePrice = price - transactionTax;

  return {
    price,
    sellingCommission,
    TAFTax,
    SECTax,
    transactionTax,
    calculatePrice,
  };
};

export const calculateProfitAndLoss: CalculateProfitAndLoss = ({ bp, sp, nos, bcp, scp }) => {
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
