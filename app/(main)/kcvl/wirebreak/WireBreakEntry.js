/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState, useRef, useEffect } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { InputMask } from "primereact/inputmask";
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast';


import { wirebreak_search, wirebreak_group } from "../../../api/kcvl"

const DataEmpty = {
    "wbID": 'X',
    "wbDate": '',
    "Company": '',
    "BPW": "",
    "Factory": "",
    "Customer": "",
    "Construction": "",
    "NoWireBreak": "",
    "ProdQty": "",
    "WireBreak": "",
    "InputDate": "",
    "InputUser": "",
    "UpdateDate": "",
    "UpdateUser": "",
    "CancelYN": "N"
}

const WireBreakEntry = ({ YYMM }) => {
    const toast = useRef(null);
    const dt = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);

    const [resultDT, setResultDT] = useState([])
    const [resultDTfilter, setResultDTfilter] = useState([])
    const [dateYYM, setDateYYMM] = useState(null)
    const [dateYYMMDD, setDateYYMMDD] = useState(null)

    const [sDate, setSDate] = useState(null)
    const [sBPW, setSBPW] = useState("")
    const [sFactory, setSFactory] = useState("")
    const [sCustomer, setSCustomer] = useState("")
    const [sConstruction, setSConstruction] = useState("")

    const [uniqueDate, setUniqueDate] = useState(null)
    const [uniqueBPW, setUniqueBPW] = useState(null)
    const [uniqueFactory, setUniqueFactory] = useState(null)
    const [uniqueCustomer, setUniqueCustomer] = useState(null)
    const [uniqueContruction, setUniqueContruction] = useState(null)

    const [itemsBPW, setItemsBPW] = useState([]);
    const [itemsFactory, setItemsFactory] = useState([]);
    const [itemsCustomer, setItemsCustomer] = useState([]);
    const [itemsContruction, setItemsContruction] = useState([]);

    const filterByUserData = (input, data1) => {
        return data1.filter(item => {
            // Assuming input is an object with properties like date, BPW, factory, customer, construction
            // console.log ('filterbyUserData: item', item)
            for (const key in input) {
                // If the property exists and the values do not match, exclude the item
                if (item[key] && item[key].toString().toLowerCase().includes(input[key].toLowerCase())) {
                    continue;
                } else {
                    return false;
                }
            }
            return true;
        });
    };

    const handleLoad = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const currentDay = currentDate.getDate().toString().padStart(2, '0');
        // const adjustMonth = '11'
        const _currentYYMM = YYMM
        const formattedYYMM = `${currentYear}${currentMonth}`;
        const formattedYYMMDD = `${currentYear}${currentMonth}${currentDay}`;
        setDateYYMM(formattedYYMM)
        setDateYYMMDD(formattedYYMMDD)

        if (_currentYYMM && _currentYYMM.length === 6) {
            handleFetchData(_currentYYMM)
        } else {
            handleFetchData(formattedYYMM)
        }


        handleFetchGroup()
    }

    const handleFetchData = async (udate) => {
        const _params = {
            "ToDate": udate,
            "BPW": sBPW,
            "Factory": sFactory,
            "Customer": sCustomer,
            "Construction": sConstruction,
        }
        // console.log ('handleFetchData', _params)
        try {
            setLoading(true)
            const _result = await wirebreak_search(_params)
            // console.log ('handleFetchData > _result', _result)
            setResultDT(_result.data)
            setResultDTfilter(_result.data)

        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Warning', detail: error.message || 'An unexpected error occurred', life: 3000 });
            setResultDT([])
            setResultDTfilter([])
        } finally {
            setLoading(false)
        }

    }

    const handleFetchDataSearch = async () => {
        const _params = {
            "ToDate": YYMM,
            "BPW": sBPW,
            "Factory": sFactory,
            "Customer": sCustomer,
            "Construction": sConstruction
        }
        // console.log ('handleFetchDataSearch', _params)

        try {
            setLoading(true)
            const _result = await wirebreak_search(_params)
            console.log('handleFetchData > _result', _result)
            setResultDT(_result.data)

            // if (_result.status === 200) {

            // } else {

            // }

        } catch (error) {
            // toast.current.show({ severity: 'error', summary: 'Warning', detail: error.message || 'An unexpected error occurred', life: 3000 });
        } finally {
            setLoading(false)
        }
    }

    const handleFetchGroup = async () => {
        //  console.log ('handleFetchGroup')
        try {
            setLoading(true)
            const _resultwbDate = await wirebreak_group({ "GroupType": "wbDate" })
            const _resultBPW = await wirebreak_group({ "GroupType": "BPW" })
            const _resultFactory = await wirebreak_group({ "GroupType": "Factory" })
            const _resultCustomer = await wirebreak_group({ "GroupType": "Customer" })
            const _resultConstruction = await wirebreak_group({ "GroupType": "Construction" })
            // console.log ("handleFetchGroup", )

            setUniqueBPW(_resultBPW.data)
            setUniqueFactory(_resultFactory.data)
            setUniqueCustomer(_resultCustomer.data)
            setUniqueContruction(_resultConstruction.data)



        } catch (error) {
            // toast.current.show({ severity: 'error', summary: 'Warning', detail: error.message || 'An unexpected error occurred', life: 3000 });
            setUniqueBPW(null)
            setUniqueFactory(null)
            setUniqueCustomer(null)
            setUniqueContruction(null)
        } finally {
            setLoading(false)
        }

    }

    const handleSelectChange = (e, sType) => {
        if (sType === "wbDate") {
            setSDate(e.value)
        } else if (sType === "BPW") {
            setSBPW(e.value)
        } else if (sType === "Factory") {
            setSFactory(e.value)
        } else if (sType === "Customer") {
            setSCustomer(e.value)
        } else if (sType === "Construction") {
            setSConstruction(e.value)
        }
    }

    const autoCompleteBPW = (event) => {
        if (!uniqueBPW || !Array.isArray(uniqueBPW)) {
            return;
        }
        let _items = uniqueBPW.map(item => {
            return item.GROUPNAME.toString();
        });
        _items = event.query ? _items.filter(item => item.includes(event.query)) : _items;
        if (_items !== null) {
            setItemsBPW(_items);
        }
    }
    const autoCompleteFactory = (event) => {
        if (!uniqueFactory || !Array.isArray(uniqueFactory)) {
            return;
        }
        let _items = uniqueFactory.map(item => {
            return item.GROUPNAME.toString();
        });
        _items = event.query ? _items.filter(item => item.includes(event.query)) : _items;
        setItemsFactory(_items);
    }
    const autoCompleteCustomer = (event) => {
        if (!uniqueCustomer || !Array.isArray(uniqueCustomer)) {
            return;
        }
        let _items = uniqueCustomer.map(item => {
            return item.GROUPNAME.toString();
        });
        _items = event.query ? _items.filter(item => item.includes(event.query)) : _items;
        setItemsCustomer(_items);
    }
    const autoCompleteContruction = (event) => {
        if (!uniqueContruction || !Array.isArray(uniqueContruction)) {
            return;
        }

        let _items = uniqueContruction.map(item => {
            return item.GROUPNAME.toString();
        });
        _items = event.query ? _items.filter(item => item.includes(event.query)) : _items;
        setItemsContruction(_items);
    }

    const actionRowButton = (rowData) => {
        return (
            <React.Fragment>
                <Button text icon="pi pi-search-plus" severity="secondary" title="Search From" onClick={() => actionSearchFrom(rowData)} />
                <Button text icon="pi pi-pencil" severity="primary" title="Edit" onClick={() => actionEdit(rowData)} />
                <Button text icon="pi pi-trash" severity="danger" title="Delete" onClick={() => actionDelete(rowData)} />
            </React.Fragment>
        );
    };

    const actionSearchButton = () => {
        // handleFetchData(YYMM)
        const userInput = {};
        let myData = resultDT
        let filteredData = resultDT

        userInput.BPW = sBPW
        userInput.Factory = sFactory
        userInput.Customer = sCustomer
        userInput.Construction = sConstruction


        if (userInput.BPW === '' && userInput.Factory === '' && userInput.Customer === '' && userInput.Construction === '') {
            // console.log('no input')
            filteredData = resultDT
            // console.log('no input', filteredData)
            setResultDTfilter(filteredData)
        } else {
            // console.log("userinput", userInput)
            filteredData = filterByUserData(userInput, myData);
            // console.log('filteredData', filteredData)
            setResultDTfilter(filteredData)
        }
    }

    const actionSearchEmpty = () => {
        const userInput = {};
        let myData = resultDT
        let filteredData = resultDT

        setSBPW("")
        setSFactory("")
        setSCustomer("")
        setSConstruction("")

        userInput.BPW = ''
        userInput.Factory = ''
        userInput.Customer = ''
        userInput.Construction = ''

        setResultDTfilter(filteredData)
    }

    const actionSearchFrom = (rowData) => {
        const userInput = {};
        let myData = resultDT
        let filteredData = resultDT

        setSBPW(rowData.BPW)
        setSFactory(rowData.Factory)
        setSCustomer(rowData.Customer)
        setSConstruction(rowData.Construction)

        userInput.BPW = rowData.BPW
        userInput.Factory = rowData.Factory
        userInput.Customer = rowData.Customer
        userInput.Construction = rowData.Construction

        filteredData = filterByUserData(userInput, myData);
        setResultDTfilter(filteredData)

        // actionSearchButton();
    }

    const actionNew = () => {

    }

    const actionExportCSV = () => {
        dt.current?.exportCSV();
    }

    const actionEdit = (rowData) => {
        //go
    }
    const actionDelete = (rowData) => {
        //go
    }

    const colDate = (rowData) => {
        const _wbDate = rowData.wbDate
        let year = _wbDate.substring(0, 4);
        let month = _wbDate.substring(4, 6);
        let day = _wbDate.substring(6, 8);
        const formattedDate = `${year}/${month}/${day}`;

        return <div>{formattedDate}</div>;
    }

    useEffect(() => {
        handleLoad();
    }, [YYMM])


    return (
        <div className="grid mt-0">
            <Toast ref={toast} />
            {/* Date : {YYMM} */}
            {/* ################### UI FOR SEARCH FROM ################## */}
            <div className="formgroup-inline col-12">
                {/* <div className="field">
                    <label htmlFor="wbDate" className="p-sr-only">Date</label>
                    <InputMask id='wbDate' mask="9999/99/99" slotChar="yyyy/mm/dd" placeholder="Date" value={sDate} onChange={(e)=>handleSelectChange(e,"wbDate")} autoComplete={true} />
                </div> */}
                <div className="field">
                    <label htmlFor="BPW" className="p-sr-only">BPW</label>
                    <AutoComplete id="BPW" placeholder="BPW" value={sBPW} onChange={(e) => handleSelectChange(e, "BPW")} suggestions={itemsBPW} completeMethod={autoCompleteBPW} dropdown />
                </div>
                <div className="field">
                    <label htmlFor="Factory" className="p-sr-only">Factory</label>
                    <AutoComplete id="Factory" placeholder="Factory" value={sFactory} onChange={(e) => handleSelectChange(e, "Factory")} suggestions={itemsFactory} completeMethod={autoCompleteFactory} dropdown />
                </div>
                <div className="field">
                    <label htmlFor="Customer" className="p-sr-only">Customer</label>
                    <AutoComplete id="Customer" placeholder="Customer" value={sCustomer} onChange={(e) => handleSelectChange(e, "Customer")} suggestions={itemsCustomer} completeMethod={autoCompleteCustomer} dropdown />
                </div>
                <div className="field">
                    <label htmlFor="Construction" className="p-sr-only">Construction</label>
                    <AutoComplete id="Construction" placeholder="Construction" value={sConstruction} onChange={(e) => handleSelectChange(e, "Construction")} suggestions={itemsContruction} completeMethod={autoCompleteContruction} dropdown />
                </div>
                <div className="field">
                    <Button icon="pi pi-search-plus" label="Filter" className="mr-1" onClick={actionSearchButton} />
                    <Button icon="pi pi-search-minus" label="Clear" severity="secondary" className="mr-1" onClick={() => { actionSearchEmpty(); }} />
                </div>
                <div className="field">
                    <Button icon="pi pi-plus" label="New" severity="success" className="mr-1" onClick={actionNew} />
                    <Button icon="pi pi-file-export" label="Export" severity="info" onClick={actionExportCSV}></Button>
                </div>
            </div>


            {/* ################### UI FOR DATA TABLE ################## */}
            <div className="col-12">
                <DataTable
                    loading={loading}
                    ref={dt}
                    datakey="wbID"
                    value={resultDTfilter}
                    selection={selectedRow}
                    onSelectionChange={(e) => setSelectedRow(e.value)}
                    resizableColumns
                    showGridlines
                    stripedRows
                    size={'small'}
                    emptyMessage="No Data Found."
                    className="datatable-responsive"
                    paginator
                    rows={31}
                    rowsPerPageOptions={[15, 31, 62, 93]}
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column selectionMode="multiple" exportable={false} style={{ width: '10px' }}></Column>
                    <Column body={colDate} header="Date" field="wbDate" filter sortable style={{ width: '10%' }}></Column>
                    <Column header="BPW" field="BPW" ></Column>
                    <Column header="Factory" field="Factory" ></Column>
                    <Column header="Customer" field="Customer" ></Column>
                    <Column header="Construction" field="Construction" ></Column>
                    <Column header="Prod Qty" field="ProdQty" style={{ width: '10%' }} ></Column>
                    <Column header="No Wire Break" field="NoWireBreak" style={{ width: '10%' }}></Column>
                    <Column header="Wire Break" field="WireBreak" style={{ width: '10%' }}></Column>
                    <Column body={actionRowButton} exportable={false} style={{ width: '10px' }}></Column>

                </DataTable>
            </div>

            {/* <div className="col-12 md:col-10">
                11
            </div>
            <div className="col-12 md:col-2">
                sss
            </div> */}
        </div>
    )
}

export default WireBreakEntry;