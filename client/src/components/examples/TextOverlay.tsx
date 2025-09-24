import TextOverlay from '../TextOverlay';

export default function TextOverlayExample() {
  return (
    <div className="space-y-24 bg-background">
      <TextOverlay position="center" size="large">
        The interplay between light and shadow reveals the essence of form
      </TextOverlay>
      
      <TextOverlay position="left" size="medium">
        Each piece explores the boundaries of perception and reality
      </TextOverlay>
      
      <TextOverlay position="right" size="small">
        <em>Where minimalism meets emotional depth</em>
      </TextOverlay>
    </div>
  );
}