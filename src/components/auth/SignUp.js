import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { Link as lee,useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth } from '../../firebase';
import { toast } from "react-hot-toast"

  export default function SignUp() {
    const navigate = useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
  
    const handleSignUp=async()=>{
        try{
            const user= await createUserWithEmailAndPassword(auth,email,password)
            console.log(user)
            if(user){
                navigate('/Login')
            }
        }catch(err){
            console.log(err.message)
            toast.error(err.message)
        }
        
      }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>SignUp to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange={e=>{setEmail(e.target.value)}} type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange={e=>{setPassword(e.target.value)}} type="password" />
              </FormControl>
              <Stack spacing={10}>
               
                <Button
                onClick={handleSignUp}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  SignUp
                </Button>
                <Stack pt={3}>
                <Text align={'center'}>
                  Already Have an Acount ?<Link as={lee} to={"/Login"} color={'blue.400'}> Login</Link>
                </Text>
              </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  