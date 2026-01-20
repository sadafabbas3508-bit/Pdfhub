import { Users, Target, Heart, Zap, Shield, Globe } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Student First",
      description: "Every feature is designed with students in mind. We understand the challenges of academic life.",
    },
    {
      icon: Zap,
      title: "Speed & Simplicity",
      description: "No complicated interfaces or lengthy processes. Get your PDFs ready in seconds.",
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your documents are processed locally. We never store or access your files.",
    },
    {
      icon: Globe,
      title: "Free Forever",
      description: "Education should be accessible. Our tools are 100% free with no hidden costs.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              <span>About Us</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Making PDF Tools{" "}
              <span className="text-gradient">Accessible to Everyone</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              PDFTools was created with a simple mission: provide students and professionals 
              with free, easy-to-use PDF utilities that just work.
            </p>
          </div>

          {/* Mission */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="feature-card text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We believe that essential productivity tools should be free and accessible to everyone. 
                Whether you're a student working on assignments, a teacher preparing materials, or a 
                professional handling documents, you deserve tools that are fast, reliable, and respect your privacy.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="feature-card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <value.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">
                PDFTools started as a small project to help students convert their notes to PDFs without 
                paying for expensive software or dealing with complicated online tools filled with ads.
              </p>
              <p className="mb-4">
                Today, we serve thousands of students from around the world, helping them with their 
                academic work every day. From text conversion to AI-powered writing improvement, we're 
                constantly adding new features based on what our users need.
              </p>
              <p>
                We're committed to keeping our tools free and improving them based on your feedback. 
                If you have suggestions or need help, don't hesitate to reach out!
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-6">
              Try our free PDF tools today and see the difference.
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="/">Explore Tools</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
