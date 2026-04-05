package domain

import "testing"

func TestCalculatePriority_Normal(t *testing.T) {
	p := CalculatePriority(8, 7, 3, false)
	if p.Score <= 0 {
		t.Fatalf("expected positive score, got %f", p.Score)
	}
	if len(p.Factors) != 3 {
		t.Fatalf("expected 3 factors, got %d", len(p.Factors))
	}
}

func TestCalculatePriority_Blocking(t *testing.T) {
	normal := CalculatePriority(5, 5, 5, false)
	blocking := CalculatePriority(5, 5, 5, true)
	if blocking.Score <= normal.Score {
		t.Fatalf("blocking score (%f) should exceed normal (%f)", blocking.Score, normal.Score)
	}
}

func TestCalculatePriority_Clamping(t *testing.T) {
	p := CalculatePriority(-5, 15, 20, false)
	if p.Score < 0 || p.Score > 10 {
		t.Fatalf("score %f out of [0, 10] range", p.Score)
	}
}

func TestComparePriority(t *testing.T) {
	a := CalculatePriority(9, 8, 2, true)
	b := CalculatePriority(3, 3, 8, false)
	if ComparePriority(a, b) <= 0 {
		t.Fatal("expected a > b")
	}
	if ComparePriority(b, a) >= 0 {
		t.Fatal("expected b < a")
	}
}
