import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4 space-y-4">
            <p className="text-7xl sm:text-8xl font-black gradient-text">404</p>
            <h1 className="text-2xl sm:text-3xl font-bold">Page not found</h1>
            <p className="text-base-content/70 max-w-md">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/" className="btn btn-primary">Go Home</Link>
                <Link to="/courses" className="btn btn-outline">Browse Courses</Link>
            </div>
        </div>
    );
}
