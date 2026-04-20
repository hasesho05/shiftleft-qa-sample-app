import React, { useEffect, useState } from "react";
import { TaskCard } from "../components/TaskCard";
import { ApprovalDialog } from "../components/ApprovalDialog";
import { useTaskStore } from "../store/taskStore";
import { fetchTasks, transitionTask, approveTask, rejectTask } from "../api/tasks";

export function TaskBoard() {
  const { tasks, setTasks, updateTaskStatus } = useTaskStore();
  const [approvalTarget, setApprovalTarget] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, [setTasks]);

  const handleRequestApproval = async (id: string) => {
    await transitionTask(id, "pending_approval");
    updateTaskStatus(id, "pending_approval");
  };

  const handleApprove = async (id: string) => {
    await approveTask(id);
    updateTaskStatus(id, "done");
    setApprovalTarget(null);
  };

  const handleReject = async (id: string, reason: string) => {
    await rejectTask(id, reason);
    updateTaskStatus(id, "in_progress");
    setApprovalTarget(null);
  };

  const targetTask = tasks.find((t) => t.id === approvalTarget);

  return (
    <div className="task-board">
      <h1>Task Board</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            assignee={task.assignee}
            onRequestApproval={handleRequestApproval}
          />
        ))}
      </div>

      {targetTask && (
        <ApprovalDialog
          taskId={targetTask.id}
          taskTitle={targetTask.title}
          isOpen={true}
          onApprove={handleApprove}
          onReject={handleReject}
          onClose={() => setApprovalTarget(null)}
        />
      )}
    </div>
  );
}
