interface Props {
  isRunning: boolean;
  isAnalyzing: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const ControlPanel: React.FC<Props> = ({ isRunning, isAnalyzing, onStart, onStop }) => {
  if (!isRunning) {
    return (
      <button onClick={onStart} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-xl">
        ● 診断スタート
      </button>
    );
  }

  return (
    <button
      onClick={onStop}
      disabled={isAnalyzing}
      className={`w-full py-4 text-white rounded-2xl font-bold text-xl ${
        isAnalyzing ? "bg-gray-400" : "bg-red-500 animate-pulse"
      }`}
    >
      {isAnalyzing ? "解析中..." : "停止して解析"}
    </button>
  );
};
