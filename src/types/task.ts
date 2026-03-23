export type Task = {
  id: number;
  title: string;
  status: "pending" | "progress" | "completed";
};
