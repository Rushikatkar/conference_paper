import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import Cookies from 'js-cookie'; // Import the js-cookie library
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function ViewPapers() {
    const [papersData, setPapersData] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchData = async () => {
        try {
            const token = Cookies.get('accessToken'); // Retrieve JWT token from cookies
            const response = await axios.get('http://localhost:5000/api/getallfiles', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
                },
            });
            setPapersData(response.data.data); // Assuming response data has a 'data' field containing papers information
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
    };

    const generateWordFile = (bufferData, filename) => {
        const zip = new PizZip(bufferData);
        const doc = new Docxtemplater(zip);
        doc.render(); // Render the document (assuming you have a template with placeholders)

        const generatedBlob = doc.getZip().generate({ type: 'blob' }); // Generate the Blob for the Word file
        saveAs(generatedBlob, filename); // Download the generated Word file with the specified filename
    };

    const handleDownload = (paper) => {
        const filename = paper.word_file.originalname; // Get the original filename from paper data
        generateWordFile(paper.word_file.data.data, filename);
    };

    const handleLogout = () => {
        // Delete tokens from cookies and perform any other necessary logout actions
        Cookies.remove('accessToken'); // Remove access token from cookies
        // Redirect to the homepage
        navigate('/');
    };

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-4">View Papers</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliation</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word File</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {papersData.map((paper, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{paper.full_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{paper.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{paper.contact_number}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{paper.affiliation}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md"
                                    onClick={() => handleDownload(paper)}
                                >
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
