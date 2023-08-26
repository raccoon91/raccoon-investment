import { describe, expect, test } from "vitest";
import { calculateStockReturn } from "../utils";
import { stockReturnExceptionMocks, stockReturnMocks, stockReturnWithTaxMocks } from "./mock";

describe("utils test", () => {
  describe("calculate stock return", () => {
    test("test exception", () => {
      stockReturnExceptionMocks.forEach(({ params, result }) => {
        const answer = calculateStockReturn(params);

        expect(answer).toStrictEqual(result);
      });
    });

    test("test buying and selling", () => {
      stockReturnMocks.forEach(({ params, result }) => {
        const answer = calculateStockReturn(params);

        expect(answer).toStrictEqual(result);
      });
    });

    test("test buying and selling with tax", () => {
      stockReturnWithTaxMocks.forEach(({ params, result }) => {
        const answer = calculateStockReturn(params);

        expect(answer).toStrictEqual(result);
      });
    });
  });
});
