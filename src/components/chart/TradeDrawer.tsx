import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Save } from "react-feather";
import { Datepicker } from "../Datepicker";
import { useTradeStore } from "../../stores";

interface ITradeDrawerProps {
  isOpen: boolean;
  symbol?: ISymbolData | null;
  onClose: () => void;
}

export const TradeDrawer: FC<ITradeDrawerProps> = ({ isOpen, symbol, onClose }) => {
  const [type, setType] = useState("list");
  const [newTrade, setNewTrade] = useState<Record<string, any> | null>(null);
  const { trades, getTradeData, saveTradeData } = useTradeStore(state => ({
    trades: state.trades,
    getTradeData: state.getTradeData,
    saveTradeData: state.saveTradeData,
  }));

  useEffect(() => {
    if (!symbol?.id) return;

    getTradeData(symbol?.id?.toString());
  }, [symbol]);

  const handleCloseCreateTrade = () => {
    setType("list");
    setNewTrade(null);
  };

  const handleCreateTrade = (e: MouseEvent<HTMLButtonElement>) => {
    const tradeType = e.currentTarget.dataset["tradeType"];

    if (!symbol?.id || !tradeType) return;

    setType(tradeType);
    setNewTrade({
      id: symbol.id.toString(),
      time: dayjs().format("YYYY-MM-DD"),
      type: tradeType,
      price: 0,
      count: 0,
      commission: 0.1,
      text: tradeType,
    });
  };

  const handleChangeTrade = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewTrade(p => ({ ...(p ?? {}), [name]: value }));
  };

  const handleChangeTradeDate = (date: Date | null) => {
    if (!date) return;

    setNewTrade(p => ({ ...(p ?? {}), time: dayjs(date).format("YYYY-MM-DD") }));
  };

  const handleSaveTrade = async () => {
    if (!newTrade) return;

    await saveTradeData(newTrade as Omit<ITradeData, "position" | "shape">);
    await getTradeData(symbol?.id?.toString());

    setType("list");
    setNewTrade(null);
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

              <Button
                ml="auto"
                variant={type === "buy" ? "solid" : "ghost"}
                colorScheme="blue"
                data-trade-type="buy"
                onClick={handleCreateTrade}
              >
                Buy
              </Button>

              <Button
                ml="8px"
                variant={type === "sell" ? "solid" : "ghost"}
                colorScheme="red"
                data-trade-type="sell"
                onClick={handleCreateTrade}
              >
                Sell
              </Button>
            </HStack>

            {type === "list" ? (
              <TableContainer overflowY="auto" w="full" flex="1">
                <Table>
                  <Thead>
                    <Tr>
                      <Td>Date</Td>
                      <Td>Type</Td>
                      <Td>Count</Td>
                      <Td>Price</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {trades.map((trade, index) => (
                      <Tr key={index}>
                        <Td>{trade.time}</Td>
                        <Td>{trade.type}</Td>
                        <Td>{trade.count}</Td>
                        <Td>{trade.price}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Flex overflow="auto" direction="column" w="full" flex="1">
                <Flex direction="column" gap="8px">
                  <Flex align="center" justify="space-between" px="24px">
                    <Text>Price</Text>
                    <Input
                      type="number"
                      w="200px"
                      textAlign="right"
                      name="price"
                      value={newTrade?.price}
                      onChange={handleChangeTrade}
                    />
                  </Flex>
                  <Flex align="center" justify="space-between" px="24px">
                    <Text>Count</Text>
                    <Input
                      type="number"
                      w="200px"
                      textAlign="right"
                      name="count"
                      value={newTrade?.count}
                      onChange={handleChangeTrade}
                    />
                  </Flex>
                  <Flex align="center" justify="space-between" px="24px">
                    <Text>Commission</Text>
                    <Input
                      type="number"
                      w="200px"
                      textAlign="right"
                      name="commission"
                      value={newTrade?.commission}
                      onChange={handleChangeTrade}
                    />
                  </Flex>
                  <Flex align="center" justify="space-between" px="24px">
                    <Text>Date</Text>
                    <Box w="200px">
                      <Datepicker
                        w="full"
                        textAlign="right"
                        value={newTrade?.time?.toString() ?? ""}
                        onChange={handleChangeTradeDate}
                      />
                    </Box>
                  </Flex>
                  <Flex align="center" justify="space-between" px="24px">
                    <Text>Text</Text>
                    <Input
                      w="200px"
                      textAlign="right"
                      name="text"
                      value={newTrade?.text}
                      onChange={handleChangeTrade}
                    />
                  </Flex>
                </Flex>

                <Flex justify="flex-end" gap="32px" mt="48px">
                  <Button variant="ghost" colorScheme="red" onClick={handleCloseCreateTrade}>
                    Cancel
                  </Button>
                  <IconButton
                    aria-label="save dividen"
                    variant="ghost"
                    icon={<Icon as={Save} />}
                    onClick={handleSaveTrade}
                  />
                </Flex>
              </Flex>
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
