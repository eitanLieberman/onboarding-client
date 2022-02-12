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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const EditPatientModal = ({
  fetchPatients,
  prevSex,
  prevFullName,
  prevAge,
  prevOperation,
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullName, setFullName] = useState(prevFullName);
  const [sex, setSex] = useState(prevSex);
  const [age, setAge] = useState(prevAge);
  const [operation, setOperation] = useState(prevOperation);
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
      const { data } = await axios.put(
        `/api/patients/${id}`,
        {
          fullName,
          age,
          sex,
          operation,
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
      <Button onClick={onOpen}>{prevFullName}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              Full-Name:
              <Input
                value={fullName}
                mb={3}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              Age:
              <Input
                value={age}
                mb={1}
                onChange={(e) => setAge(e.target.value)}
              />
            </FormControl>
            <FormControl>
              Sex:
              <Input
                value={sex}
                mb={1}
                onChange={(e) => setSex(e.target.value)}
              />
            </FormControl>
            <FormControl>
              Operation:
              <Input
                value={operation}
                mb={1}
                onChange={(e) => setOperation(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              EDIT
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPatientModal;
