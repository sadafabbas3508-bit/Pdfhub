import { Shield, Eye, Lock, Server, UserCheck, AlertCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: `We believe in minimal data collection. Here's what we may collect:
      
• **Usage Data**: Anonymous statistics about which tools are used most frequently to help us improve our service.
• **Technical Data**: Basic browser and device information for compatibility purposes.
• **Contact Information**: Only if you voluntarily contact us through our contact form.

We do NOT collect, store, or access the content of your documents, images, or text. All processing happens locally in your browser.`,
    },
    {
      icon: Lock,
      title: "How We Protect Your Data",
      content: `Your privacy and data security are our top priorities:

• **Local Processing**: All document conversions happen directly in your browser. Your files never leave your device.
• **No Storage**: We don't store any documents, images, or text you process through our tools.
• **Secure Connection**: Our website uses HTTPS encryption to protect any data transmitted.
• **No Third-Party Access**: We don't share any data with third parties for advertising or marketing purposes.`,
    },
    {
      icon: Server,
      title: "Cookies & Analytics",
      content: `We use minimal cookies and analytics:

• **Essential Cookies**: Required for the website to function properly.
• **Analytics**: We may use privacy-respecting analytics to understand how our tools are used, without tracking individual users.
• **No Advertising Cookies**: We don't use any advertising or tracking cookies.

You can disable cookies in your browser settings, though this may affect some website functionality.`,
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: `You have full control over your data:

• **Access**: You can request information about any data we may have about you.
• **Deletion**: You can request deletion of any personal data we hold.
• **Opt-Out**: You can opt out of analytics tracking.
• **Data Portability**: Any data you create using our tools belongs to you.

To exercise these rights, contact us at aliharis0341@gmail.com.`,
    },
    {
      icon: AlertCircle,
      title: "Children's Privacy",
      content: `Our service is designed to be safe for users of all ages:

• We don't knowingly collect personal information from children under 13.
• Our tools can be safely used by students of all ages.
• If you're a parent or guardian and believe we have collected information about your child, please contact us immediately.`,
    },
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Legal</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We respect your privacy. Here's everything you need to know about how we handle your data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <div 
                key={section.title}
                className="feature-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                      {section.title}
                    </h2>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      {section.content.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-2 whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Summary Box */}
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Privacy Summary
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Your documents are processed locally and never stored
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  We don't sell or share your data with advertisers
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Minimal cookies, no tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Safe for students and users of all ages
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center pt-8">
              <p className="text-muted-foreground mb-2">
                Have questions about our privacy practices?
              </p>
              <a 
                href="mailto:aliharis0341@gmail.com"
                className="text-primary font-medium hover:underline"
              >
                Contact us at aliharis0341@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
