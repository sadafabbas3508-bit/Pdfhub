import { useState } from "react";
import { Sparkles, Copy, Check, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

const AiImprove = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"improve" | "grammar" | "formal" | "simplify">("improve");

  const modes = [
    { id: "improve", label: "Improve Writing", description: "Enhance overall quality" },
    { id: "grammar", label: "Fix Grammar", description: "Correct grammatical errors" },
    { id: "formal", label: "Make Formal", description: "Professional tone" },
    { id: "simplify", label: "Simplify", description: "Make it easier to read" },
  ] as const;

  const handleImprove = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to improve");
      return;
    }

    setIsLoading(true);
    setOutputText("");

    // Simulate AI processing with local text transformation
    // This is a demo - in production, this would call the AI API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let improved = inputText;
      
      switch (mode) {
        case "grammar":
          // Basic grammar improvements simulation
          improved = inputText
            .replace(/\bi\b/g, "I")
            .replace(/\s+/g, " ")
            .replace(/\.+/g, ".")
            .trim();
          improved = improved.charAt(0).toUpperCase() + improved.slice(1);
          break;
        case "formal":
          improved = inputText
            .replace(/\bwanna\b/gi, "want to")
            .replace(/\bgonna\b/gi, "going to")
            .replace(/\bkinda\b/gi, "kind of")
            .replace(/\bgotta\b/gi, "got to")
            .replace(/\bdunno\b/gi, "do not know")
            .replace(/\byeah\b/gi, "yes")
            .replace(/\bnope\b/gi, "no")
            .replace(/!/g, ".")
            .trim();
          break;
        case "simplify":
          improved = inputText
            .replace(/utilize/gi, "use")
            .replace(/approximately/gi, "about")
            .replace(/subsequently/gi, "then")
            .replace(/demonstrate/gi, "show")
            .replace(/facilitate/gi, "help")
            .replace(/implement/gi, "do")
            .replace(/commence/gi, "start")
            .trim();
          break;
        default:
          // General improvement simulation
          improved = inputText
            .replace(/\s+/g, " ")
            .replace(/\bi\b/g, "I")
            .trim();
          improved = improved.charAt(0).toUpperCase() + improved.slice(1);
          if (!improved.endsWith(".") && !improved.endsWith("!") && !improved.endsWith("?")) {
            improved += ".";
          }
      }

      setOutputText(improved);
      toast.success("Text improved successfully!");
    } catch (error) {
      toast.error("Failed to improve text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast.success("Improved text copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              style={{ background: "linear-gradient(135deg, hsl(270, 70%, 60%) 0%, hsl(290, 80%, 55%) 100%)" }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              AI Text Improver
            </h1>
            <p className="text-muted-foreground text-lg">
              Enhance your writing with AI. Fix grammar, improve clarity, and make your text more professional.
            </p>
          </div>

          {/* Mode Selection */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    mode === m.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium text-sm text-foreground">{m.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input */}
              <div className="feature-card">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Original Text
                </label>
                <Textarea
                  placeholder="Paste your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[250px] bg-background resize-y"
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-muted-foreground">
                    {inputText.split(/\s+/).filter(Boolean).length} words
                  </span>
                  <Button 
                    onClick={handleImprove} 
                    disabled={isLoading || !inputText.trim()}
                    variant="hero"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Improving...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Improve
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Output */}
              <div className="feature-card">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Improved Text
                </label>
                <Textarea
                  placeholder="Your improved text will appear here..."
                  value={outputText}
                  readOnly
                  className="min-h-[250px] bg-background resize-y"
                />
                <div className="flex items-center justify-end mt-3">
                  <Button 
                    onClick={handleCopy} 
                    disabled={!outputText}
                    variant="secondary"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-8 p-6 rounded-2xl bg-secondary/50">
              <h3 className="font-display font-semibold text-foreground mb-3">✨ How it works</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Choose your improvement mode based on what you need</li>
                <li>• Paste your text and click "Improve" to enhance it</li>
                <li>• Copy the improved text and use it anywhere</li>
                <li>• Your data is processed securely and never stored</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AiImprove;
