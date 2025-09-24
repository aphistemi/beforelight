import ScrollIndicator from '../ScrollIndicator';

export default function ScrollIndicatorExample() {
  return (
    <div className="relative">
      <ScrollIndicator />
      <div className="h-[200vh] bg-background p-8">
        <p className="text-center text-muted-foreground mt-16">
          Scroll down to see the progress indicator in action
        </p>
      </div>
    </div>
  );
}