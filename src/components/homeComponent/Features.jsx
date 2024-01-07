import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from 'react-icons/fc';

function Card({ heading, description, icon, href }) {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
        <Button variant={'link'} colorScheme={'blue'} size={'sm'} href={href}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
}

const Features = () => {
  return (
    <Box p={10} mt={20} bg={useColorModeValue('gray.100', 'gray.700')}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Our Features
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Explore the features that make our laboratory web application stand
          out.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Automated Disease Detection'}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
              'Utilizing deep learning for quick and accurate disease detection.'
            }
            href={'#'}
          />
          <Card
            heading={'Collaborative Workflow'}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              'Facilitating seamless collaboration among pathologists and phlebotomists.'
            }
            href={'#'}
          />
          <Card
            heading={'Efficient Data Management'}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={
              'Automated systems for specimen management, slide preparation, and more.'
            }
            href={'#'}
          />
          <Card
            heading={'Quick Task Assignments'}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={
              'Simplify task assignments for pathologists to focus on critical tasks.'
            }
            href={'#'}
          />
          <Card
            heading={'Patient-Friendly Interaction'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={
              'Patients can easily request lab tests and book appointments through the application.'
            }
            href={'#'}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Features;
