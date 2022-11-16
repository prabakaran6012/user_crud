import React, { useEffect, useState } from "react"
import Footer from "../additional/Footer"
import NavBar from "../additional/NavBar"
import axios from "axios"
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'
import {v4} from "uuid"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    FormControl,
    Input,
    FormLabel,
    Flex,
    Stack,
    Button,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Modal,
    ModalContent,
    useDisclosure
  } from '@chakra-ui/react'
const Home=()=>{
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [referesh,setreferesh]=useState(1)
    const [fname,setfname]=useState('')
    const[lname,setlname]=useState('')
    const [username,setusername]=useState('')
    const [datas,setdatas]=useState([])
   const getdata=async()=>{
    try{
     const response=await axios.get("https://www.mecallapi.com/api/users")
     console.log(response.data)
     if(response.data){
        setdatas(response.data)
     }
    }catch(err){
        console.log(err)
    }
   }
   const DeleteUser=async(id)=>{
    try{
        
         axios.delete(`https://www.mecallapi.com/api/users/${id}`)
         setreferesh(...referesh+1)
      
    }catch(err){
        console.log(err)
    }

   }
   const addnew=()=>{
    try{
        axios.post("https://www.mecallapi.com/api/users/create",{
            id:v4(),
            fname:fname,
            lname:lname,
            username:username
        })
        
       }catch(err){
           console.log(err)
       }
    console.log("adding process")
   }
    useEffect(()=>{
       getdata()
    },[referesh])
    return(<>
    <NavBar/>
    <Button onClick={onOpen}>Add New</Button>
   

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AddNew User</ModalHeader>
          <ModalCloseButton onClick={onClose}/>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>FirstName</FormLabel>
              <Input  onChange={(e)=>{setfname(e.target.value)}} ref={initialRef} placeholder='Enter your First Name' type="text"/>
            </FormControl>
            <FormControl>
              <FormLabel>LastName</FormLabel>
              <Input  onChange={(e)=>{setlname(e.target.value)}} ref={initialRef} placeholder='Enter your Last name' type="text"/>
            </FormControl>
            <FormControl>
              <FormLabel>UserName</FormLabel>
              <Input  onChange={(e)=>{setusername(e.target.value)}} ref={initialRef} placeholder='Enter your user name' type="text"/>
            </FormControl>
            
          </ModalBody>

          <ModalFooter>
            <Button onClick={
                     addnew }        
            colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
 {datas.length >0? 
 <> <TableContainer>
 <Table variant='simple'>
   <TableCaption>Kyvor CRUD test</TableCaption>
   <Thead>
     <Tr>
       <Th>Id</Th>
       <Th>Fname</Th>
       <Th>Lname</Th>
       <Th>UserName</Th>
       <Th>Actions</Th>
     </Tr>
   </Thead>
   {
 datas.map(element=>

    <Tbody>
      <Tr>
        <Td>{element.id}</Td>
        <Td>{element.fname}</Td>
        <Td >{element.lname}</Td>
        <Td >{element.username}</Td>
        <Td>
            <Flex direction={"row"}  >
                <Stack ><Button  bg={'green.700'}
                            color={'white'}
                            _hover={{
                                bg: 'green.300',
                            }}>Edit</Button></Stack>
                <Stack><Button   
                 onClick={() => {
                    confirmAlert({
                        title: `Delete ${element.username}`,
                        message: 'Are you sure to delete this.',
                        buttons: [
                          {
                            label: 'Yes',
                            onClick: () =>  DeleteUser(element.id)
                          },
                          {
                            label: 'No',
                            onClick: ()=>{}
                          }
                        ]
                      });
                  
                }}

                            marginLeft={5}                          
                            bg={'red.700'}
                            color={'white'}
                            _hover={{
                                bg: 'red.300',
                            }}>Delete</Button></Stack>

            </Flex>
        </Td>
      </Tr>
     </Tbody>   
    )}
  </Table>
</TableContainer>
 </>:
 <h1>Hello</h1>
 }
    <Footer/>
    </>)
}
export default Home