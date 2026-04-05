package usecase

import (
	"sort"

	"github.com/hasesho05/shiftleft-qa-sample-app/backend/domain"
)

// TaskScoreInput holds the attributes needed for priority scoring.
type TaskScoreInput struct {
	TaskID     string
	Urgency    float64
	Impact     float64
	Effort     float64
	IsBlocking bool
}

// ScoreTasks calculates priority scores for a batch of tasks and returns them
// sorted by score in descending order.
func ScoreTasks(inputs []TaskScoreInput) []domain.PriorityScore {
	scores := make([]domain.PriorityScore, 0, len(inputs))
	for _, in := range inputs {
		s := domain.CalculatePriority(in.Urgency, in.Impact, in.Effort, in.IsBlocking)
		s.TaskID = in.TaskID
		scores = append(scores, s)
	}

	sort.Slice(scores, func(i, j int) bool {
		return domain.ComparePriority(scores[i], scores[j]) > 0
	})

	return scores
}

// TopN returns the top N highest-priority tasks.
func TopN(scores []domain.PriorityScore, n int) []domain.PriorityScore {
	if n >= len(scores) {
		return scores
	}
	return scores[:n]
}
