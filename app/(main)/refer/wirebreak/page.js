/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState, useRef, useEffect } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { InputText } from 'primereact/inputtext';
import { InputMask } from "primereact/inputmask";
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast';
import { Column } from "primereact/column";
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';

import { TabView, TabPanel } from "primereact/tabview";

import { wirebreak_search, wirebreak_group, wirebreak_newsave, wirebreak_editsave, wirebreak_cancelYN, wirebreak_daily,withAuth } from "../../../api/kcvl"

const DataEmpty = {
    "wbID": '',
    "wbDate": '',
    "Company": '',
    "BPW": "",
    "Factory": "",
    "Customer": "",
    "Construction": "",
    "NoWireBreak": 0,
    "ProdQty": 0,
    "WireBreak": 0,
    "InputDate": "",
    "InputUser": "",
    "UpdateDate": "",
    "UpdateUser": "",
    "CancelYN": "N"
}

const WireBreakPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [YYMM, setYYMM] = useState(null)
    const toast = useRef(null);
    const dt = useRef(null);
    const dt1 = useRef(null);
    const dt2 = useRef(null);
    const dt3 = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);

    const [resultDT, setResultDT] = useState([])
    const [resultDTfilter, setResultDTfilter] = useState([])
    const [resultDTdaily, setResultDTdaily] = useState([])
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

    const [dataDialog, setDataDialog] = useState(DataEmpty)
    const [submitted, setSubmitted] = useState(false)
    const [showDialog, setShowDialog] = useState(false)

    const [dataDeleteDialog, setDataDeleteDialog] = useState(DataEmpty)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [dateDelete, setDateDelete] = useState()
    const [dataDelete, setDataDelete] = useState()

    const [_datelist, set_DateList] = useState([])

    const generateYYMMDDLabel = (YYMM) => {
        const year = parseInt(YYMM.substring(0, 4), 10);
        const month = parseInt(YYMM.substring(4, 6), 10);

        const lastDay = new Date(year, month, 0).getDate();

        const labelYYMMDD = Array.from({ length: lastDay }, (_, index) => {
            const day = index + 1;
            return day < 10 ? `0${day}` : `${day}`;
        });

        return labelYYMMDD;
    }



    function getValueOrDefault(data, key, defaultValue) {
        return data['0']?.[key] || data[key] || defaultValue;
    }
    const getValueAutoComplete = (item) => {
        if (typeof item === 'object' && item !== null && 'name' in item) {
            return item.name
        } else if (typeof item === 'string') {
            return item
        } else {
            return null
        }
    }
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
    const handleInputChange = (e, name) => {
        const val = (e.target && e.target.value.trim()) || ''
        let _dataDialogTemp = { ...dataDialog }
        _dataDialogTemp[`${name}`] = val
        setDataDialog(_dataDialogTemp)
    }
    const handleAutoCompleteChange = (e, name) => {
        const val = (e.value) || ''
        let _dataDialogTemp = { ...dataDialog }
        _dataDialogTemp[`${name}`] = val
        setDataDialog(_dataDialogTemp)
    }
    const handleNumberChange = (e, name) => {
        const val = (e.value) || '0'
        let _dataDialogTemp = { ...dataDialog }

        _dataDialogTemp[`${name}`] = val
        setDataDialog(_dataDialogTemp)

        handleCalcute(_dataDialogTemp)
    }
    const handleCalcute = (temp) => {
        let _dataDialogTemp = temp
        let _ProdQty = temp.ProdQty
        let _NoWireBreak = temp.NoWireBreak
        let _WireBreak = 0

        if (_ProdQty === 0 || _NoWireBreak === 0) {
            _WireBreak = 0
        } else if (!isNaN(_ProdQty) && !isNaN(_NoWireBreak)) {
            _WireBreak = _NoWireBreak / _ProdQty;
            if (!isFinite(_WireBreak)) {
                _WireBreak = 0;
            }
        } else {
            _WireBreak = 0;
        }

        _dataDialogTemp[`WireBreak`] = _WireBreak
        setDataDialog(_dataDialogTemp)
        // console.log('_dataDialogTemp', _dataDialogTemp)
        // console.log('_ProdQty', _ProdQty)
        // console.log('_NoWireBreak', _NoWireBreak)
        // console.log('_WireBreak', _WireBreak)

    }

    const handleKeyPress = (e) => {
        // console.log('handleKeyPress', e);
        if (e.key === 'Enter') {
            actionSearch()
        }
    }
    const actionSearch = () => {
        let myDate = YYMM.replace('/', '');
        // console.log('actionSearch > myDate', myDate)
        setYYMM(myDate)
        handleFetchData(myDate)
    }
    const handleLoad = () => {
        // console.log('handleLoad');        
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const currentDay = currentDate.getDate().toString().padStart(2, '0');
        // const adjustMonth = '11'
        const formattedDate = `${currentYear}${currentMonth}`;
        const formattedYYMM = `${currentYear}${currentMonth}`;
        const formattedYYMMDD = `${currentYear}${currentMonth}${currentDay}`;

        setYYMM(formattedDate)
        setDateYYMM(formattedYYMM)
        setDateYYMMDD(formattedYYMMDD)

        // handleFetchData(formattedDate)
        if (formattedDate && formattedDate.length === 6) {
            handleFetchData(formattedYYMM)
        } else {
            // handleFetchData(formattedYYMM)
        }
        handleFetchGroup()
    }
    const handleFetchData = async (udate) => {
        // console.log ('handleFetchData', _params)
        let _datelisttemp = []
        try {

            setLoading(true)
            const _params = {
                "ToDate": udate,
                "BPW": sBPW,
                "Factory": sFactory,
                "Customer": sCustomer,
                "Construction": sConstruction,
            }

            const _paramsDaily = {
                "YYMM": udate
            };

            const _result = await wirebreak_search(_params)
            // console.log('handleFetchData > _result', _result)
            setResultDT(_result.data)
            setResultDTfilter(_result.data)

            const _resultDaily = await wirebreak_daily(_paramsDaily);
            setResultDTdaily(_resultDaily.data)

            _datelisttemp = generateYYMMDDLabel(udate)
            set_DateList(_datelisttemp)

            // console.log('_datalist', _datelisttemp)

        } catch (error) {
            // toast.current.show({ severity: 'error', summary: 'Warning', detail: error.message || 'An unexpected error occurred', life: 3000 });
            setResultDT([])
            setResultDTfilter([])
        } finally {
            setLoading(false)
        }

    }
    const handleNewsave = async (_params) => {
        // console.log('handleNewsave', _params)
        try {
            const result = await wirebreak_newsave(_params)
            // console.log (result)

            if (result.status === 200) {
                setShowDialog(false)
                setDataDialog(DataEmpty)
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Wire Break Rate & Production Saved', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Warning', detail: { result }, life: 3000 });
            }
            actionSearch()

        } catch (error) {
            console.error('Error saving handleNewsave:', error);
            toast.current.show({ severity: 'error', summary: 'Warning', detail: { error }, life: 3000 });
        }

    }
    const handleEditsave = async (_params) => {
        // console.log('handleNewsave', _params)
        try {
            const result = await wirebreak_editsave(_params)
            // console.log (result)

            if (result.status === 200) {
                setShowDialog(false)
                setDataDialog(DataEmpty)

                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Wire Break Rate & Production Updated', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Warning', detail: { result }, life: 3000 });
            }
            actionSearch()

        } catch (error) {
            console.error('Error saving handleEditsave:', error);
            toast.current.show({ severity: 'error', summary: 'Warning', detail: { error }, life: 3000 });
        }

    }
    const handleDeleteSave = async (_params) => {
        try {
            const result = await wirebreak_cancelYN(_params)
            // console.log (result)

            if (result.status === 200) {
                setShowDeleteDialog(false)
                setDataDeleteDialog(DataEmpty)

                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Wire Break Rate & Production Deleted', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Warning', detail: { result }, life: 3000 });
            }
            actionSearch()

        } catch (error) {
            console.error('Error saving handleDeleteSave:', error);
            toast.current.show({ severity: 'error', summary: 'Warning', detail: { error }, life: 3000 });
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

        // filteredData = filterByUserData(userInput, myData);
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
    const actionExportCSV = () => {
        dt.current?.exportCSV();
    }
    const actionNew = () => {

        DataEmpty.wbID = ''
        DataEmpty.Company = 'KCVL'
        DataEmpty.InputUser = 'QC'
        DataEmpty.UpdateUser = 'QC'

        DataEmpty.wbDate = dateYYMMDD
        DataEmpty.BPW = sBPW
        DataEmpty.Factory = sFactory
        DataEmpty.Customer = sCustomer
        DataEmpty.Construction = sConstruction

        DataEmpty.ProdQty = 0
        DataEmpty.NoWireBreak = 0
        DataEmpty.WireBreak = 0

        // console.log('actionNew', DataEmpty)
        // ~~~~ open dialog
        setDataDialog(DataEmpty)
        setSubmitted(false)
        setShowDialog(true)
    }
    const actionEdit = (rowData) => {
        // console.log('actionEdit', rowData)
        setDataDialog(rowData)
        setShowDialog(true)
    }
    const actionSaveDialog = () => {
        let _wbDate = getValueOrDefault(dataDialog, 'wbDate', '')
        let _Company = getValueOrDefault(dataDialog, 'Company', '')
        let _BPW = getValueOrDefault(dataDialog, 'BPW', '')
        let _Factory = getValueOrDefault(dataDialog, 'Factory', '')
        let _Customer = getValueOrDefault(dataDialog, 'Customer', '')
        let _Construction = getValueOrDefault(dataDialog, 'Construction', '')

        let _ProdQty = getValueOrDefault(dataDialog, 'ProdQty', 0)
        let _NoWireBreak = getValueOrDefault(dataDialog, 'NoWireBreak', 0)
        let _WireBreak = getValueOrDefault(dataDialog, 'WireBreak', 0)

        let _InputUser = 'KCVL'

        if (_wbDate != '' && _BPW != '' && _Factory != '' && _Customer != '' && _Construction != '') {
            const validDate = _wbDate.replace(/\//g, '');

            if (validDate.length === 8) {
                if (dataDialog.wbID) {
                    //EDIT 
                    // console.log ('actionSaveDialog: edit')
                    const _paramEDIT = {
                        "wbID": dataDialog.wbID,
                        "wbDate": validDate,
                        "Company": _Company,
                        "BPW": _BPW,
                        "Factory": _Factory,
                        "Customer": _Customer,
                        "Construction": _Construction,
                        "NoWireBreak": _NoWireBreak,
                        "ProdQty": _ProdQty,
                        "WireBreak": _WireBreak,
                        "InputUser": _InputUser
                    }

                    // console.log ('_paramEDIT', _paramEDIT)
                    handleEditsave(_paramEDIT)

                } else {
                    //NEW 
                    // console.log ('actionSaveDialog: new')
                    const _paramNEW = {
                        "wbDate": validDate,
                        "Company": _Company,
                        "BPW": _BPW,
                        "Factory": _Factory,
                        "Customer": _Customer,
                        "Construction": _Construction,
                        "NoWireBreak": _NoWireBreak,
                        "ProdQty": _ProdQty,
                        "WireBreak": _WireBreak,
                        "InputUser": _InputUser
                    }

                    // console.log('_paramNEW', _paramNEW)
                    handleNewsave(_paramNEW)
                }
            } else {
                toast.current.show({ severity: 'error', summary: 'Warning', detail: 'Date is Empty', life: 3000 });
            }


        } else {
            toast.current.show({ severity: 'error', summary: 'Warning', detail: 'Requirement Data is Empty', life: 3000 });
        }
    }
    const actionCloseDialog = () => {
        //
        // ~~~~ open dialog
        setShowDialog(false)
        setSubmitted(true)
        setDataDialog(DataEmpty)
    }
    const actionDelete = (rowData) => {

        const _tempDate = rowData.wbDate
        const _formatDate = _tempDate.substring(6, 8) + '/' + _tempDate.substring(4, 6) + '/' + _tempDate.substring(0, 4)
        setDateDelete(_formatDate)

        const _dataDelete = {
            "BPW": rowData.BPW,
            "Factory": rowData.Factory,
            "Customer": rowData.Customer,
            "Construction": rowData.Construction,
        }

        setDataDelete(_dataDelete)

        setDataDeleteDialog(rowData)
        setShowDeleteDialog(true)
    }
    const actionDeleteDialog = () => {
        let _paramDEL = {
            "wbID": dataDeleteDialog.wbID,
            "InputUser": 'KCVL',
            "CancelYN": 'Y'
        }

        // console.log ('actionDeleteDialog',_paramDEL)
        handleDeleteSave(_paramDEL)


        //
    }
    const actionCloseDeleteDialog = () => {
        setShowDeleteDialog(false)
        setDataDeleteDialog(DataEmpty)
    }
    const colDate = (rowData) => {
        const _wbDate = rowData.wbDate
        let year = _wbDate.substring(0, 4);
        let month = _wbDate.substring(4, 6);
        let day = _wbDate.substring(6, 8);
        const formattedDate = `${year}/${month}/${day}`;

        return <div>{formattedDate}</div>;
    }
    const colNumber = (data, decimal) => {
        const _data = data;

        if (_data === 0 || _data === "0" || _data === null) {
            return (<div className='text-center'>-</div>);
        } else {
            const numberData = parseFloat(_data).toFixed(decimal);

            return (<div className='text-center'>{numberData}</div>);
        }
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
    const dialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined severity="secondary" onClick={actionCloseDialog} />
            <Button label="Save" icon="pi pi-check" severity="primary" onClick={actionSaveDialog} />
        </React.Fragment>
    );
    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={actionCloseDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={actionDeleteDialog} />
        </React.Fragment>
    );
    const tableHeader = (
        <ColumnGroup>
            <Row>
                <Column header="BPW" field="BPW" sortable rowSpan={2}></Column>
                <Column header="Factory" field="Factory" sortable rowSpan={2}></Column>
                <Column header="Customer" field="Customer" sortable rowSpan={2}></Column>
                <Column header="Construction" field="Construction" sortable rowSpan={2}></Column>
                <Column header={YYMM} colSpan={31} className="text-center" />
            </Row>
            <Row>
                {_datelist.map((day, index) => (
                    <Column key={index + 100} header={day} />
                ))}
            </Row>
        </ColumnGroup>
    );
    const bodyNWB = (data) => {
        const _value = data

        if (isNaN(_value)) {
            return <div></div>;
        } else if (_value === 0 || _value === "") {
            return <div></div>;
        } else {
            return <div className="text-center">{_value.toFixed(0)}</div>;
        }
    }
    const bodyPQ = (data) => {
        const _value = data

        if (isNaN(_value)) {
            return <div></div>;
        } else if (_value === 0 || _value === "") {
            return <div></div>;
        } else {
            return <div className="text-center">{_value.toFixed(1)}</div>;
        }
    }
    const bodyWB = (NWB, PQ) => {

        const _NWB = NWB
        const _PQ = PQ
        let _WB = 0

        if (isNaN(_NWB) || _NWB === 0 || _NWB === "" || isNaN(_PQ) || _PQ === 0 || _PQ === "") {
            _WB = 0
            return <div></div>
        } else {
            _WB = _NWB / _PQ
            return <div className="text-center">{_WB.toFixed(2)}</div>;
        }

    }


    useEffect(() => {
        handleLoad();
    }, [])
    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />
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
                        <TabPanel header="Entry" >
                            {/* ################### UI FOR SEARCH FROM ################## */}
                            <div className="formgroup-inline col-12">
                                <div className="field">
                                    <label htmlFor="sBPW" className="p-sr-only">BPW</label>
                                    <AutoComplete id="sBPW" placeholder="BPW" value={sBPW} onChange={(e) => handleSelectChange(e, "BPW")} suggestions={itemsBPW} completeMethod={autoCompleteBPW} dropdown />
                                </div>
                                <div className="field">
                                    <label htmlFor="sFactory" className="p-sr-only">Factory</label>
                                    <AutoComplete id="sFactory" placeholder="Factory" value={sFactory} onChange={(e) => handleSelectChange(e, "Factory")} suggestions={itemsFactory} completeMethod={autoCompleteFactory} dropdown />
                                </div>
                                <div className="field">
                                    <label htmlFor="sCustomer" className="p-sr-only">Customer</label>
                                    <AutoComplete id="sCustomer" placeholder="Customer" value={sCustomer} onChange={(e) => handleSelectChange(e, "Customer")} suggestions={itemsCustomer} completeMethod={autoCompleteCustomer} dropdown />
                                </div>
                                <div className="field">
                                    <label htmlFor="sConstruction" className="p-sr-only">Construction</label>
                                    <AutoComplete id="sConstruction" placeholder="Construction" value={sConstruction} onChange={(e) => handleSelectChange(e, "Construction")} suggestions={itemsContruction} completeMethod={autoCompleteContruction} dropdown />
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
                                    <Column body={(rowData) => colNumber(rowData.ProdQty, 1)} header="Production Qty" field="ProdQty" style={{ width: '10%' }} ></Column>
                                    <Column body={(rowData) => colNumber(rowData.NoWireBreak, 0)} header="No. Wire-breakage" field="NoWireBreak" style={{ width: '10%' }}></Column>
                                    <Column body={(rowData) => colNumber(rowData.WireBreak, 2)} header="Wire-breakage" field="WireBreak" style={{ width: '10%' }}></Column>
                                    <Column body={actionRowButton} exportable={false} style={{ width: '10px' }}></Column>

                                </DataTable>
                            </div>
                        </TabPanel>
                        <TabPanel header="Daily" >
                            1. 단선율 (wire-breakage)(Tỷ lệ đứt dây)
                            <div className="col-12">
                                <DataTable
                                    loading={loading}
                                    ref={dt1}
                                    datakey="wbID"
                                    value={resultDTdaily}
                                    // selection={selectedRow}
                                    // onSelectionChange={(e) => setSelectedRow(e.value)}
                                    resizableColumns
                                    showGridlines
                                    stripedRows
                                    size={'small'}
                                    emptyMessage="No Data Found."
                                    className="datatable-responsive"
                                    tableStyle={{ minWidth: '50rem' }}
                                    headerColumnGroup={tableHeader}

                                >
                                    <Column header="BPW" field="BPW" sortable ></Column>
                                    <Column header="Factory" field="Factory" sortable ></Column>
                                    <Column header="Customer" field="Customer" sortable></Column>
                                    <Column header="Construction" field="Construction" sortable></Column>
                                    {_datelist.map((day, index) => (
                                        <Column key={index} header={day} field={`wb${day}`} body={(rowData) => bodyWB(rowData[`nwb${day}`], rowData[`pq${day}`])} style={{ width: '2.5%' }}></Column>
                                    ))}
                                </DataTable>
                            </div>
                            2. 생산량 (Production Qty)(Số lượng sản xuất)
                            <div className="col-12">
                                <DataTable
                                    loading={loading}
                                    ref={dt2}
                                    datakey="wbID"
                                    value={resultDTdaily}
                                    // selection={selectedRow}
                                    // onSelectionChange={(e) => setSelectedRow(e.value)}
                                    resizableColumns
                                    showGridlines
                                    stripedRows
                                    size={'small'}
                                    emptyMessage="No Data Found."
                                    className="datatable-responsive"
                                    tableStyle={{ minWidth: '50rem' }}
                                    headerColumnGroup={tableHeader}

                                >
                                    <Column header="BPW" field="BPW" sortable ></Column>
                                    <Column header="Factory" field="Factory" sortable ></Column>
                                    <Column header="Customer" field="Customer" sortable></Column>
                                    <Column header="Construction" field="Construction" sortable></Column>
                                    {_datelist.map((day, index) => (
                                        <Column key={index} header={day} field={`pq${day}`} body={(rowData) => bodyPQ(rowData[`pq${day}`])} style={{ width: '2.5%' }}></Column>
                                    ))}

                                    {/* {columnsNWB} */}
                                </DataTable>
                            </div>
                            3. 단선수 (No. wire-breakage)(Số lượng mối hàn)
                            <div className="col-12">
                                <DataTable
                                    loading={loading}
                                    ref={dt3}
                                    datakey="wbID"
                                    value={resultDTdaily}
                                    // selection={selectedRow}
                                    // onSelectionChange={(e) => setSelectedRow(e.value)}
                                    resizableColumns
                                    showGridlines
                                    stripedRows
                                    size={'small'}
                                    emptyMessage="No Data Found."
                                    className="datatable-responsive"
                                    tableStyle={{ minWidth: '50rem' }}
                                    headerColumnGroup={tableHeader}

                                >
                                    <Column header="BPW" field="BPW" sortable ></Column>
                                    <Column header="Factory" field="Factory" sortable ></Column>
                                    <Column header="Customer" field="Customer" sortable></Column>
                                    <Column header="Construction" field="Construction" sortable></Column>
                                    {_datelist.map((day, index) => (
                                        <Column key={index} header={day} field={`nwb${day}`} body={(rowData) => bodyNWB(rowData[`nwb${day}`])} style={{ width: '2.5%' }}></Column>
                                    ))}
                                </DataTable>
                            </div>
                        </TabPanel>


                    </TabView>
                    {/* ################# RECORD DIALOG ################# */}
                    <Dialog header="Record : Wire Break Rate & Production" visible={showDialog} onHide={actionCloseDialog} footer={dialogFooter} modal maximizable style={{ width: '55vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                        <div className="p-fluid">
                            <div className="field grid">
                                <label htmlFor="wbDate" className="col-12 mb-2 md:col-3 md:mb-0">Date : </label>
                                <div className="col-12 md:col-9">
                                    <InputMask id="wbDate" mask="9999/99/99" placeholder="yyyy/mm/dd" value={dataDialog.wbDate} required className={classNames({ 'p-invalid': !dataDialog.wbDate || dataDialog.wbDate.length < 8 })} onChange={(e) => handleInputChange(e, 'wbDate')} />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="BPW" className="col-12 mb-2 md:col-3 md:mb-0">BPW : </label>
                                <div className="col-12 md:col-9">
                                    <AutoComplete id="BPW" placeholder="BPW" value={dataDialog.BPW} required className={classNames({ 'p-invalid': !dataDialog.BPW })} onChange={(e) => handleInputChange(e, "BPW")} suggestions={itemsBPW} completeMethod={autoCompleteBPW} dropdown />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="Factory" className="col-12 mb-2 md:col-3 md:mb-0">Factory : </label>
                                <div className="col-12 md:col-9">
                                    <AutoComplete id="Factory" placeholder="Factory" value={dataDialog.Factory} required className={classNames({ 'p-invalid': !dataDialog.Factory })} onChange={(e) => handleInputChange(e, "Factory")} suggestions={itemsFactory} completeMethod={autoCompleteFactory} dropdown />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="Customer" className="col-12 mb-2 md:col-3 md:mb-0">Customer : </label>
                                <div className="col-12 md:col-9">
                                    <AutoComplete id="Customer" placeholder="Customer" value={dataDialog.Customer} required className={classNames({ 'p-invalid': !dataDialog.Customer })} onChange={(e) => handleInputChange(e, "Customer")} suggestions={itemsCustomer} completeMethod={autoCompleteCustomer} dropdown />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="Construction" className="col-12 mb-2 md:col-3 md:mb-0">Construction : </label>
                                <div className="col-12 md:col-9">
                                    <AutoComplete id="Construction" placeholder="Construction" value={dataDialog.Construction} required className={classNames({ 'p-invalid': !dataDialog.Construction })} onChange={(e) => handleInputChange(e, "Construction")} suggestions={itemsContruction} completeMethod={autoCompleteContruction} dropdown />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="ProdQty" className="col-12 mb-2 md:col-3 md:mb-0">Production Qty : </label>
                                <div className="col-12 md:col-9">
                                    <InputNumber id="ProdQty" value={dataDialog.ProdQty} onValueChange={(e) => handleNumberChange(e, 'ProdQty')} minFractionDigits={1} />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="NoWireBreak" className="col-12 mb-2 md:col-3 md:mb-0">No. Wire-breakage : </label>
                                <div className="col-12 md:col-9">
                                    <InputNumber id="NoWireBreak" value={dataDialog.NoWireBreak} onValueChange={(e) => handleNumberChange(e, 'NoWireBreak')} minFractionDigits={0} />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="WireBreak" className="col-12 mb-2 md:col-3 md:mb-0">Wire-breakage : </label>
                                <div className="col-12 md:col-9">
                                    <InputNumber id="WireBreak" value={dataDialog.WireBreak} onValueChange={(e) => handleNumberChange(e, 'WireBreak')} minFractionDigits={2} disabled />
                                </div>
                            </div>

                        </div>

                        {/**/}
                        {/* <div className="formgrid grid">
                    <div className="p-fluid">
                        <label htmlFor="name3" className="col-4">Name</label>
                        <div className="col-8">
                            <InputText id="name3" type="text" />
                        </div>
                    </div> */}
                        {/* <div className="field col-6">
                        <div className="flex flex-column">
                            <label htmlFor="wwtDate">Date*</label>
                            <InputMask id="wwtDate" mask="9999/99/99" placeholder="yyyy/mm/dd" value={dataDialog.wwtDate} required className={classNames({ 'p-invalid': !dataDialog.wwtDate || dataDialog.wwtDate.length < 8 })} onChange={(e) => handleInputChange(e, 'wwtDate')} />
                        </div>
                    </div> */}
                        {/* </div> */}
                    </Dialog>
                    {/* ################# SINGLE DELETE DIALOG ################# */}
                    <Dialog visible={showDeleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Delete Record" modal footer={deleteDialogFooter} onHide={actionCloseDeleteDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {dataDeleteDialog && <span>Are you sure to delete this information ? </span>}
                            <hr />
                            {dataDeleteDialog && <span>Date : <strong>{dateDelete}</strong></span>}<br />
                            {dataDelete && <span>BPW : <strong>{dataDelete.BPW}</strong></span>}<br />
                            {dataDelete && <span>Factory : <strong>{dataDelete.Factory}</strong></span>}<br />
                            {dataDelete && <span>Customer : <strong>{dataDelete.Customer}</strong></span>}<br />
                            {dataDelete && <span>Construction : <strong>{dataDelete.Construction}</strong></span>}<br />
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default withAuth(WireBreakPage);
