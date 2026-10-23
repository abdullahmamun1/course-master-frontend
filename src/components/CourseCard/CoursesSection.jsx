import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCourses } from "../../services/courses.api";
import CoursesFilters from "./CoursesFilters";
import CoursesGrid from "./CoursesGrid";
import CoursesPagination from "./CoursesPagination";

export default function CoursesSection() {
    const { user } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // query states
    const [page, setPage] = useState(1);
    const [limit] = useState(8);
    const [search, setSearch] = useState("");                   // what the user is typing
    const [submittedSearch, setSubmittedSearch] = useState(""); // applied on submit only
    const [sort, setSort] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [debouncedCategory, setDebouncedCategory] = useState("");
    const [debouncedTags, setDebouncedTags] = useState("");
    const latestRequest = useRef(0);

    // text filters wait until the user stops typing instead of firing a request per keystroke
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedCategory(category.trim());
            setDebouncedTags(tags.trim());
        }, 400);
        return () => clearTimeout(timer);
    }, [category, tags]);

    // single place that fetches; every query change goes through here exactly once
    useEffect(() => {
        const requestId = ++latestRequest.current;

        const fetchCourses = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await getCourses({
                    page,
                    limit,
                    search: submittedSearch || undefined,
                    sort: sort || undefined,
                    category: debouncedCategory || undefined,
                    tags: debouncedTags || undefined,
                });
                if (requestId !== latestRequest.current) return; // a newer request is in flight
                setCourses(res.data.courses || []);
                setTotalPages(res.data.totalPages || 1);
            } catch {
                if (requestId !== latestRequest.current) return;
                setError("Failed to load courses");
            } finally {
                if (requestId === latestRequest.current) setLoading(false);
            }
        };

        fetchCourses();
    }, [page, limit, submittedSearch, sort, debouncedCategory, debouncedTags]);

    // any filter change starts again from page 1 (set together, so it's one fetch)
    const handleSort = (value) => { setSort(value); setPage(1); };
    const handleCategory = (value) => { setCategory(value); setPage(1); };
    const handleTags = (value) => { setTags(value); setPage(1); };

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setSubmittedSearch(search.trim());
        setPage(1);
    };

    return (
        <div className="space-y-6">

            <CoursesFilters
                search={search} setSearch={setSearch}
                sort={sort} setSort={handleSort}
                category={category} setCategory={handleCategory}
                tags={tags} setTags={handleTags}
                onSearchSubmit={onSearchSubmit}
            />

            {/* states */}
            {loading && (
                <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            {error && (
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
            )}

            {!loading && !error && courses.length === 0 && (
                <div className="rounded-xl border border-primary/20 bg-base-200 p-6 text-center">
                    <h3 className="text-lg font-semibold text-primary">
                        No courses found
                    </h3>
                    <p className="mt-1 text-base-content/70">
                        Try adjusting your search or filters.
                    </p>
                </div>
            )}


            {!loading && !error && courses.length > 0 && (
                <>
                    <CoursesGrid courses={courses} />
                    {user?.role === "admin" && (
                        <div className="flex justify-center pt-4">
                            <Link
                                to="/admin/courses"
                                className="btn btn-primary btn-wide"
                            >
                                Manage Courses
                            </Link>
                        </div>
                    )}
                </>
            )}

            <CoursesPagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />
        </div>
    );
}
