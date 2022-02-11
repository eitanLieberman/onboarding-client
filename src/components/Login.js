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
import { login } from "../redux/apiCalls";

function Login() {
  const [docId, setDocId] = useState("");

  const history = useNavigate();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const [show, setShow] = useState(false);
  let loginErr = null;
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const result = await login(dispatch, { docId, password });
      result
        ? history("/patients")
        : toast({
            title: "Not Authenticated!",
            description: "Doctor ID or password aren't correct",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <VStack>
      <FormControl id="name" isRequired>
        <FormLabel>doctor ID</FormLabel>
        <Input
          placeholder="for testing you may use 'doc1' "
          onChange={(e) => {
            setDocId(e.target.value);
          }}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={!show ? "password" : "text"}
            placeholder="password(for doc1 pw is '123')"
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
        Login
      </Button>
    </VStack>
  );
}

export default Login;
