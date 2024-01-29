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

import { wirebreak_daily, wirebreak_monthly } from "../../../api/kcvl"


const WireBreakMonthly = ({ YYMM }) => {
    const toast = useRef(null);
    const dt1 = useRef(null);
    const dt2 = useRef(null);
    const dt3 = useRef(null);

    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    const [isYY, setIsYY] = useState(null)

    const [resultDT, setResultDT] = useState([])
    const [resultDTfilter, setResultDTfilter] = useState([])

    const columnsNWB = [];
    const columnsPQ = [];
    const columnsWB = [];

    const filterData = (YYdata, YYMMdata) => {
        // Filter data based on conditions
        const filteredData = YYdata.filter((YYitem) =>
            YYMMdata.some(
                (YYMMItem) =>
                    YYMMItem.BPW === YYitem.BPW &&
                    YYMMItem.Factory === YYitem.Factory &&
                    YYMMItem.Customer === YYitem.Customer &&
                    YYMMItem.Construction === YYitem.Construction
            )
        );

        return filteredData;
    };

    function generateYearMonthList(year) {
        const months = [];
        for (let i = 1; i <= 12; i++) {
            const monthString = `${i.toString().padStart(2, '0')}`;
            months.push(monthString);
        }
        return months;
    }

    const createNWB = (monthList) => {
        monthList.map((MM)=>{
            const columnName = `nwb${MM}`;
            const columnHeader = MM.toString();
            
            columnsNWB.push(
                <Column key={columnName} header={columnHeader} field={columnName} body={(rowData) => bodyNWB(rowData[columnName])} style={{ width: '6%' }}></Column>
            );
        })
    }
    const createPQ = (monthList) => {
        monthList.map((MM)=>{
            const columnName = `pq${MM}`;
            const columnHeader = MM.toString();

            columnsPQ.push(
                <Column key={columnName} header={columnHeader} field={columnName} body={(rowData) => bodyPQ(rowData[columnName])} style={{ width: '6%' }}></Column>
            );
        })
    }
    const createWB = (monthList) => {
        monthList.map((MM)=>{
            const columnName = `wb${MM}`;
            const columnName1 = `nwb${MM}`;
            const columnName2 = `pq${MM}`;
            const columnHeader = MM.toString();

            columnsWB.push(
                <Column key={columnName} header={columnHeader} field={columnName} body={(rowData) => bodyWB(rowData[columnName1],rowData[columnName2])} style={{ width: '6%' }}></Column>
            );
        })
    }

    const _dataYY = YYMM.slice(0, 4)
    const _dateYY = parseInt(_dataYY)

    const monthList = generateYearMonthList(_dateYY)
    createNWB(monthList)
    createPQ(monthList)
    createWB(monthList)


    const handleLoad = () => {
        const _currentYYMM = YYMM
        if (_currentYYMM.length===6){
            handleFetchData(_currentYYMM)
        }
        
    }

    const handleFetchData = async (YYMM) => {

        const _currentYY = YYMM.slice(0, 4);
        setIsYY(_currentYY)
        const _paramsYYMM = {
            "YYMM": YYMM
        }
        const _paramsYY = {
            "YY": _currentYY
        }

        try {
            setLoading(true)
            const _resultYYMM = await wirebreak_daily(_paramsYYMM)
            const _result = await wirebreak_monthly(_paramsYY)
           

            setResultDT(_result.data)
            // console.log ('_result', _result.data.length)
            // console.log ('_resultYYMM', _resultYYMM.data.length)

            if (_resultYYMM.data.length > 0) {              
                const tblALL_filter = filterData(_result.data, _resultYYMM.data)
                setResultDTfilter(tblALL_filter)
            } else {               
                setResultDTfilter(_result.data)
            }

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
                <Column header={isYY} colSpan={12} className="text-center" />
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
export default WireBreakMonthly;
