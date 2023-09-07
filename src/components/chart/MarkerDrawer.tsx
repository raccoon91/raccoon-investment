import { ChangeEvent, FC, useEffect } from "react";
import {
  Box,
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
  Textarea,
} from "@chakra-ui/react";
import { Plus, Save } from "react-feather";
import { useMarkerStore } from "../../stores";

interface IMarkerDrawerProps {
  isOpen: boolean;
  symbol?: ISymbolData | null;
  onClose: () => void;
}

export const MarkerDrawer: FC<IMarkerDrawerProps> = ({ isOpen, symbol, onClose }) => {
  const { markerJson, addMarker, changeMarker, getMarkerData, saveMarkerData } = useMarkerStore(state => ({
    markerJson: state.markerJson,
    addMarker: state.addMarker,
    changeMarker: state.changeMarker,
    getMarkerData: state.getMarkerData,
    saveMarkerData: state.saveMarkerData,
  }));

  useEffect(() => {
    if (!symbol?.id) return;

    getMarkerData(symbol?.id?.toString());
  }, [symbol]);

  const handleAddMarker = () => {
    addMarker(symbol?.id?.toString());
  };

  const handleChangeMarker = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeMarker(e.target.value);
  };

  const handleSaveMarker = async () => {
    await saveMarkerData();
    await getMarkerData(symbol?.id?.toString());
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
                aria-label="add dividen"
                icon={<Icon as={Plus} />}
                onClick={handleAddMarker}
              />
            </HStack>

            <Textarea h="300px" resize="none" value={markerJson} onChange={handleChangeMarker} />

            <Box textAlign="right">
              <IconButton aria-label="save dividen" icon={<Icon as={Save} />} onClick={handleSaveMarker} />
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
