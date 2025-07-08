import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { auth } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Welcome to School Management Dashboard
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Hello, {auth?.user?.email}! You are successfully logged in.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Students</h2>
                        <p className="text-gray-600 mb-4">Manage student records and information</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            View Students
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Teachers</h2>
                        <p className="text-gray-600 mb-4">Manage teacher profiles and assignments</p>
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            View Teachers
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Courses</h2>
                        <p className="text-gray-600 mb-4">Manage course catalog and schedules</p>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                            View Courses
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                            Add New Student
                        </button>
                        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">
                            Add New Teacher
                        </button>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition">
                            Create New Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
