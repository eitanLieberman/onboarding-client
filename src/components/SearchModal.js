import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { Input } from "@chakra-ui/input";
import { Box, Text, Stack } from "@chakra-ui/layout";
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

import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Search2Icon } from "@chakra-ui/icons";
import PatientModal from "./PatientModal";

function SearchModal({ fetchPatients }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchResult, setSearchResult] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const handleSearch = async (query) => {
    try {
      if (query.length > 0) {
        const config = {
          headers: { token: `Bearer ${user.accessToken}` },
        };
        const { data } = await axios.get(`/api/patients/find/${query}`, config);
        console.log(data);

        setSearchResult(data);
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      {" "}
      <Button leftIcon={<Search2Icon />} onClick={onOpen}>
        Search
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <Input
              placeholder="search for name,ID or operation"
              mb={1}
              onChange={(e) => {
                handleSearch(e.target.value);
                console.log(searchResult);
              }}
            />

            {searchResult?.slice(0, 5).map((patient) => (
              <PatientModal
                key={patient.id}
                patient={patient}
                fetchPatients={fetchPatients}
              />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SearchModal;
