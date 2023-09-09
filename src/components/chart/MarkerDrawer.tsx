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
import { useMarkerStore } from "../../stores";

interface IMarkerDrawerProps {
  isOpen: boolean;
  symbol?: ISymbolData | null;
  onClose: () => void;
}

export const MarkerDrawer: FC<IMarkerDrawerProps> = ({ isOpen, symbol, onClose }) => {
  const [isCreate, setIsCreate] = useState(false);
  const [newMarker, setNewMarker] = useState<Record<string, any> | null>(null);
  const { markers, getMarkerData, saveMarkerData } = useMarkerStore(state => ({
    markers: state.markers,
    getMarkerData: state.getMarkerData,
    saveMarkerData: state.saveMarkerData,
  }));

  useEffect(() => {
    if (!symbol?.id) return;

    getMarkerData(symbol?.id?.toString());
  }, [symbol]);

  const handleCloseCreateMarker = () => {
    setIsCreate(false);
    setNewMarker(null);
  };

  const handleCreateMarker = () => {
    if (!symbol?.id) return;

    setIsCreate(true);
    setNewMarker({
      id: symbol.id.toString(),
      time: dayjs().format("YYYY-MM-DD"),
      text: "dividen",
    });
  };

  const handleChangeMarker = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMarker(p => ({ ...p, [name]: value }));
  };

  const handleChangeMarkerDate = (date: Date | null) => {
    if (!date) return;

    setNewMarker(p => ({ ...(p ?? {}), time: dayjs(date).format("YYYY-MM-DD") }));
  };

  const handleSaveMarker = async () => {
    if (!newMarker) return;

    await saveMarkerData(newMarker as Omit<IMarkerData, "position" | "shape">);
    await getMarkerData(symbol?.id?.toString());

    setIsCreate(false);
    setNewMarker(null);
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
                Marker
              </Heading>

              <IconButton
                variant="ghost"
                aria-label="create dividen"
                icon={<Icon as={Plus} />}
                onClick={handleCreateMarker}
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
                    {markers.map((marker, index) => (
                      <Tr key={index}>
                        <Td>{marker.time}</Td>
                        <Td>{marker.text}</Td>
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
                        value={newMarker?.time?.toString() ?? ""}
                        onChange={handleChangeMarkerDate}
                      />
                    </Box>
                  </Flex>
                  <Flex align="center" justify="space-between" px="24px">
                    <Text>Text</Text>
                    <Input
                      w="200px"
                      textAlign="right"
                      name="text"
                      value={newMarker?.text}
                      onChange={handleChangeMarker}
                    />
                  </Flex>
                </Flex>

                <Flex justify="flex-end" gap="32px" mt="48px">
                  <Button variant="ghost" colorScheme="red" onClick={handleCloseCreateMarker}>
                    Cancel
                  </Button>
                  <IconButton
                    aria-label="save dividen"
                    variant="ghost"
                    icon={<Icon as={Save} />}
                    onClick={handleSaveMarker}
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
