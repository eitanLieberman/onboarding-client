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
import EditPatientModal from "./EditPatientModal";

const PatientModal = ({ fetchPatients, patient }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Button onClick={onOpen}>{patient.fullName}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              Full-Name:
              {" " + patient.fullName}
            </FormControl>
            <FormControl>
              Age:
              {" " + patient.age}
            </FormControl>
            <FormControl>
              Sex:
              {" " + patient.sex}
            </FormControl>
            <FormControl>
              Operation:
              {" " + patient.operation}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <EditPatientModal patient={patient} fetchPatients={fetchPatients}>
              {/* <Button onClick={onClose}></Button>
              EDIT */}
            </EditPatientModal>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PatientModal;
