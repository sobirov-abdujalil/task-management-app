import { Link } from "react-router-dom";
import { FaTasks, FaUserPlus, FaSignInAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="mb-8">
          <FaTasks className="text-6xl text-primary-600 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Task Management App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organize your tasks, boost productivity, and achieve your goals with our intuitive task management platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          <div className="card text-center">
            <FaTasks className="text-3xl text-primary-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Organize Tasks</h3>
            <p className="text-gray-600">
              Create, edit, and manage your tasks with ease. Set priorities and track progress.
            </p>
          </div>
          <div className="card text-center">
            <FaUserPlus className="text-3xl text-primary-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
            <p className="text-gray-600">
              Access your tasks from anywhere. Secure authentication keeps your data safe.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="btn btn-primary inline-flex items-center justify-center gap-2"
          >
            <FaSignInAlt />
            Sign In
          </Link>
          <Link
            to="/register"
            className="btn btn-secondary inline-flex items-center justify-center gap-2"
          >
            <FaUserPlus />
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
