import React, { useState } from 'react';
import Notification from '../../components/Notification/Notification';

export default function Upload() {
    const [notificationMessage, setNotificationMessage] = useState(null); // State for notification message

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        contact_number: '',
        affiliation: 'Student', // Default affiliation is set to 'Student'
        word_file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFormData((prevData) => ({ ...prevData, word_file: file }));
            setNotificationMessage(null); // Clear any existing notification
        } else {
            setFormData((prevData) => ({ ...prevData, word_file: null }));
            setNotificationMessage('Only Word files (.doc, .docx) are allowed.'); // Show notification for invalid file type
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for contact_number (must be 10 digits)
        const contactNumberRegex = /^\d{10}$/;
        if (!contactNumberRegex.test(formData.contact_number)) {
            setNotificationMessage('Please enter a valid 10-digit contact number.');
            return;
        }

        // Validation for email (basic email format check)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setNotificationMessage('Please enter a valid email address.');
            return;
        }

        if (!formData.word_file) {
            setNotificationMessage('Please upload a Word file.'); // Show notification if no file is selected
            return; // Prevent form submission if no file is selected
        }

        // Form data is valid, proceed with form submission
        const formDataToSend = new FormData();
        formDataToSend.append('full_name', formData.full_name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('contact_number', formData.contact_number);
        formDataToSend.append('affiliation', formData.affiliation);
        formDataToSend.append('word_file', formData.word_file);

        try {
            const response = await fetch('http://localhost:5000/api/create', {
                method: 'POST',
                body: formDataToSend,
            });
            const data = await response.json();
            console.log('API Response:', data); // Log the API response for debugging
            console.log("message is " + data.message);
            if (data.status === true && data.message === 'You are registered successfully') {
                // Show notification message if user is registered successfully
                console.log('Success Message:', data.message); // Log the success message for debugging
                setNotificationMessage('You are registered successfully');
                setTimeout(() => {
                    setNotificationMessage(null); // Clear the notification after 3 seconds
                }, 3000);
            } else if (data.status === false) {
                setNotificationMessage('You already submitted the paper');
                setTimeout(() => {
                    setNotificationMessage(null); // Clear the notification after 3 seconds
                }, 3000);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Upload User Information</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input
                        type="text"
                        id="contact_number"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation</label>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="student"
                            name="affiliation"
                            value="Student"
                            checked={formData.affiliation === 'Student'}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="student" className="mr-4">Student</label>
                        <input
                            type="radio"
                            id="teacher"
                            name="affiliation"
                            value="Teacher"
                            checked={formData.affiliation === 'Teacher'}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="teacher">Teacher</label>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="word_file" className="block text-sm font-medium text-gray-700 mb-1">Upload File (Only Word file is allowed)*</label>
                    <input
                        type="file"
                        id="word_file"
                        name="word_file"
                        onChange={handleFileChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        accept=".doc,.docx" // Specify accepted file types as Word files only
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                    Upload
                </button>
            </form>
            {notificationMessage && <Notification message={notificationMessage} bgColor="#6EE7B7" textColor="#333" />}
        </div>
    );
}
