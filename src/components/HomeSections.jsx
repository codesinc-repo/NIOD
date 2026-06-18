import AnimatedSection from './AnimatedSection';
import BestsellersSection from './BestsellersSection';
import CommonConcernsSection from './CommonConcernsSection';
import HeroSection from './HeroSection';
import MemberBenefitsSection from './MemberBenefitsSection';

const HomeSections = () => (
  <main>
    <AnimatedSection direction="up"><HeroSection /></AnimatedSection>
    <AnimatedSection direction="left"><BestsellersSection /></AnimatedSection>
    <AnimatedSection direction="right"><CommonConcernsSection /></AnimatedSection>
    <AnimatedSection direction="left"><MemberBenefitsSection /></AnimatedSection>
  </main>
);

export default HomeSections;
