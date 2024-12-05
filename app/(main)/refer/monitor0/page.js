/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { InputMask } from "primereact/inputmask";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from "primereact/tabview";

import WBGraf from "./WBGraf"
import WBDaily from "./WBDaily"
import WBMonthly from "./WBMontly"
import WBYearly from "./WBYearly"

import { withAuth } from '../../../api/kcvl'

const WireBreakMonitor = () => {
    const toast = useRef(null);
    const dta = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [YYMM, setYYMM] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleKeyPress = (e) => {
        // console.log('handleKeyPress', e);
        if (e.key === 'Enter') {
            actionSearch()
        }
    }
    
    const actionSearch = () => {
        let myDate = YYMM.replace('/', '');
        setYYMM(myDate)
    }

    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        // const adjustMonth = '11'
        const formattedDate = `${currentYear}${currentMonth}`;

        setYYMM(formattedDate)
    }, [])

    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />
                <div className="card">
                    <h5>Monitoring : Wire Break Rate & Production{'   '}
                        <InputMask value={YYMM} onChange={(e) => { setYYMM(e.target.value); }} mask="9999/99" placeholder="Year/Month" onKeyUp={handleKeyPress} />
                        <Button label="Search" icon="pi pi-search" outlined onClick={actionSearch} />
                    </h5>

                    <TabView
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                    >
                        <TabPanel header="Daily Chart" ><WBGraf YYMM={YYMM}/> </TabPanel>
                        <TabPanel header="Daily Data" ><WBDaily YYMM={YYMM}/></TabPanel>
                        <TabPanel header="Monthly Data" ><WBMonthly YYMM={YYMM}/></TabPanel>
                        <TabPanel header="Yearly Data" ><WBYearly YYMM={YYMM}/></TabPanel>

                    </TabView>
                </div>
            </div>
        </div>
    )
}

export default withAuth(WireBreakMonitor);