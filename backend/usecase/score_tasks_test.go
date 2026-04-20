package usecase

import "testing"

func TestScoreTasks_SortedDescending(t *testing.T) {
	inputs := []TaskScoreInput{
		{TaskID: "low", Urgency: 2, Impact: 2, Effort: 8, IsBlocking: false},
		{TaskID: "high", Urgency: 9, Impact: 9, Effort: 2, IsBlocking: true},
		{TaskID: "mid", Urgency: 5, Impact: 5, Effort: 5, IsBlocking: false},
	}

	scores := ScoreTasks(inputs)
	if len(scores) != 3 {
		t.Fatalf("expected 3 scores, got %d", len(scores))
	}
	if scores[0].TaskID != "high" {
		t.Fatalf("expected 'high' first, got %s", scores[0].TaskID)
	}
	if scores[2].TaskID != "low" {
		t.Fatalf("expected 'low' last, got %s", scores[2].TaskID)
	}
}

func TestScoreTasks_Empty(t *testing.T) {
	scores := ScoreTasks(nil)
	if len(scores) != 0 {
		t.Fatalf("expected empty, got %d", len(scores))
	}
}

func TestTopN(t *testing.T) {
	inputs := []TaskScoreInput{
		{TaskID: "a", Urgency: 9, Impact: 9, Effort: 1, IsBlocking: true},
		{TaskID: "b", Urgency: 5, Impact: 5, Effort: 5, IsBlocking: false},
		{TaskID: "c", Urgency: 1, Impact: 1, Effort: 9, IsBlocking: false},
	}
	scores := ScoreTasks(inputs)
	top := TopN(scores, 2)
	if len(top) != 2 {
		t.Fatalf("expected 2, got %d", len(top))
	}
}
