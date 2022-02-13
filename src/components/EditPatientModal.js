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

const EditPatientModal = ({ fetchPatients, patient }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullName, setFullName] = useState(patient.fullName);
  const [sex, setSex] = useState(patient.sex);
  const [nativeLanguage, setNativeLanguage] = useState(patient.nativeLanguage);
  const [age, setAge] = useState(patient.age);
  const [operation, setOperation] = useState(patient.operation);
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
      await axios.put(
        `/api/patients/${patient.id}`,
        {
          fullName,
          age,
          sex,
          nativeLanguage,
          operation,
        },
        config
      );
      // setChats([data, ...chats]);
      await fetchPatients();
      onClose();
      toast({
        title: "Edit was successful!",
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
      <Button
        onClick={onOpen}
        style={{
          left: "10px",
          position: "absolute",
        }}
      >
        Edit Details
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Patient Information</ModalHeader>
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
              <Select
                value={sex}
                placeholder="Select sex"
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="F">F</option>
                <option value="M">M</option>
              </Select>
            </FormControl>
            <FormControl>
              <Select
                value={nativeLanguage}
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
