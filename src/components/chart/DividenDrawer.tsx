import { ChangeEvent, FC, useEffect, useState } from "react";
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
import { Plus, Save } from "react-feather";
import { Datepicker } from "../Datepicker";
import { useDividenStore } from "../../stores";

interface IDividenDrawerProps {
  isOpen: boolean;
  symbol?: ISymbolData | null;
  onClose: () => void;
}

export const DividenDrawer: FC<IDividenDrawerProps> = ({ isOpen, symbol, onClose }) => {
  const [isCreate, setIsCreate] = useState(false);
  const [newDividen, setNewDividen] = useState<Record<string, any> | null>(null);
  const { dividens, getDividenData, saveDividenData } = useDividenStore(state => ({
    dividens: state.dividens,
    getDividenData: state.getDividenData,
    saveDividenData: state.saveDividenData,
  }));

  useEffect(() => {
    if (symbol?.id === undefined) return;

    getDividenData(symbol?.id);
  }, [symbol]);

  const handleCloseCreateDividen = () => {
    setIsCreate(false);
    setNewDividen(null);
  };

  const handleCreateDividen = () => {
    if (symbol?.id === undefined) return;

    setIsCreate(true);
    setNewDividen({
      symbol_id: symbol.id,
      date: dayjs().format("YYYY-MM-DD"),
      text: "dividen",
    });
  };

  const handleChangeDividen = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewDividen(p => ({ ...p, [name]: value }));
  };

  const handleChangeDividenDate = (date: Date | null) => {
    if (!date) return;

    setNewDividen(p => ({ ...(p ?? {}), date: dayjs(date).format("YYYY-MM-DD") }));
  };

  const handleSaveDividen = async () => {
    if (symbol?.id === undefined || !newDividen) return;

    await saveDividenData(newDividen as Omit<IDividenData, "position" | "shape">);
    await getDividenData(symbol?.id);

    setIsCreate(false);
    setNewDividen(null);
  };

  return (
    <Drawer size="sm" placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">{symbol?.name}</DrawerHeader>

        <DrawerBody>
          <Flex direction="column" gap="16px">
            <HStack justify="space-between">
              <Heading as="h5" fontSize="16px">
                Dividen
              </Heading>

              <IconButton
                variant="ghost"
                aria-label="create dividen"
                icon={<Icon as={Plus} />}
                onClick={handleCreateDividen}
              />
            </HStack>

            {!isCreate ? (
              <TableContainer overflowY="auto" w="full" flex="1">
                <Table>
                  <Thead>
                    <Tr>
                      <Td>Date</Td>
                      <Td>Text</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dividens.map((dividen, index) => (
                      <Tr key={index}>
                        <Td>{dividen.date}</Td>
                        <Td>{dividen.text}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Flex overflow="auto" direction="column" w="full" flex="1">
                <Flex direction="column" gap="8px">
                  <Flex align="center" justify="space-between" px="24px">
                    <Text>Date</Text>
                    <Box w="200px">
                      <Datepicker
                        w="full"
                        textAlign="right"
                        value={newDividen?.date ?? ""}
                        onChange={handleChangeDividenDate}
                      />
                    </Box>
                  </Flex>
                  <Flex align="center" justify="space-between" px="24px">
                    <Text>Text</Text>
                    <Input
                      w="200px"
                      textAlign="right"
                      name="text"
                      value={newDividen?.text}
                      onChange={handleChangeDividen}
                    />
                  </Flex>
                </Flex>

                <Flex justify="flex-end" gap="32px" mt="48px">
                  <Button variant="ghost" colorScheme="red" onClick={handleCloseCreateDividen}>
                    Cancel
                  </Button>
                  <IconButton
                    aria-label="save dividen"
                    variant="ghost"
                    icon={<Icon as={Save} />}
                    onClick={handleSaveDividen}
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
