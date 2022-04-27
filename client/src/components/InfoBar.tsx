import { Flex } from "@chakra-ui/react";
import React from "react";

const InfoBar = () => {
	return (
		<div>
			<Flex
				pos="sticky"
				left={5}
				ml={2}
				h="95vh"
				marginTop="2.5vh"
				boxShadow="0 4px 12px 0 rgba(0,0,0,0,0.5)"
				borderRadius="30px"
				dir="column"
				justifyContent="space-between"
				bg="red.200"
			></Flex>
		</div>
	);
};

export default InfoBar;