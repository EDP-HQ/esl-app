/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useEffect, useState } from 'react';
// Core viewer
import { Worker, Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance


const Monitor1 = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const workerUrl = "/pdf.worker.js";

    const pdfFiles = [
        "Cord Type Check Result Jan 2024.pdf",
        "Testing result of LLE in Jan. 2024.pdf",
        // "Daily report of FD tool (2401).pdf",
    ];

    

    useEffect(() => {
        // Dynamically set the worker URL based on the current location
        // const currentLocation = window.location.origin;
        // console.log('current location', currentLocation)
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Monitor #1</h5>
                    Loading PDF Files
                    
                    {/* <Worker workerUrl={workerUrl}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '20px', // Adjust the margin as needed
                            }}
                        >
                            {pdfFiles.map((pdfFile, index) => (
                                <div
                                    key={index}
                                    style={{
                                        height: '750px',
                                        width: '30%', // Adjust the width as needed
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                    }}
                                >
                                    <Viewer fileUrl={`/upload/${pdfFile}`} plugins={[defaultLayoutPluginInstance]} />
                                </div>
                            ))}
                        </div>
                    </Worker> */}


                  

                    {pdfFiles.map((pdfFile, index) => (
                        <Worker workerUrl={workerUrl} key={index}>
                            <div
                                key={index}
                                style={{
                                    height: '750px',
                                    // width: '30%', // Adjust the width as needed
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                            >
                                <Viewer key={index} fileUrl={`/upload/${pdfFile}`} plugins={[defaultLayoutPluginInstance]} />
                            </div>
                        </Worker>
                    ))}


                                        
                    {/* // <Worker id={1} workerUrl={workerUrl}>
                    //     <div
                    //         style={{
                    //             height: '750px',
                    //             marginLeft: 'auto',
                    //             marginRight: 'auto',
                    //         }}
                    //     >
                    //         <Viewer fileUrl={`/upload/${pdfFiles[1]}`} plugins={[defaultLayoutPluginInstance]} />

                    //     </div>
                    // </Worker>

                    // <Worker id={2} workerUrl={workerUrl}>
                    //     <div
                    //         style={{
                    //             height: '750px',
                    //             marginLeft: 'auto',
                    //             marginRight: 'auto',
                    //         }}
                    //     >
                    //         <Viewer fileUrl={`/upload/${pdfFiles[2]}`} plugins={[defaultLayoutPluginInstance]} />

                    //     </div>
                    // </Worker> */}




                </div>
            </div>
        </div>
    );
};

export default Monitor1;
