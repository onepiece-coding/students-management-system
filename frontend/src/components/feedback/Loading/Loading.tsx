import { TLoading } from "@/types";

interface LoadingProps {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
}

const Loading = ({ status, error, children }: LoadingProps) => {
  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p style={{ color: "#DC3545" }}>{error}</p>;
  }

  return children;
};

export default Loading;
