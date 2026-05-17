export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

            <h1 className="text-6xl font-bold text-gray-800">404</h1>

            <p className="text-xl mt-4 text-gray-600">
                Not found
            </p>

            <p className="text-sm text-gray-400 mt-2">
                The page you're looking for doesn't exist or has been moved.
            </p>

            <a
                href="/"
                className="mt-6 px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition"
            >
                Home
            </a>

        </div>
    );
}