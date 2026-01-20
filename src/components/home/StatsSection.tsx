import { Users, FileText, Zap, Heart } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Happy Students",
      color: "text-primary",
    },
    {
      icon: FileText,
      value: "1M+",
      label: "PDFs Created",
      color: "text-ai-improve",
    },
    {
      icon: Zap,
      value: "99.9%",
      label: "Uptime",
      color: "text-image-pdf",
    },
    {
      icon: Heart,
      value: "100%",
      label: "Free Forever",
      color: "text-camera-scan",
    },
  ];

  return (
    <section className="py-16 border-y border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
