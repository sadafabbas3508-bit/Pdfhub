import { useState, useRef } from "react";
import { FileText, Download, Trash2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import jsPDF from "jspdf";

const TextToPdf = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to convert");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    
    // Add title if provided
    if (title.trim()) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(title.trim(), margin, 25);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
    }

    // Add content
    const startY = title.trim() ? 40 : 20;
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, margin, startY);

    // Download
    const fileName = title.trim() ? `${title.trim().replace(/\s+/g, "_")}.pdf` : "document.pdf";
    doc.save(fileName);
    toast.success("PDF downloaded successfully!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
    setTitle("");
    toast.info("Text cleared");
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Text to PDF Converter
            </h1>
            <p className="text-muted-foreground text-lg">
              Convert your text into a professional PDF document. Perfect for notes, essays, and assignments.
            </p>
          </div>

          {/* Converter Card */}
          <div className="max-w-3xl mx-auto">
            <div className="feature-card">
              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Document Title (Optional)
                </label>
                <Input
                  placeholder="Enter document title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-background"
                />
              </div>

              {/* Text Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Text
                </label>
                <Textarea
                  placeholder="Paste or type your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] bg-background resize-y"
                />
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <span>{text.length} characters</span>
                  <span>{text.split(/\s+/).filter(Boolean).length} words</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleDownload} variant="hero" className="flex-1 sm:flex-none">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button onClick={handleCopy} variant="secondary">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Text"}
                </Button>
                <Button onClick={handleClear} variant="ghost" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-8 p-6 rounded-2xl bg-secondary/50">
              <h3 className="font-display font-semibold text-foreground mb-3">💡 Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Add a title for a more professional document header</li>
                <li>• Use the AI Improve tool to enhance your text before converting</li>
                <li>• Your text is processed locally - we don't store any data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextToPdf;
