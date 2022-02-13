import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { Box, Stack, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/apiCalls";
import NewPatientModal from "./NewPatientModal";
import EditPatientModal from "./EditPatientModal";
import PatientModal from "./PatientModal";
import SearchModal from "./SearchModal";

// import GroupChatModal from "./GroupChatModal";

const ManagePatients = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [patients, setPatients] = useState(null);
  console.log(user);
  const toast = useToast();

  const fetchPatients = async () => {
    try {
      const config = {
        headers: { token: `Bearer ${user.accessToken}` },
      };
      const res = await axios.get("/api/patients", config);
      console.log(res.data);

      setPatients(res.data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the patients",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleClick = async (e) => {
    await logoutUser(dispatch);
  };

  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));

    fetchPatients();

    // eslint-disable-next-line
  }, []);

  return (
    <Box
      d={{ base: "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "44%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            ...
          </MenuButton>
          <MenuList>
            <NewPatientModal fetchPatients={fetchPatients}>
              <MenuItem></MenuItem>
            </NewPatientModal>
            <MenuDivider />
            <SearchModal fetchPatients={fetchPatients}>
              <MenuItem></MenuItem>
            </SearchModal>
            <MenuDivider />
            <Button onClick={handleClick}>Logout</Button>
          </MenuList>
        </Menu>
        {/* <Button onClick={handleClick}>logout</Button> */}
        Patients
        <NewPatientModal fetchPatients={fetchPatients}>
          <Button
            d="flex"
            fontSize={{ base: "10px", md: "8px", lg: "10px" }}
            rightIcon={<AddIcon />}
          >
            <Text align={"center"}> New Patient</Text>
          </Button>
        </NewPatientModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {patients ? (
          <Stack overflowY="scroll">
            {patients.map((patient) => (
              <PatientModal
                patient={patient}
                fetchPatients={fetchPatients}
                key={patient.id}
              ></PatientModal>
            ))}
          </Stack>
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default ManagePatients;
