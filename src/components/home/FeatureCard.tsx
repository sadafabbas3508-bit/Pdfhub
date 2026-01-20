import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
  gradient: string;
  delay?: number;
}

const FeatureCard = ({ title, description, icon: Icon, path, color, gradient, delay = 0 }: FeatureCardProps) => {
  return (
    <Link
      to={path}
      className="feature-card group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon Container */}
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: gradient }}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {description}
      </p>

      {/* Action */}
      <div 
        className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
        style={{ color }}
      >
        <span>Use Tool</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
};

export default FeatureCard;
