import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, Download, RotateCcw, FlipHorizontal, Maximize, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import jsPDF from "jspdf";

const CameraScan = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [isGenerating, setIsGenerating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraActive(true);
      toast.success("Camera started");
    } catch (error) {
      toast.error("Could not access camera. Please check permissions.");
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  }, [stream]);

  const toggleCamera = useCallback(() => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, [stopCamera]);

  useEffect(() => {
    if (isCameraActive && facingMode) {
      startCamera();
    }
  }, [facingMode]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImages((prev) => [...prev, imageData]);
    toast.success("Document captured!");
  };

  const removeImage = (index: number) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
    toast.info("Image removed");
  };

  const generatePdf = async () => {
    if (capturedImages.length === 0) {
      toast.error("Please capture at least one document");
      return;
    }

    setIsGenerating(true);

    try {
      const pdf = new jsPDF();

      for (let i = 0; i < capturedImages.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        const imgData = capturedImages[i];
        const img = new window.Image();
        img.src = imgData;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 5;

            const availableWidth = pageWidth - margin * 2;
            const availableHeight = pageHeight - margin * 2;

            const imgRatio = img.width / img.height;
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

            pdf.addImage(imgData, "JPEG", x, y, width, height);
            resolve();
          };
        });
      }

      pdf.save("scanned-document.pdf");
      toast.success("PDF saved successfully!");
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
              style={{ background: "linear-gradient(135deg, hsl(45, 90%, 50%) 0%, hsl(35, 95%, 55%) 100%)" }}
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Camera Document Scanner
            </h1>
            <p className="text-muted-foreground text-lg">
              Scan physical documents with your camera and convert them to PDF instantly.
            </p>
          </div>

          {/* Scanner */}
          <div className="max-w-4xl mx-auto">
            {/* Camera View */}
            <div className="feature-card mb-6">
              <div className="relative aspect-video bg-foreground/5 rounded-xl overflow-hidden">
                {isCameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Camera className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Camera is not active</p>
                    <Button onClick={startCamera} variant="hero">
                      <Camera className="w-4 h-4" />
                      Start Camera
                    </Button>
                  </div>
                )}

                {/* Camera overlay guides */}
                {isCameraActive && (
                  <div className="absolute inset-4 border-2 border-white/30 rounded-lg pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
                  </div>
                )}
              </div>

              {/* Camera Controls */}
              {isCameraActive && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  <Button onClick={toggleCamera} variant="secondary" size="icon">
                    <FlipHorizontal className="w-5 h-5" />
                  </Button>
                  <Button onClick={captureImage} variant="hero" size="xl">
                    <Camera className="w-5 h-5" />
                    Capture
                  </Button>
                  <Button onClick={stopCamera} variant="secondary" size="icon">
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Hidden canvas for capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Captured Images */}
            {capturedImages.length > 0 && (
              <div className="feature-card mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-foreground">
                    Captured Pages ({capturedImages.length})
                  </h3>
                  <Button
                    onClick={() => setCapturedImages([])}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {capturedImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative group aspect-[3/4] rounded-xl overflow-hidden bg-secondary cursor-pointer"
                      onClick={() => removeImage(index)}
                    >
                      <img
                        src={img}
                        alt={`Page ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-destructive/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="text-white font-medium">Click to remove</span>
                      </div>
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generate PDF Button */}
            {capturedImages.length > 0 && (
              <div className="flex justify-center mb-8">
                <Button
                  onClick={generatePdf}
                  disabled={isGenerating}
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
                      Download PDF ({capturedImages.length} {capturedImages.length === 1 ? "page" : "pages"})
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Tips */}
            <div className="p-6 rounded-2xl bg-secondary/50">
              <h3 className="font-display font-semibold text-foreground mb-3">📱 Scanning Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Hold your device steady and ensure good lighting</li>
                <li>• Position the document within the corner guides</li>
                <li>• Avoid shadows and reflections on the document</li>
                <li>• Use the flip camera button to switch between front and back cameras</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CameraScan;
