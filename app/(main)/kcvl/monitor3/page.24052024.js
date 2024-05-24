/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from 'primereact/tabview';

// Core viewer
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance

import { qcfiles_search } from '../../../api/kcvl';

const Monitor3 = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const workerUrl = '/pdf.worker.js';

    const toast = useRef(null);
    const dta = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [YYMM, setYYMM] = useState(null);
    const [YYMMDD, setYYMMDD] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resultDT, setResultDT] = useState([]);
    const [fGroup, setFGroup] = useState('FD'); // CT, TWBN - , FD, LLE

    // ####### UPGRADE FOR SLIDE SHOW PDF (24/05/2024)
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideshowInterval = 10000; // Interval in milliseconds (e.g., 10000 for 10 seconds)

    const handleKeyPress = (e) => {
        // console.log('handleKeyPress', e);
        if (e.key === 'Enter') {
            actionSearch();
        }
    };
    const handleLoad = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const currentDay = currentDate.getDate().toString().padStart(2, '0');

        // const adjustMonth = '11'
        const formattedYYMM = `${currentYear}${currentMonth}`;
        const formattedYYMMDD = `${currentYear}${currentMonth}${currentDay}`;
        setYYMM(formattedYYMM);
        setYYMMDD(formattedYYMMDD);

        // loading 1st data
        handleFetchData(formattedYYMM);
    };

    const handleFetchData = async (todate) => {
        setLoading(true);
        try {
            if (todate && todate.length === 6) {
                //  console.log ('1- handleFetchData' , todate)
                const _paramsDT = {
                    ToDate: todate,
                    fileGroup: fGroup,
                    CancelYN: 'N'
                };
                const _result = await qcfiles_search(_paramsDT);
                console.log('_result', _result.data);

                if (_result.status === 200) {
                    setResultDT(_result.data);
                }
            } else {
                // setResultDT([])
            }
        } catch (error) {
            console.error('handleFetchData ', error);
            toast.current.show({ severity: 'error', summary: 'Warning', detail: { error }, life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    const actionSearch = () => {
        let myDate = YYMM.replace('/', '');
        setYYMM(myDate);
        handleFetchData(myDate);
    };

    useEffect(() => {
        handleLoad();
    }, []);

    // ####### UPGRADE FOR SLIDE SHOW PDF (24/05/2024)
    useEffect(() => {
        if (resultDT.length > 1) {
            const interval = setInterval(() => {
                // setCurrentSlide((prev) => (prev < resultDT.length - 1 ? prev + 1 : 0));
                //if (!document.fullscreenElement){
                    setCurrentSlide((prev) => (prev < resultDT.length - 1 ? prev + 1 : 0));
                //}
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

    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />
                <div className="card">
                    <h5>
                        Monitor : FD Tools{'   '}
                        <InputMask
                            value={YYMM}
                            onChange={(e) => {
                                setYYMM(e.target.value);
                            }}
                            mask="9999/99"
                            placeholder="Year/Month"
                            onKeyUp={handleKeyPress}
                        />
                        <Button label="Search" icon="pi pi-search" outlined onClick={actionSearch} />
                    </h5>
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        <TabPanel header="Preview">
                            {resultDT.length > 0 ? (
                                <div>
                                    <Worker workerUrl={workerUrl}>
                                        <div
                                            style={{
                                                height: '750px',
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            }}
                                        >
                                            <Viewer fileUrl={`/upload/${resultDT[currentSlide].fileUploadName}`} plugins={[defaultLayoutPluginInstance]} />
                                        </div>
                                    </Worker>
                                    {resultDT.length > 1 && (
                                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                            <Button onClick={handlePrev} label="Previous" />
                                            <span style={{ margin: '0 10px' }}>
                                                {currentSlide + 1} / {resultDT.length}
                                            </span>
                                            <Button onClick={handleNext} label="Next" />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /*
                                resultDT.map((resultData, index) => (
                                    <Worker workerUrl={workerUrl} key={index}>
                                        <div
                                            style={{
                                                height: '750px',
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            }}
                                        >
                                            <Viewer fileUrl={`/upload/${resultData.fileUploadName}`} plugins={[defaultLayoutPluginInstance]} />
                                        </div>
                                    </Worker>
                                ))
                                */
                                <div>-- No Data Found. --</div>
                            )}
                        </TabPanel>
                        <TabPanel header="List">
                            <ol>
                                {resultDT.length > 0 ? (
                                    resultDT.map((resultData, index) => (
                                        <li key={index}>
                                            {resultData.fileName} {'    '}
                                            <a href={'/upload/' + resultData.fileUploadName} target="_blank" title="View Files">
                                                <i className="pi pi-file-pdf"></i>
                                            </a>
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
        </div>
    );
};

export default Monitor3;
