/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { InputMask } from "primereact/inputmask";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from "primereact/tabview";

import {wirebreak_search} from "../../../api/kcvl"

import WireBreakEntry from "./WireBreakEntry"
import WireBreakDaily from "./WireBreakDaily"
import WireBreakMonthly from "./WireBreakMonthly"
import WireBreakYearly from "./WireBreakYearly"

const WireBreakPage = () => {
    const toast = useRef(null);
    const dta = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [YYMM, setYYMM] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const handleLoad = () => {
        // console.log('handleLoad');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        // const adjustMonth = '11'
        const formattedDate = `${currentYear}${currentMonth}`;

        setYYMM(formattedDate)
        // handleFetchData(formattedDate)
        
    }
    const handleKeyPress = (e) => {
        // console.log('handleKeyPress', e);
        if (e.key === 'Enter') {
            actionSearch()
        }
    }

    // const handleFetchData = async (udate)  => {
    //     const _params = {
    //         "ToDate" : udate,
    //         "BPW": "",            
    //         "Factory": "",
    //         "Customer": "",
    //         "Construction": "",
    //     }
    //     // console.log ('handleFetchData', _params)
    //     try{
    //         setLoading (true)
    //         const _result = await wirebreak_search(_params)
    //         console.log ('handleFetchData > _result', _result)

    //         if (_result.status === 200) {

    //         } else {

    //         }

    //     } catch (error) {

    //     } finally {
    //         setLoading(false)
    //     }

    // }

    const actionSearch = () => {
        let myDate = YYMM.replace('/', '');
        // console.log('actionSearch > myDate', myDate)
        setYYMM(myDate)
        // handleFetchData(myDate)
    }

    useEffect(() => {
        handleLoad();
    }, [])
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    {/* ################### UI FOR SEARCH FROM ################## */}

                    <h5>Wire Break Rate & Production{'   '}
                        <InputMask value={YYMM} onChange={(e) => { setYYMM(e.target.value); }} mask="9999/99" placeholder="Year/Month" onKeyUp={handleKeyPress} />
                        <Button label="Search" icon="pi pi-search" outlined onClick={actionSearch} />
                    </h5>
                    {/* ################### UI TAB ################## */}
                    <TabView
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                    >
                        <TabPanel header="Entry" ><WireBreakEntry YYMM={YYMM}/> </TabPanel>
                        <TabPanel header="Daily" ><WireBreakDaily YYMM={YYMM} /> </TabPanel>
                        <TabPanel header="Monthly" ><WireBreakMonthly YYMM={YYMM}/></TabPanel>
                        <TabPanel header="Yearly" ><WireBreakYearly YYMM={YYMM}/> </TabPanel>

                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default WireBreakPage;
