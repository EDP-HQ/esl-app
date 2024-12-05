"use client";

import { useState, useEffect, Suspense } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Knob } from 'primereact/knob';
import { Chip } from 'primereact/chip';

import { getd14, getd15, getd16 } from "../../../api/kcvl"

const MRatio = () => {
    const [selectedMR, setSelectedMR] = useState({ name: 'D14A', key: 'D14A' })
    const [dataMR, setDataMR] = useState(null)
    const [fetchNow, setFetchNow] = useState();
    const [loading, setLoading] = useState(false)

    const MRList = [
        { name: 'D14A', key: 'D14A' },
        { name: 'D14B', key: 'D14B' },
        { name: 'D14C', key: 'D14C' },
        { name: 'D14D', key: 'D14D' },
        { name: 'D15E', key: 'D15E' },
        { name: 'D15F', key: 'D15F' },
        { name: 'D15G', key: 'D15G' },
        { name: 'D15H', key: 'D15H' },
        { name: 'D16A', key: 'D16A' },
        { name: 'D16B', key: 'D16B' },
        { name: 'D16C', key: 'D16C' },
        { name: 'D16D', key: 'D16D' }
    ]

    let options = {
        year: 'short',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    const dateSIGTIME = (sigValue) => {
        let parsedDate = new Date(sigValue);
        let formattedDate = parsedDate.toLocaleDateString('vi', options);

        return (
            <>{formattedDate}</>
        )
    }

    const handleMRChange = (value) => {
        setSelectedMR(value)
    }

    const fetchAndSetData = async (code) => {
        // console.log ('fetchAndSetData',code.name)
        const _code = code.name

        try {
            let fetchDataFunction;
            setLoading(true)
            setFetchNow(new Date());

            switch (_code.substring(0, 3)) {
                case "D14":
                    fetchDataFunction = getd14;
                    break;
                case "D15":
                    fetchDataFunction = getd15;
                    break;
                case "D16":
                    fetchDataFunction = getd16;
                    break;
                default:
                    console.error(`Invalid MACHCODE: ${_code}`);
                    return;
            }
            const result = await fetchDataFunction(_code);
            console.log(result)
            setDataMR(result)


        } catch (error) {
            console.error(`Error fetching data for ${_code}:`, error);
            setDataMR(null);
        } finally {
            setLoading(false)
        }
    }

    const content = (item) => {
        // let cColor = ""
        let _MACHCODE = item.MACHCODE
        // let displayMACHCODE = _MACHCODE.substring(_MACHCODE.length - 2)

        if (item.D05000 === "1") {
            return (
                <>
                    <span className="bg-green-100 border-circle w-2rem h-2rem flex align-items-center justify-content-center"><span className="pi pi-play"></span></span>
                    <span className="ml-2 font-medium">{_MACHCODE}</span>
                    {/* <Chip label={item.MACHCODE} icon="pi pi-apple" /> */}
                </>
            )
        } else {
            return (
                <>
                    <span className="bg-pink-100 border-circle w-2rem h-2rem flex align-items-center justify-content-center"><span className="pi pi-pause"></span></span>
                    <span className="ml-2 font-medium">{_MACHCODE}</span>
                </>
            )
        }
    }

    const DisplayData = ({ data }) => {

        if (!data) {
            return <p>No Fetching data for {selectedMR.name}</p>;
        }

        return (
            <div className="grid">
                {data.map((item) => (
                    <div className='col-4 md:col-3 xl:col-2' key={item.MACHCODE}>
                        
                        <Knob id={item.MACHCODE} value={item.MC_RATIO} label="{item.MC_RATIO}" valueColor={item.D05000 === "1" ? "#48d1cc" : "#708090"} readOnly />
                        <Chip className="pl-0 pr-3" template={content(item)} title={item.SIGTIME}/>
                        {/* <small>{dateSIGTIME(item.SIGTIME)}</small> */}
                    </div>
                ))}
            </div>
        )
    }

    const handleUpdateClick = () => {
        fetchAndSetData(selectedMR);
        // setSelectedMR(selectedMR)
    }

    const formattedDate = fetchNow
        ? fetchNow.toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        })
        : "";


        const formattedDateVi = fetchNow
        ? fetchNow.toLocaleString("vi-VI", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        })
        : "";




    useEffect(() => {
        // Fetch initial data
        fetchAndSetData(selectedMR);

        // Set up interval to fetch data every 1 minute
        const intervalId = setInterval(() => {
            fetchAndSetData(selectedMR);
        }, 60000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [selectedMR]); // Trigger the effect when selectedMR changes

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>
                        Machine Running Status (Ratio) {'  '}
                        <Dropdown value={selectedMR} onChange={(e) => handleMRChange(e.value)} options={MRList} optionLabel="name"
                            placeholder="Select a Machine" />
                    </h5>
                    <hr />

                    {loading ? (
                        <p>Loading data...</p>
                    ) : (
                        <DisplayData data={dataMR} />
                    )}
                    <Button text severity="secondary" size="small" label={formattedDateVi + ' (' + formattedDate + ')'} icon="pi pi-calendar" title='Nhấp để cập nhật (Click to Update)' loading={loading} onClick={handleUpdateClick} />
                </div>

            </div>
        </div>
    );
};

export default MRatio;
