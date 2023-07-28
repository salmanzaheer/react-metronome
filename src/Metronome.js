import React, { useEffect, useState } from "react";
import click1 from "./components/click1.wav";
import click2 from "./components/click2.wav";
import {
  Box,
  Center,
  Button,
  Text,
  Flex,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import useSound from "use-sound";

const Metronome = () => {
  const labelStyles = {
    textAlign: "center",
    bg: "red.500",
    color: "white",
    w: "10",
  };

  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [bpm, setBpm] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const [play1] = useSound(click1);
  const [play2] = useSound(click2);

  let metronomeInterval;

  useEffect(() => {
    return () => {
      clearInterval(metronomeInterval);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      metronomeInterval = setInterval(playClick, 60000 / bpm);
    } else {
      clearInterval(metronomeInterval);
      setCount(0);
      setBeatsPerMeasure(4);
      setHasStarted(false);
    }

    return () => {
      clearInterval(metronomeInterval);
    };
  }, [isPlaying, bpm]);

  useEffect(() => {
    if (hasStarted) {
      // Play the appropriate sound based on the count value
      if (count % beatsPerMeasure === 0) {
        play1();
      } else {
        play2();
      }
    }
  }, [count, hasStarted, beatsPerMeasure, play1, play2]);

  function playClick() {
    setCount((prevCount) => (prevCount + 1) % beatsPerMeasure);
  }

  function handleChange(val) {
    setBpm(val);
    if (isPlaying) {
      clearInterval(metronomeInterval);
      metronomeInterval = setInterval(playClick, 60000 / val);
    }
  }

  function toggleMetronome() {
    if (!hasStarted) {
      setHasStarted(true);
    }

    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }

  return (
    <Stack direction="column" maxH="100vh">
      <Box bg="red.500" color="white" maxW="400vh" alignContent="center">
        <Text fontSize="4xl" textAlign="center">
          Metronome
        </Text>
      </Box>
      <Center h="100vh" gap="4">
        <Slider
          aria-label="slider-ex-6"
          defaultValue={beatsPerMeasure}
          orientation="vertical"
          maxH="64"
          min={2}
          max={4}
          step={1}
          onChange={(val) => {
            setBeatsPerMeasure(val);
          }}
          onAfterChange={(val) => {
            setBeatsPerMeasure(val);
          }}
          focusThumbOnChange={false}
        >
          <SliderMark
            val={beatsPerMeasure}
            textAlign="center"
            ml="-14"
            mt="60"
            {...labelStyles}
          >
            2 / 4
          </SliderMark>
          <SliderMark
            val={beatsPerMeasure}
            textAlign="center"
            ml="-14"
            mt="28"
            {...labelStyles}
          >
            3 / 4
          </SliderMark>
          <SliderMark
            val={beatsPerMeasure}
            textAlign="center"
            ml="-14"
            mt="-4"
            {...labelStyles}
          >
            4 / 4
          </SliderMark>
          <SliderTrack bg="gray.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb bg="red.300" />
        </Slider>
        <Box p="10" maxW="320px" borderWidth="1px">
          <Center>
            <Flex flexDirection="column" alignItems="center">
              <Flex gap="2" mt="4">
                <Button
                  borderRadius="full"
                  colorScheme={
                    hasStarted && count % beatsPerMeasure === 0 ? "red" : "gray"
                  }
                />
                <Button
                  borderRadius="full"
                  colorScheme={
                    hasStarted && count % beatsPerMeasure === 1 ? "red" : "gray"
                  }
                />
                <Button
                  borderRadius="full"
                  colorScheme={
                    hasStarted && count % beatsPerMeasure === 2 ? "red" : "gray"
                  }
                />
                <Button
                  borderRadius="full"
                  colorScheme={
                    hasStarted && count % beatsPerMeasure === 3 ? "red" : "gray"
                  }
                />
              </Flex>
            </Flex>
          </Center>
        </Box>
        <Slider
          aria-label="slider-ex-3"
          defaultValue={bpm}
          orientation="vertical"
          maxH="64"
          min={40}
          max={180}
          onChange={(val) => {
            setBpm(val);
          }}
          onAfterChange={(val) => {
            handleChange(val);
          }}
          focusThumbOnChange={false}
        >
          <SliderMark
            value={bpm}
            textAlign="center"
            bg="red.500"
            color="white"
            mt="-10"
            ml="6"
            w="12"
          >
            {bpm}
          </SliderMark>
          <SliderTrack bg="gray.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb bg="red.300" />
        </Slider>
      </Center>
      <Button
        size="lg"
        colorScheme={hasStarted ? "red" : "whatsapp"}
        onClick={toggleMetronome}
      >
        {isPlaying ? "Stop" : "Start"}
      </Button>
    </Stack>
  );
};

export default Metronome;
