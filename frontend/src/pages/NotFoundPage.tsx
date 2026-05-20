import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-153px)] max-w-7xl items-center justify-center px-6 py-14">
      <div className="max-w-lg text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-primary-600">
          404
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-ink-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-4 text-ink-500 dark:text-slate-400">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-md bg-primary-600 px-6 py-3 text-sm font-bold text-white hover:bg-primary-700"
        >
          Go home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
