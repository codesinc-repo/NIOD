import AnimatedSection from './AnimatedSection';
import BestsellersSection from './BestsellersSection';
import CommonConcernsSection from './CommonConcernsSection';
import ConsultationsSection from './ConsultationsSection';
import HeroSection from './HeroSection';
import MemberBenefitsSection from './MemberBenefitsSection';
import RiceLipidsSection from './RiceLipidsSection';
import ScientistsSection from './ScientistsSection';
import SocialSection from './SocialSection';

const HomeSections = () => (
  <main>
    <AnimatedSection direction="up"><HeroSection /></AnimatedSection>
    <AnimatedSection direction="left"><BestsellersSection /></AnimatedSection>
    <AnimatedSection direction="right"><RiceLipidsSection /></AnimatedSection>
    <AnimatedSection direction="left"><ConsultationsSection /></AnimatedSection>
    <AnimatedSection direction="right"><CommonConcernsSection /></AnimatedSection>
    <AnimatedSection direction="left"><MemberBenefitsSection /></AnimatedSection>
    <AnimatedSection direction="right"><SocialSection /></AnimatedSection>
    <AnimatedSection direction="left"><ScientistsSection /></AnimatedSection>
  </main>
);

export default HomeSections;
