import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';

const Tests = () => {
  return (
    <Box py={1}>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {/* Test Card 1 */}
        <Box
          maxW={'445px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <Box h={'210px'} bg={'gray.100'} pos={'relative'}>
            <img
              src={
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              }
              alt="Example"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Stack p={6}>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              Cancer
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'xl'}
              fontFamily={'body'}
            >
              Leukemia Test
            </Heading>
            <Text color={'gray.500'}>
              caused by the rapid production of abnormal white blood cells
            </Text>
          </Stack>
          <Stack direction="row" spacing={4} ml={4} mr={4} mb={4}>
            <Button
              w={'full'}
              bg={'green.400'}
              color={'white'}
              rounded={'xl'}
              boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
              _hover={{
                bg: 'green.500',
              }}
              _focus={{
                bg: 'green.500',
              }}
            >
              Home Visit Request
            </Button>
            <Button
              w={'full'}
              bg={'green.400'}
              color={'white'}
              rounded={'xl'}
              boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
              _hover={{
                bg: 'green.500',
              }}
              _focus={{
                bg: 'green.500',
              }}
            >
              Make Appointment
            </Button>
          </Stack>
        </Box>
        
      </SimpleGrid>
    </Box>
  );
};

export default Tests;
