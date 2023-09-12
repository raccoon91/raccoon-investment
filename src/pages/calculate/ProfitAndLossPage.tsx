import { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, VStack, Wrap } from "@chakra-ui/react";
import { ContentsLayout } from "../../layouts";
import { calculateProfitAndLoss } from "../../utils";

export const ProfitAndLossPage = () => {
  const [input, setInput] = useState<Record<string, number | string | null>>({
    bp: "154.83",
    sp: "155.77",
    nos: "5",
    bcp: "0.1",
    scp: "0.1",
    ttp: "0.0153",
  });
  const [output, setOutput] = useState<Record<string, number | null> | null>({
    buyingCommission: null,
    sellingCommission: null,
    totalCommission: null,
    transactionTax: null,
    profitAndLoss: null,
  });

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const output = calculateProfitAndLoss(input);

    setOutput(output);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput(p => ({ ...p, [name]: value }));
  };

  return (
    <ContentsLayout>
      <Wrap spacing="60px">
        <VStack as="form" align="stretch" gap="16px" w="400px" onSubmit={handleSubmit}>
          <FormControl as={Flex} gap="16px" align="center">
            <FormLabel w="180px" m="0" flex="0 0 180px">
              Buy Price
            </FormLabel>
            <Input
              type="number"
              name="bp"
              autoFocus
              textAlign="right"
              value={input.bp ?? ""}
              onChange={handleChangeInput}
            />
          </FormControl>

          <FormControl as={Flex} gap="16px" align="center">
            <FormLabel w="180px" m="0" flex="0 0 180px">
              Selling Price
            </FormLabel>
            <Input type="number" name="sp" textAlign="right" value={input.sp ?? ""} onChange={handleChangeInput} />
          </FormControl>

          <FormControl as={Flex} gap="16px" align="center">
            <FormLabel w="180px" m="0" flex="0 0 180px">
              Number of stocks
            </FormLabel>
            <Input type="number" name="nos" textAlign="right" value={input.nos ?? ""} onChange={handleChangeInput} />
          </FormControl>

          <FormControl as={Flex} gap="16px" align="center">
            <FormLabel w="180px" m="0" flex="0 0 180px">
              Buy commission
            </FormLabel>
            <Input type="number" name="bcp" textAlign="right" value={input.bcp ?? ""} onChange={handleChangeInput} />
          </FormControl>

          <FormControl as={Flex} gap="16px" align="center">
            <FormLabel w="180px" m="0" flex="0 0 180px">
              Selling commission
            </FormLabel>
            <Input type="number" name="scp" textAlign="right" value={input.scp ?? ""} onChange={handleChangeInput} />
          </FormControl>

          <Box mt="24px" textAlign="right">
            <Button type="submit">Submit</Button>
          </Box>
        </VStack>

        <VStack align="stretch" gap="16px" w="280px">
          <Flex align="center" justify="space-between" gap="16px" h="40px">
            <Text w="180px">Buying Commission</Text>
            <Text>{output?.buyingCommission}</Text>
          </Flex>

          <Flex align="center" justify="space-between" gap="16px" h="40px">
            <Text w="180px">Selling Commission</Text>
            <Text>{output?.sellingCommission}</Text>
          </Flex>

          <Flex align="center" justify="space-between" gap="16px" h="40px">
            <Text w="180px">Total Commission</Text>
            <Text>{output?.totalCommission}</Text>
          </Flex>

          <Flex align="center" justify="space-between" gap="16px" h="40px">
            <Text w="180px">Transaction Tax</Text>
            <Text>{output?.transactionTax}</Text>
          </Flex>

          <Flex align="center" justify="space-between" gap="16px" h="40px">
            <Text w="180px">Profit And Loss</Text>
            <Text>{output?.profitAndLoss}</Text>
          </Flex>
        </VStack>
      </Wrap>
    </ContentsLayout>
  );
};
