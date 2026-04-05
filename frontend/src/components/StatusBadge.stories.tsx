import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    showIcon: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Draft: Story = { args: { status: "draft" } };
export const Open: Story = { args: { status: "open" } };
export const InProgress: Story = { args: { status: "in_progress" } };
export const Review: Story = { args: { status: "review" } };
export const Approved: Story = { args: { status: "approved" } };
export const Done: Story = { args: { status: "done" } };
export const Rejected: Story = { args: { status: "rejected" } };

export const WithIcon: Story = {
  args: { status: "in_progress", showIcon: true },
};

export const Small: Story = {
  args: { status: "open", size: "sm" },
};

export const Large: Story = {
  args: { status: "done", size: "lg", showIcon: true },
};

export const UnknownStatus: Story = {
  args: { status: "custom_status" },
};
