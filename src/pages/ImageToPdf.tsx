import { useState, useRef } from "react";
import { Image, Upload, Download, Trash2, GripVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

const ImageToPdf = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newImages.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: URL.createObjectURL(file),
        });
      }
    });

    setImages((prev) => [...prev, ...newImages]);
    toast.success(`${newImages.length} image(s) added`);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
    toast.info("Image removed");
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    toast.info("All images cleared");
  };

  const generatePdf = async () => {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsGenerating(true);

    try {
      const pdf = new jsPDF();
      
      for (let i = 0; i < images.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        const img = images[i];
        const imgElement = document.createElement("img");
        imgElement.src = img.preview;
        
        await new Promise<void>((resolve) => {
          imgElement.onload = () => {
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            
            const availableWidth = pageWidth - margin * 2;
            const availableHeight = pageHeight - margin * 2;
            
            const imgRatio = imgElement.width / imgElement.height;
            const pageRatio = availableWidth / availableHeight;
            
            let width, height;
            if (imgRatio > pageRatio) {
              width = availableWidth;
              height = width / imgRatio;
            } else {
              height = availableHeight;
              width = height * imgRatio;
            }
            
            const x = (pageWidth - width) / 2;
            const y = (pageHeight - height) / 2;
            
            pdf.addImage(img.preview, "JPEG", x, y, width, height);
            resolve();
          };
        });
      }

      pdf.save("images.pdf");
      toast.success("PDF generated successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              style={{ background: "linear-gradient(135deg, hsl(340, 75%, 55%) 0%, hsl(15, 85%, 60%) 100%)" }}
            >
              <Image className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Image to PDF Converter
            </h1>
            <p className="text-muted-foreground text-lg">
              Convert your images into a single PDF document. Perfect for photo collections and visual reports.
            </p>
          </div>

          {/* Converter */}
          <div className="max-w-4xl mx-auto">
            {/* Upload Area */}
            <div 
              className="feature-card mb-6 cursor-pointer hover:border-primary transition-colors duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  Drop images here or click to upload
                </h3>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, GIF, and more
                </p>
              </div>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div className="feature-card mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-foreground">
                    Selected Images ({images.length})
                  </h3>
                  <Button onClick={clearAll} variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <div 
                      key={img.id}
                      className="relative group aspect-square rounded-xl overflow-hidden bg-secondary"
                    >
                      <img
                        src={img.preview}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(img.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                  
                  {/* Add More Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary bg-card hover:bg-secondary/50 transition-all duration-300 flex flex-col items-center justify-center gap-2"
                  >
                    <Plus className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Add More</span>
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-center">
              <Button 
                onClick={generatePdf}
                disabled={images.length === 0 || isGenerating}
                variant="hero"
                size="xl"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download PDF ({images.length} {images.length === 1 ? "image" : "images"})
                  </>
                )}
              </Button>
            </div>

            {/* Tips */}
            <div className="mt-8 p-6 rounded-2xl bg-secondary/50">
              <h3 className="font-display font-semibold text-foreground mb-3">📸 Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Upload multiple images at once by selecting them together</li>
                <li>• Images will appear in the PDF in the order shown above</li>
                <li>• Each image will be on its own page in the PDF</li>
                <li>• High-resolution images will produce better quality PDFs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ImageToPdf;
