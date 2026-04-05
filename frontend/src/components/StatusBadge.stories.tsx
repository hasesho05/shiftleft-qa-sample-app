import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Draft: Story = { args: { status: "draft" } };
export const Open: Story = { args: { status: "open" } };
export const InProgress: Story = { args: { status: "in_progress" } };
export const Done: Story = { args: { status: "done" } };
