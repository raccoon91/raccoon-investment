import { ChangeEvent, FC, useEffect } from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { Save } from "react-feather";
import { Select } from "../Select";
import { Datepicker } from "../Datepicker";
import { useTradeStore } from "../../stores";

const tradeOptions = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
];

interface ITradeDrawerProps {
  isOpen: boolean;
  symbol?: ISymbolData | null;
  onClose: () => void;
}

export const TradeDrawer: FC<ITradeDrawerProps> = ({ isOpen, symbol, onClose }) => {
  const { trades, tradeJson, addTrade, changeTrade, getTradeData, saveTradeData } = useTradeStore(state => ({
    trades: state.trades,
    tradeJson: state.tradeJson,
    addTrade: state.addTrade,
    changeTrade: state.changeTrade,
    getTradeData: state.getTradeData,
    saveTradeData: state.saveTradeData,
  }));

  useEffect(() => {
    if (!symbol?.id) return;

    getTradeData(symbol?.id?.toString());
  }, [symbol]);

  const handleAddBuy = () => {
    addTrade(symbol?.id?.toString(), "buy");
  };

  const handleAddSell = () => {
    addTrade(symbol?.id?.toString(), "sell");
  };

  const handleChangeTradeType = (value: string) => {
    console.log(value);
  };

  const handleChangeTrade = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleChangeTradeDate = (date: Date | null) => {
    if (!date) return;

    console.log(dayjs(date).format("YYYY-MM-DD"));
  };

  const handleSaveTrade = async () => {
    await saveTradeData();
    await getTradeData(symbol?.id?.toString());
  };

  return (
    <Drawer size="sm" placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">{symbol?.name}</DrawerHeader>

        <DrawerBody>
          <Flex direction="column" gap="16px" h="full">
            <HStack justify="flex-start">
              <Heading as="h5" fontSize="16px">
                Trade
              </Heading>

              <Button ml="auto" variant="ghost" colorScheme="blue" onClick={handleAddBuy}>
                Buy
              </Button>

              <Button ml="8px" variant="ghost" colorScheme="red" onClick={handleAddSell}>
                Sell
              </Button>
            </HStack>

            <Flex overflow="auto" direction="column" gap="16px" w="full" flex="1">
              {trades.map((trade, index) => (
                <Flex key={index} direction="column" gap="4px">
                  <Flex align="center">
                    <Text w="140px">Type</Text>
                    <Select
                      size="sm"
                      w="140px"
                      variant="outline"
                      colorScheme="gray"
                      value={trade.type}
                      options={tradeOptions}
                      onChange={handleChangeTradeType}
                    />
                  </Flex>
                  <Flex align="center">
                    <Text w="140px">Price</Text>
                    <Input
                      type="number"
                      size="sm"
                      w="140px"
                      textAlign="right"
                      value={trade.price}
                      onChange={handleChangeTrade}
                    />
                  </Flex>
                  <Flex align="center">
                    <Text w="140px">Count</Text>
                    <Input
                      type="number"
                      size="sm"
                      w="140px"
                      textAlign="right"
                      value={trade.count}
                      onChange={handleChangeTrade}
                    />
                  </Flex>
                  <Flex align="center">
                    <Text w="140px">Commission</Text>
                    <Input
                      type="number"
                      size="sm"
                      w="140px"
                      textAlign="right"
                      value={trade.commission}
                      onChange={handleChangeTrade}
                    />
                  </Flex>
                  <Flex align="center">
                    <Text w="140px">Date</Text>
                    <Datepicker size="sm" w="140px" value={trade.time} onChange={handleChangeTradeDate} />
                  </Flex>
                  <Flex align="center">
                    <Text w="140px">Text</Text>
                    <Input size="sm" w="140px" textAlign="right" value={trade.text} onChange={handleChangeTrade} />
                  </Flex>
                </Flex>
              ))}
            </Flex>

            {/* <Textarea h="300px" resize="none" value={tradeJson} onChange={handleChangeTrade} /> */}

            <Box textAlign="right">
              <IconButton aria-label="save dividen" icon={<Icon as={Save} />} onClick={handleSaveTrade} />
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
