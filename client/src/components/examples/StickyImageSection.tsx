import StickyImageSection from '../StickyImageSection';
import handsImage from '@assets/ChatGPT Image Sep 24, 2025, 05_29_45 PM_1758729617680.png';

export default function StickyImageSectionExample() {
  return (
    <div className="bg-background">
      <StickyImageSection 
        imageSrc={handsImage}
        sectionIndex={0}
        totalSections={2}
      >
        <p className="text-white/80 text-lg font-light tracking-wide">
          Example sticky section
        </p>
      </StickyImageSection>
    </div>
  );
}