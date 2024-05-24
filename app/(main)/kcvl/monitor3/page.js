/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { InputMask } from "primereact/inputmask";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from "primereact/tabview";

// Core viewer
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin,RenderToolbar  } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance
import { qcfiles_search } from "../../../api/kcvl";

const Monitor3 = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const workerUrl = "/pdf.worker.js";

    const toast = useRef(null);
    const viewerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [YYMM, setYYMM] = useState(null);
    const [YYMMDD, setYYMMDD] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resultDT, setResultDT] = useState([]);
    const [fGroup, setFGroup] = useState('FD'); // CT, TWBN - , FD, LLE
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const slideshowInterval = 10000; // Interval in milliseconds (e.g., 10000 for 10 seconds)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            actionSearch();
        }
    }

    const handleLoad = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const currentDay = currentDate.getDate().toString().padStart(2, '0');

        const formattedYYMM = `${currentYear}${currentMonth}`;
        const formattedYYMMDD = `${currentYear}${currentMonth}${currentDay}`;
        setYYMM(formattedYYMM);
        setYYMMDD(formattedYYMMDD);

        handleFetchData(formattedYYMM);
    }

    const handleFetchData = async (todate) => {
        setLoading(true);
        try {
            if (todate && todate.length === 6) {
                const _paramsDT = {
                    "ToDate": todate,
                    "fileGroup": fGroup,
                    "CancelYN": 'N'
                }
                const _result = await qcfiles_search(_paramsDT);
                if (_result.status === 200) {
                    setResultDT(_result.data);
                }
            }
        } catch (error) {
            console.error('handleFetchData ', error);
            toast.current.show({ severity: 'error', summary: 'Warning', detail: { error }, life: 3000 });
        } finally {
            setLoading(false);
        }
    }

    const actionSearch = () => {
        let myDate = YYMM.replace('/', '');
        setYYMM(myDate);
        handleFetchData(myDate);
    }

    useEffect(() => {
        handleLoad();
    }, []);

    const renderToolbar = (toolbarSlot) => {
        return (
            <div style={{ display: 'none' }}>
                {toolbarSlot.toolbarSlot}
            </div>
        );
    };

    useEffect(() => {
        if (resultDT.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => {
                    const nextSlide = (prev < resultDT.length - 1 ? prev + 1 : 0);
                    return nextSlide;
                });
            }, slideshowInterval);

            return () => clearInterval(interval);
        }
    }, [resultDT.length]);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : resultDT.length - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev < resultDT.length - 1 ? prev + 1 : 0));
    };

    const enterFullscreen = () => {
        const viewerElement = viewerRef.current;
        if (viewerElement.requestFullscreen) {
            viewerElement.requestFullscreen();
        } else if (viewerElement.webkitRequestFullscreen) { /* Safari */
            viewerElement.webkitRequestFullscreen();
        } else if (viewerElement.msRequestFullscreen) { /* IE11 */
            viewerElement.msRequestFullscreen();
        } else if (viewerElement.mozRequestFullScreen) { /* Firefox */
            viewerElement.mozRequestFullScreen();
        }
        setIsFullscreen(true);
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        }
        setIsFullscreen(false);
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement && !document.mozFullScreenElement) {
                setIsFullscreen(false);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        if (isFullscreen) {
            enterFullscreen();
        }
    }, [currentSlide]);

    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />
                <div className="card">
                    <h5>Monitor : FD Tools{'   '}
                        <InputMask value={YYMM} onChange={(e) => { setYYMM(e.target.value); }} mask="9999/99" placeholder="Year/Month" onKeyUp={handleKeyPress} />
                        <Button label="Search" icon="pi pi-search" outlined onClick={actionSearch} />
                    </h5>
                    <TabView
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                    >
                        <TabPanel header="Preview">
                            {resultDT.length > 0 ? (
                                <div className="viewer-container" ref={viewerRef}>
                                    <Worker workerUrl={workerUrl}>
                                        <div
                                            style={{
                                                height: '75vh',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                maxHeight: '100%'
                                            }}
                                        >
                                            <Viewer fileUrl={`/upload/${resultDT[currentSlide].fileUploadName}`} plugins={[defaultLayoutPluginInstance]} defaultScale={1.0} renderToolbar={renderToolbar} />
                                        </div>
                                    </Worker>
                                    {resultDT.length > 1 && (
                                        <div className="buttons-container">
                                            <div className="navigation-buttons">
                                                <Button onClick={handlePrev} label="Previous" />
                                                <span style={{ margin: '0 10px' }}>{currentSlide + 1} / {resultDT.length}</span>
                                                <Button onClick={handleNext} label="Next" />
                                            </div>
                                            {!isFullscreen && (
                                                <div className="fullscreen-buttons">
                                                    <Button onClick={enterFullscreen} label="Enter Fullscreen" />
                                                </div>
                                            )}
                                            {isFullscreen && (
                                                <div className="fullscreen-buttons">
                                                    <Button onClick={exitFullscreen} label="Exit Fullscreen" />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* {resultDT.length > 1 && (
                                        <div className="navigation-buttons">
                                            <Button onClick={handlePrev} label="Previous" />
                                            <span style={{ margin: '0 10px' }}>{currentSlide + 1} / {resultDT.length}</span>
                                            <Button onClick={handleNext} label="Next" />
                                        </div>
                                    )}
                                    <div className="fullscreen-buttons">
                                        {resultDT.length > 1 && (
                                            <Button onClick={handlePrev} label="Previous" />
                                        )}
                                        <Button onClick={enterFullscreen} label="Enter Fullscreen" />
                                        {resultDT.length > 1 && (
                                            <span style={{ margin: '0 10px' }}>{currentSlide + 1} / {resultDT.length}</span>
                                        )}
                                        <Button onClick={exitFullscreen} label="Exit Fullscreen" />
                                        {resultDT.length > 1 && (
                                            <Button onClick={handleNext} label="Next" />
                                        )}
                                    </div> */}
                                </div>
                            ) : (
                                <div>-- No Data Found. --</div>
                            )}
                        </TabPanel>
                        <TabPanel header="List">
                            <ol>
                                {resultDT.length > 0 ? (
                                    resultDT.map((resultData, index) => (
                                        <li key={index}>
                                            {resultData.fileName} {'    '}
                                            <a href={'/upload/' + resultData.fileUploadName} target='_blank' title='View Files'><i className="pi pi-file-pdf"></i></a>
                                        </li>
                                    ))
                                ) : (
                                    <div>-- No Data Found. --</div>
                                )}
                            </ol>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
            <style jsx>{`
                .viewer-container {
                    position: relative;
                }
                .buttons-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .navigation-buttons, .fullscreen-buttons {
                     display: flex;
                     align-items: center;
                }
                .navigation-buttons button, .fullscreen-buttons button {
                    margin: 0 5px;
                }

                
            `}</style>
            
        </div>
    );
};

export default Monitor3;
