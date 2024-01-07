import React from 'react';
import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import HeroSection from 'components/homeComponent/HeroSection';
import Features from 'components/homeComponent/Features';
import FaqsComponent from 'components/homeComponent/Faqs';
import TestimonialsComponent from 'components/aboutComponent/Testimonials';
import ContactForm from 'components/contactComponent/ContactForm';

// function StatsCard(props) {
//   const { title, stat } = props;
//   return (
//     <Stat
//       px={{ base: 4, md: 8 }}
//       py={'5'}
//       shadow={'xl'}
//       border={'1px solid'}
//       borderColor={useColorModeValue('gray.800', 'gray.500')}
//       rounded={'lg'}
//     >
//       <StatLabel fontWeight={'medium'} isTruncated>
//         {title}
//       </StatLabel>
//       <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
//         {stat}
//       </StatNumber>
//     </Stat>
//   );
// }

// const Home = () => {
//   return (
//     <>
//       <Box id="home">
//         <HeroSection />
//       </Box>

//       <Box id="features">
//         <Features />
//         <Box
//           maxW="7xl"
//           mx={'auto'}
//           pt={5}
//           px={{ base: 2, sm: 12, md: 17 }}
//           m="100px"
//         >
//           <chakra.h1
//             textAlign={'center'}
//             fontSize={'4xl'}
//             py={10}
//             fontWeight={'bold'}
//           >
//             What is our company doing?
//           </chakra.h1>
//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
//             <StatsCard title={'We serve'} stat={'50,000 people'} />
//             <StatsCard title={'In'} stat={'30 different countries'} />
//             <StatsCard title={'Who speak'} stat={'100 different languages'} />
//           </SimpleGrid>
//         </Box>
//       </Box>

//       <Box id="about-us">
//         <TestimonialsComponent />
//       </Box>

//       <Box id="faqs">
//         <FaqsComponent />
//       </Box>

//       <Box id="contact-us">
//         <ContactForm />
//       </Box>
//     </>
//   );
// };

function StatsCard(props) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}
const Home = () => {
  return (
    <>
      <Box id="home">
        <HeroSection />
      </Box>

      <Box id="features">
        <Features />
        <Box
          maxW="7xl"
          mx={'auto'}
          pt={5}
          px={{ base: 2, sm: 12, md: 17 }}
          m="100px"
        >
          <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            py={10}
            fontWeight={'bold'}
          >
            What is our laboratory doing?
          </chakra.h1>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard title={'Lab Services'} stat={'50,000 tests conducted'} />
            <StatsCard title={'Coverage'} stat={'30 different countries'} />
            <StatsCard title={'Languages'} stat={'Supports 100 languages'} />
          </SimpleGrid>
        </Box>
      </Box>

      <Box id="about-us">
        {/* Your About Us Component */}
        <TestimonialsComponent />
      </Box>

      <Box id="faqs">
        {/* Your FAQs Component */}
        <FaqsComponent />
      </Box>

      <Box id="contact-us">
        {/* Your Contact Us Component */}
        <ContactForm />
      </Box>
    </>
  );
};

export default Home;