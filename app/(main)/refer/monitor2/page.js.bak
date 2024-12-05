/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useEffect, useState } from 'react';
// Core viewer
import { Worker,Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance


const Monitor1 = () => {
    const [workerUrl, setWorkerUrl] = useState('');

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        // Dynamically set the worker URL based on the current location
        const currentLocation = window.location.origin;
        console.log('current location', currentLocation)
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Monitor #2</h5>
                    Loading PDF Files
                   
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
                        <div
                            style={{
                                height: '750px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                            <Viewer fileUrl="/upload/Daily report of FD tool (2401).pdf" plugins={[defaultLayoutPluginInstance]} />
                        </div>
                    </Worker>


                </div>
            </div>
        </div>
    );
};

export default Monitor1;
