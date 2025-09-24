import ImageBlock from '../ImageBlock';
import architectureImage from '@assets/generated_images/Architectural_art_photography_b9d97021.png';
import textureImage from '@assets/generated_images/Abstract_texture_art_04b4a2bc.png';

export default function ImageBlockExample() {
  return (
    <div className="space-y-32 bg-background">
      <ImageBlock 
        imageSrc={architectureImage}
        caption="ARCHITECTURAL FORMS · 2024"
        position="left"
        size="medium"
      />
      <ImageBlock 
        imageSrc={textureImage}
        caption="ABSTRACT COMPOSITION · MIXED MEDIA"
        position="right"
        size="small"
      />
    </div>
  );
}