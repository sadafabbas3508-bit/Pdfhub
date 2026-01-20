import { Link } from "react-router-dom";
import { FileText, Heart, Mail, Shield, Users } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/text-to-pdf", label: "Text to PDF" },
    { path: "/ai-improve", label: "AI Text Improve" },
    { path: "/image-to-pdf", label: "Image to PDF" },
    { path: "/camera-scan", label: "Camera Scan" },
  ];

  const legalLinks = [
    { path: "/privacy-policy", label: "Privacy Policy", icon: Shield },
    { path: "/about", label: "About Us", icon: Users },
    { path: "/contact", label: "Contact Us", icon: Mail },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                PDF<span className="text-primary">Tools</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm mb-4">
              Free PDF tools for students and professionals. Convert, scan, and improve your documents with AI-powered features. 100% free, no hidden costs.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-accent fill-accent" />
              <span>for students worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Tools</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} PDFTools. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Free forever for students 🎓
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
