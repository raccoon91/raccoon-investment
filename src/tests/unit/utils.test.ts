import { describe, expect, test } from "vitest";
import { calculateProfitAndLoss } from "../../utils";
import { profitAndLossExceptionMocks, profitAndLossMocks, profitAndLossWithTaxMocks } from "./mock";

describe("utils test", () => {
  describe("calculate profit and loss", () => {
    test("test exception", () => {
      profitAndLossExceptionMocks.forEach(({ params, result }) => {
        const answer = calculateProfitAndLoss(params);

        expect(answer).toStrictEqual(result);
      });
    });

    test("test profit and loss", () => {
      profitAndLossMocks.forEach(({ params, result }) => {
        const answer = calculateProfitAndLoss(params);

        expect(answer).toStrictEqual(result);
      });
    });

    test("test buying and selling with tax", () => {
      profitAndLossWithTaxMocks.forEach(({ params, result }) => {
        const answer = calculateProfitAndLoss(params);

        expect(answer).toStrictEqual(result);
      });
    });
  });
});
