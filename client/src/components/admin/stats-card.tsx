interface StatsCardProps {
  title: string;
  value: string | number;
  color?: string;
  loading?: boolean;
  className?: string;
  "data-testid"?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  color = "text-primary", 
  loading, 
  className = "",
  "data-testid": testId
}: StatsCardProps) {
  if (loading) {
    return (
      <div className={`stat-card bg-card rounded-xl p-6 shadow-sm border border-border ${className}`} data-testid={testId}>
        <div className="h-8 skeleton w-16 mb-2"></div>
        <div className="h-4 skeleton w-24"></div>
      </div>
    );
  }

  return (
    <div className={`stat-card bg-card rounded-xl p-6 shadow-sm border border-border ${className}`} data-testid={testId}>
      <div className={`text-3xl font-bold mb-2 ${color}`} data-testid={`${testId}-value`}>
        {value}
      </div>
      <div className="text-muted-foreground" data-testid={`${testId}-title`}>
        {title}
      </div>
    </div>
  );
}
