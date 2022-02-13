import { Box } from "@chakra-ui/react";
import React from "react";
import ManagePatients from "../components/ManagePatients";

const Patients = () => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <Box d="flex" justifyContent="center" w="100%" h="90vh" p="10px">
          <ManagePatients />
        </Box>
      </div>
    </>
  );
};

export default Patients;
