export const ConfidenceBar: React.FC<{ confidence: number }> = ({ confidence }) => (
  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-200">
    <div
      className="h-full bg-blue-500 transition-all duration-150"
      style={{ width: `${(confidence * 100).toFixed(0)}%` }}
    />
  </div>
);
