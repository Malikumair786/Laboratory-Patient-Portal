import React from 'react';
import { ColorModeSwitcher } from 'ColorModeSwitcher';

import { UserButton } from '@clerk/clerk-react';

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { FiMenu, FiBell } from 'react-icons/fi';

import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import { Link, useLocation } from 'react-router-dom';

const LinkItems = [
  { name: 'Home', icon: HomeOutlinedIcon, path: '/dashboard' },
  { name: 'In Progress', icon: RateReviewRoundedIcon, path: '/in-progress' },
  { name: 'Visit Request', icon: LocalHospitalIcon, path: '/visits' },
  { name: 'Payments', icon: PaidRoundedIcon, path: '/payments' },
  { name: 'Feedback', icon: RateReviewRoundedIcon, path: '/feedback' },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const { pathname } = useLocation();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          CELLSCOPE
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {LinkItems.map(link => (
        <NavItem
          key={link.name}
          icon={link.icon}
          path={link.path}
          currentPath={pathname}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, currentPath }) => {
  const isActive = currentPath === path;

  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        m="1"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        bg={isActive ? 'cyan.400' : 'transparent'}
        color={isActive ? 'white' : undefined}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>
      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <ColorModeSwitcher justifySelf="flex-end" p={3} />

        <UserButton />
      </HStack>
    </Flex>
  );
};

const PNavbar = () => {
  return (
    // <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent display={{ base: 'none', md: 'block' }} />
      <MobileNav />
    </Box>
  );
};

export default PNavbar;
