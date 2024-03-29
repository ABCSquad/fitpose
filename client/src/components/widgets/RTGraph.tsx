import { Box, Flex, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { Line, ResponsiveContainer, YAxis, ComposedChart } from "recharts";
import { useApp } from "../../contexts/AppContext";

const RTGraph: FC = () => {
  const { metaData, isIdeal } = useApp();
  const [graphData, setGraphData] = useState<Array<object>>([]);
  const [graphMeta, setGraphMeta] = useState(false);

  const setData = () => {
    if (metaData && isIdeal(metaData)) {
      const final = metaData?.finalData;
      // const getMin = compound?.repsData.range[0];
      // const getMax = compound?.repsData.range[1];
      const currentAngle =
        metaData?.compoundData?.angleData[metaData.finalData.currentExercise][
          metaData.compoundData.repsData[metaData.finalData.currentExercise]
            .partName
        ];

      // const returnObj = {
      // 	amt: Math.round(currentAngle ? currentAngle : 0),
      // };
      if (final?.repCount !== -1) {
        setGraphMeta(false);
        let deviation: number;
        if (final?.deviatingPart === "") {
          deviation = 0;
        } else {
          deviation = 0.5 * 360;
        }
        if (final?.repFlag === true) {
          setGraphData([
            ...graphData,
            { amt: 360, dev: deviation, curr: currentAngle },
          ]);
        } else {
          setGraphData([
            ...graphData,
            { amt: 0, dev: deviation, curr: currentAngle },
          ]);
        }
      } else {
        // console.log("true");
        setGraphMeta(true);
      }
      removeOldData();
    }
  };

  const removeOldData = () => {
    if (graphData.length > 150) {
      const array = [...graphData];

      array.shift();

      setGraphData(array);
    }
  };

  useEffect(() => {
    setData();
  }, [metaData]);

  useEffect(() => {
    // console.log(metaData);

    setData();
  }, [metaData]);

  return (
    <Box
      mb={3}
      h="100%"
      w="100%"
      borderWidth="2px"
      borderRadius="30px"
      borderColor="InactiveBorder"
      bg="white"
    >
      {!graphMeta ? (
        <div
          className="RT-graph"
          style={{ width: "100%", height: "100%", padding: "10px" }}
        >
          <ResponsiveContainer>
            <ComposedChart
              data={graphData}
              margin={{
                top: 25,
                right: 25,
                left: 5,
                bottom: 5,
              }}
            >
              {/* <Tooltip /> */}
              <YAxis hide domain={[0, 1]} />
              <Line
                type="monotone"
                dataKey="curr"
                stroke="#8884d8"
                strokeWidth={1}
                opacity={0.4}
              />
              <Line
                type="monotone"
                dataKey="amt"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="dev"
                stroke="red"
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Flex
          h="100%"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="2xl"
          >
            Go to inital position
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default RTGraph;
