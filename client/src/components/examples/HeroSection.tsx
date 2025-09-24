import HeroSection from '../HeroSection';
import heroImage from '@assets/generated_images/Abstract_minimalist_art_piece_c8fcdb1d.png';

export default function HeroSectionExample() {
  return (
    <HeroSection 
      imageSrc={heroImage}
      title="EXHIBITION"
      subtitle="Contemporary minimalist works in monochrome"
    />
  );
}