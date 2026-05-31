import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — High Performance Club",
  description: "Practical articles on tiny habits, daily routines, and high performance living for busy Indians.",
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
