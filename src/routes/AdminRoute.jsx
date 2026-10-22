import { Navigate } from "react-router-dom";

export default function AdminRoute({ children, me, error }) {
    // could not load the current user (e.g. banned, network/server error)
    if (error) return <Navigate to="/login" replace />;

    // still loading the current user
    if (!me) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (me.role !== "admin") return <Navigate to="/student" replace />;
    return children;
}
