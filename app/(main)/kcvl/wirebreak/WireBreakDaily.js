/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState, useRef, useEffect } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { InputMask } from "primereact/inputmask";
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast';

import { wirebreak_daily } from "../../../api/kcvl"

const WireBreakDaily = ({ YYMM }) => {
    const toast = useRef(null);
    const dt = useRef(null);
    const dt1 = useRef(null);
    const dt2 = useRef(null);
    const dt3 = useRef(null);

    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);

    const [resultDT, setResultDT] = useState([])
    const [resultDTfilter, setResultDTfilter] = useState([])

    const columnsNWB = [];
    const columnsPQ = [];
    const columnsWB = [];
    

    function generateYearMonthDayList(year) {
        const days = [];
        for (let i = 1; i <= 31; i++) {
            const dayString = `${i.toString().padStart(2, '0')}`;
            days.push(dayString);
        }
        return days;
    }
    const createNWB = (dayList) => {
        dayList.map((DD)=>{
            const columnName = `nwb${DD}`;
            const columnHeader = DD.toString();
            
            columnsNWB.push(
                <Column key={columnName} header={columnHeader} field={columnName} body={(rowData) => bodyNWB(rowData[columnName])} style={{ width: '2.5%' }}></Column>
            );
        })
    }
    const createPQ = (dayList) => {
        dayList.map((DD)=>{
            const columnName = `pq${DD}`;
            const columnHeader = DD.toString();

            columnsPQ.push(
                <Column key={columnName} header={columnHeader} field={columnName} body={(rowData) => bodyPQ(rowData[columnName])} style={{ width: '2.5%' }}></Column>
            );
        })
    }
    const createWB = (dayList) => {
        dayList.map((DD)=>{
            const columnName = `wb${DD}`;
            const columnName1 = `nwb${DD}`;
            const columnName2 = `pq${DD}`;
            const columnHeader = DD.toString();

            columnsWB.push(
                <Column key={columnName} header={columnHeader} field={columnName} body={(rowData) => bodyWB(rowData[columnName1],rowData[columnName2])} style={{ width: '2.5%' }}></Column>
            );
        })
    }

    const _dataYY = YYMM.slice(0, 4)
    const _dateYY = parseInt(_dataYY)

    const dayList = generateYearMonthDayList(_dateYY)
    createNWB(dayList)
    createPQ(dayList)
    createWB(dayList)


    const handleLoad = () => {
        const _currentYYMM = YYMM
        const _currentYY = _currentYYMM.slice(0, 4);
        if (_currentYYMM.length === 6) {
            handleFetchData(_currentYYMM)
        }

    }
    const handleFetchData = async (YYMM) => {
        const _params = {
            "YYMM": YYMM
        }

        try {
            setLoading(true)
            const _result = await wirebreak_daily(_params)
            // console.log('handleFetchData > _result', _result.data)
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

                <Column header="01"></Column>
                <Column header="02"></Column>
                <Column header="03"></Column>
                <Column header="04"></Column>
                <Column header="05"></Column>
                <Column header="06"></Column>
                <Column header="07"></Column>
                <Column header="08"></Column>
                <Column header="09"></Column>
                <Column header="10"></Column>
                <Column header="11"></Column>
                <Column header="12"></Column>
                <Column header="13"></Column>
                <Column header="14"></Column>
                <Column header="15"></Column>
                <Column header="16"></Column>
                <Column header="17"></Column>
                <Column header="18"></Column>
                <Column header="19"></Column>
                <Column header="20"></Column>
                <Column header="21"></Column>
                <Column header="22"></Column>
                <Column header="23"></Column>
                <Column header="24"></Column>
                <Column header="25"></Column>
                <Column header="26"></Column>
                <Column header="27"></Column>
                <Column header="28"></Column>
                <Column header="29"></Column>
                <Column header="30"></Column>
                <Column header="31"></Column>


            </Row>


        </ColumnGroup>
    );

    useEffect(() => {
        handleLoad();
    }, [YYMM])

    return (
        <div className="grid mt-0">
            <Toast ref={toast} />
            {/* Date : {YYMM} */}
            {/* ################### UI FOR DATA TABLE No. wire-breakage ################## */}
            1. 단선율 (wire-breakage)(Tỷ lệ đứt dây)
            <div className="col-12">
                <DataTable
                    loading={loading}
                    ref={dt1}
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
                    tableStyle={{ minWidth: '50rem' }}
                    headerColumnGroup={tableHeader}

                >
                    <Column header="BPW" field="BPW" sortable ></Column>
                    <Column header="Factory" field="Factory" sortable ></Column>
                    <Column header="Customer" field="Customer" sortable></Column>
                    <Column header="Construction" field="Construction" sortable></Column>
                    {columnsWB}

                    {/* {columnsNWB} */}
                </DataTable>
            </div>
            {/* ################### UI FOR DATA TABLE Production Qty ################## */}
            2. 생산량 (Production Qty)(Số lượng sản xuất)
            <div className="col-12">
                <DataTable
                    loading={loading}
                    ref={dt2}
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
                    tableStyle={{ minWidth: '50rem' }}
                    headerColumnGroup={tableHeader}

                >
                    <Column header="BPW" field="BPW" sortable ></Column>
                    <Column header="Factory" field="Factory" sortable ></Column>
                    <Column header="Customer" field="Customer" sortable></Column>
                    <Column header="Construction" field="Construction" sortable></Column>
                    {columnsPQ}

                    {/* {columnsNWB} */}
                </DataTable>
            </div>
            {/* ################### UI FOR DATA TABLE No. wire-breakage ################## */}
            3. 단선수 (No. wire-breakage)(Số lượng mối hàn)
            <div className="col-12">
                <DataTable
                    loading={loading}
                    ref={dt3}
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
                    tableStyle={{ minWidth: '50rem' }}
                    headerColumnGroup={tableHeader}

                >
                    <Column header="BPW" field="BPW" sortable ></Column>
                    <Column header="Factory" field="Factory" sortable ></Column>
                    <Column header="Customer" field="Customer" sortable></Column>
                    <Column header="Construction" field="Construction" sortable></Column>
                    {columnsNWB}
                </DataTable>
            </div>
        </div>
    )
}
export default WireBreakDaily;
