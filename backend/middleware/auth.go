package middleware

import (
	"net/http"
)

// Role represents a user role.
type Role string

const (
	RoleViewer Role = "viewer"
	RoleEditor Role = "editor"
	RoleLead   Role = "lead"
	RoleAdmin  Role = "admin"
)

// RequireRole returns middleware that checks the user has one of the allowed roles.
func RequireRole(allowed ...Role) func(http.Handler) http.Handler {
	allowedSet := make(map[Role]bool, len(allowed))
	for _, r := range allowed {
		allowedSet[r] = true
	}

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			role := Role(r.Header.Get("X-User-Role"))
			if !allowedSet[role] {
				http.Error(w, "forbidden: insufficient role", http.StatusForbidden)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

// CanApprove checks whether a role has approval privileges.
func CanApprove(role Role) bool {
	return role == RoleLead || role == RoleAdmin
}

// RequireApprovalRole is a convenience middleware for approval endpoints.
func RequireApprovalRole() func(http.Handler) http.Handler {
	return RequireRole(RoleLead, RoleAdmin)
}
