import React, { useState } from "react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { login, register } from "../redux/apiCalls";

const Signup = () => {
  const [docId, setDocId] = useState("");

  const history = useNavigate();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      await register(dispatch, { docId, password });

      const res = await login(dispatch, { docId, password });
      if (res) history("/patients");
    } catch (err) {
      toast({
        title: "Not Authenticated!",
        description: "An account for this ID exists, or  ID isn't in database",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <VStack>
      <FormControl id="name" isRequired>
        <FormLabel>Doctor ID</FormLabel>
        <Input
          placeholder="IDs for testing: doc2 ,doc3,...,doc5"
          onChange={(e) => {
            setDocId(e.target.value);
          }}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={!show ? "password" : "text"}
            placeholder="enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement>
            <Button
              onClick={() => {
                show ? setShow(null) : setShow(true);
              }}
            >
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="teal"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Signup;
