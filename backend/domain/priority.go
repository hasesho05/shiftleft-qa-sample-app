package domain

import "time"

// PriorityScore represents a calculated priority value for a task.
type PriorityScore struct {
	TaskID    string
	Score     float64
	Factors   []PriorityFactor
	UpdatedAt time.Time
}

// PriorityFactor describes one component of the priority calculation.
type PriorityFactor struct {
	Name   string
	Weight float64
	Value  float64
}

// CalculatePriority computes a weighted priority score from task attributes.
func CalculatePriority(urgency, impact, effort float64, isBlocking bool) PriorityScore {
	factors := []PriorityFactor{
		{Name: "urgency", Weight: 0.4, Value: clamp(urgency, 0, 10)},
		{Name: "impact", Weight: 0.35, Value: clamp(impact, 0, 10)},
		{Name: "effort_inverse", Weight: 0.25, Value: 10 - clamp(effort, 0, 10)},
	}

	score := 0.0
	for _, f := range factors {
		score += f.Weight * f.Value
	}

	if isBlocking {
		score *= 1.5
	}

	if score > 10 {
		score = 10
	}

	return PriorityScore{
		Score:     score,
		Factors:   factors,
		UpdatedAt: time.Now(),
	}
}

// ComparePriority returns negative if a < b, zero if equal, positive if a > b.
func ComparePriority(a, b PriorityScore) int {
	diff := a.Score - b.Score
	if diff < -0.001 {
		return -1
	}
	if diff > 0.001 {
		return 1
	}
	return 0
}

func clamp(v, min, max float64) float64 {
	if v < min {
		return min
	}
	if v > max {
		return max
	}
	return v
}
