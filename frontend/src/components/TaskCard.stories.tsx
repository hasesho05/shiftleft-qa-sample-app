import type { Meta, StoryObj } from "@storybook/react";
import { TaskCard } from "./TaskCard";

const meta: Meta<typeof TaskCard> = {
  title: "Components/TaskCard",
  component: TaskCard,
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Draft: Story = {
  args: {
    id: "1",
    title: "Implement login page",
    status: "draft",
    assignee: "Alice",
  },
};

export const InProgress: Story = {
  args: {
    id: "2",
    title: "Fix navigation bug",
    status: "in_progress",
    assignee: "Bob",
    onTransition: () => {},
  },
};

export const Done: Story = {
  args: {
    id: "3",
    title: "Write unit tests",
    status: "done",
    assignee: "Charlie",
  },
};
