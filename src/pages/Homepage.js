import { Container } from "@chakra-ui/layout";
import { TabList, Tabs, Tab, TabPanel, TabPanels } from "@chakra-ui/tabs";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
// import "./homepage.css";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { logoutUser } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
function Homepage() {
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    await logoutUser(dispatch);
  };
  return (
    <Container maxW="xl" centerContent>
      <Box
        justifyContent="center"
        d="flex"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
      >
        <Text style={{ textAlign: "center" }} fontSize="4xl">
          On-Boarding
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="1g" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
export default Homepage;
