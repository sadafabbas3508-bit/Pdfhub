import { FileText, Sparkles, Image, Camera } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      title: "Text to PDF",
      description: "Convert your text, notes, and documents into professional PDF files instantly. Perfect for assignments and reports.",
      icon: FileText,
      path: "/text-to-pdf",
      color: "hsl(175, 70%, 41%)",
      gradient: "linear-gradient(135deg, hsl(175, 70%, 41%) 0%, hsl(190, 80%, 45%) 100%)",
    },
    {
      title: "AI Text Improve",
      description: "Enhance your writing with AI. Fix grammar, improve clarity, and make your text more professional.",
      icon: Sparkles,
      path: "/ai-improve",
      color: "hsl(270, 70%, 60%)",
      gradient: "linear-gradient(135deg, hsl(270, 70%, 60%) 0%, hsl(290, 80%, 55%) 100%)",
    },
    {
      title: "Image to PDF",
      description: "Convert images to PDF documents. Combine multiple images into a single PDF file effortlessly.",
      icon: Image,
      path: "/image-to-pdf",
      color: "hsl(340, 75%, 55%)",
      gradient: "linear-gradient(135deg, hsl(340, 75%, 55%) 0%, hsl(15, 85%, 60%) 100%)",
    },
    {
      title: "Camera Scan",
      description: "Scan documents with your camera. Turn physical documents into digital PDFs in seconds.",
      icon: Camera,
      path: "/camera-scan",
      color: "hsl(45, 90%, 50%)",
      gradient: "linear-gradient(135deg, hsl(45, 90%, 50%) 0%, hsl(35, 95%, 55%) 100%)",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            All the Tools You Need
          </h2>
          <p className="text-muted-foreground text-lg">
            Professional PDF tools designed for students. Fast, free, and easy to use.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.path}
              {...feature}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
