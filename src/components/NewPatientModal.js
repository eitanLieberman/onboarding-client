import React, { useState } from "react";

import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const NewPatientModal = ({ fetchPatients }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullName, setFullName] = useState();
  const [sex, setSex] = useState();
  const [nativeLanguage, setNativeLanguage] = useState();
  const [age, setAge] = useState();
  const [operation, setOperation] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (!fullName || !sex || !age || !operation) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: { token: `Bearer ${user.accessToken}` },
      };
      const { data } = await axios.post(
        `/api/patients`,
        {
          fullName,
          age,
          sex,
          operation,
          nativeLanguage,
        },
        config
      );
      // setChats([data, ...chats]);
      await fetchPatients();
      onClose();
      toast({
        title: "New patient added to database!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to add the patient, try again.",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>+ Patient</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="fist and last name"
                mb={3}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="age"
                mb={1}
                onChange={(e) => setAge(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Select
                placeholder="Select sex"
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="F">F</option>
                <option value="M">M</option>
              </Select>
            </FormControl>
            <FormControl>
              <Select
                placeholder="Select patient's native language"
                onChange={(e) => setNativeLanguage(e.target.value)}
              >
                <option value="Hebrew">Hebrew</option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
                <option value="Russian">Russian</option>
              </Select>
            </FormControl>
            <FormControl>
              <Input
                placeholder="operation name"
                mb={1}
                onChange={(e) => setOperation(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewPatientModal;
