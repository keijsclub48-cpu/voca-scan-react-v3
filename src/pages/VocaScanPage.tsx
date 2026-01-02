import { useEffect, useState } from "react";

export const VocaScanPage = () => {
  const [session, setSession] = useState<{
    sessionId: string | null;
    userId: string | null;
    type: string | null;
  }>({ sessionId: null, userId: null, type: null });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSession({
      sessionId: params.get("sessionId"),
      userId: params.get("userId"),
      type: params.get("type"),
    });

    // ここで CREPE 解析や録音開始などを呼ぶ
    // startAnalysis(params.get("sessionId"), params.get("type"));
  }, []);

  if (!session.sessionId) return <div>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Voca Scan</h1>
      <p>Session ID: {session.sessionId}</p>
      <p>User ID: {session.userId}</p>
      <p>Type: {session.type}</p>
    </div>
  );
};
