// Navbar.js
import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { ColorModeSwitcher } from 'ColorModeSwitcher';

const navItems = [
  {
    label: 'Home',
    to: 'home',
  },
  {
    label: 'Features',
    to: 'features',
  },
  {
    label: 'About Us',
    to: 'about-us',
  },
  {
    label: 'FAQs',
    to: 'faqs',
  },
  {
    label: 'Contact Us',
    to: 'contact-us',
  },
];

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      left="0"
      right="0"
      zIndex="sticky"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="md"
    >
      <Flex
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            as={ScrollLink}
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            CELLSCOPE
          </Text>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            ml={10}
            justifyContent="center"
          >
            {navItems.map(navItem => (
              <ScrollLink
                key={navItem.label}
                to={navItem.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  marginLeft: '1rem',
                  cursor: 'pointer'
                }}
              >
                {navItem.label}
              </ScrollLink>
            ))}
          </Flex>
        </Flex>
        <Flex flex={{ base: 1 }} justify="flex-end" alignItems="center">
          <ColorModeSwitcher justifySelf="flex-end" p={3} />

          <Button
            as={Link}
            to="/sign-in"
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            p={3}
          >
            Sign In
          </Button>
          <Button
            as={Link}
            to="/sign-up"
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            _hover={{
              bg: 'pink.300',
            }}
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          flexDirection="column"
          alignItems="center"
        >
          {navItems.map(navItem => (
            <ScrollLink
              key={navItem.label}
              to={navItem.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                marginLeft: '1rem',
              }}
            >
              {navItem.label}
            </ScrollLink>
          ))}
        </Flex>
      </Collapse>
    </Box>
  );
};

export default Navbar;
