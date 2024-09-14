import React, { useState } from 'react';
import { FaPrint, FaDownload, FaEnvelope, FaTwitter, FaFacebook } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { useSelector } from 'react-redux';


const PaymentReceipt = () => {
    const [isSharing, setIsSharing] = useState(false);
    const receiptdata = useSelector((state) => state.PaymentReceipt)

    //extracting date time from datetime long string
    const dateRegex = /(\d{1,2} \w+ \d{4})/;
    const timeRegex = /at (\d{2}:\d{2}:\d{2} \w+)/;
    const dateMatch = receiptdata.datetime.match(dateRegex);
    const date = dateMatch ? dateMatch[0] : 'Date not found';

    // Extract the time
    const timeMatch = receiptdata.datetime.match(timeRegex);
    const time = timeMatch ? timeMatch[1] : 'Time not found';

    const transactionDetails = {
        amount: receiptdata.amt,
        date,
        time,
        method: 'Credit Card (**** 1234)',
        reference: receiptdata.refrencenumber
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const element = document.getElementById('receipt');
        const opt = {
            margin: 0,
            filename: 'receipt.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 5,
                useCORS: true,
                logging: true
            },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().catch(err => {
            console.error('PDF generation failed:', err);
        });
    };


    const handleShare = (platform) => {
        console.log(`Sharing receipt via ${platform}...`);
    };

    return (
        <div id="receipt" className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                    <IoMdCheckmarkCircleOutline className="text-6xl text-green-500 animate-bounce" />
                </div>
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Payment Successful!</h1>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Amount Paid:</span>
                        <span className="font-semibold text-gray-800">₹{transactionDetails.amount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="text-gray-800">{transactionDetails.date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="text-gray-800">{transactionDetails.time}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="text-gray-800">{transactionDetails.method}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Reference Number:</span>
                        <span className="text-gray-800">{transactionDetails.reference}</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <button
                        onClick={handlePrint}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <FaPrint className="mr-2" /> Print
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        <FaDownload className="mr-2" /> Download
                    </button>
                    <button
                        onClick={() => setIsSharing(!isSharing)}
                        className="flex items-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        <FaEnvelope className="mr-2" /> Share
                    </button>
                </div>

                {isSharing && (
                    <div className="flex justify-center space-x-4 animate-fade-in">
                        <button
                            onClick={() => handleShare('email')}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                            aria-label="Share via Email"
                        >
                            <FaEnvelope className="text-2xl" />
                        </button>
                        <button
                            onClick={() => handleShare('twitter')}
                            className="text-blue-400 hover:text-blue-600 transition-colors"
                            aria-label="Share on Twitter"
                        >
                            <FaTwitter className="text-2xl" />
                        </button>
                        <button
                            onClick={() => handleShare('facebook')}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            aria-label="Share on Facebook"
                        >
                            <FaFacebook className="text-2xl" />
                        </button>
                    </div>
                )}

                <div className="text-center mt-8">
                    <Link
                        to={'/'}
                        className="text-blue-500 hover:text-blue-700 transition-colors focus:outline-none focus:underline"
                    >
                        Return to Home Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentReceipt;