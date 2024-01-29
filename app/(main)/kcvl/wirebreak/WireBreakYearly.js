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

import { wirebreak_daily, wirebreak_yearly } from "../../../api/kcvl"

const WireBreakYearly = ({ YYMM }) => {
    const toast = useRef(null);
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

    const createNWB = (start, end) => {
        for (let year = start; year <= end; year++) {
            const columnName = `nwb${year}`;
            const columnHeader = year.toString();

            columnsNWB.push(
                <Column key={columnName} header={columnHeader} field={columnName} body={(rowData) => bodyNWB(rowData[columnName])} style={{ width: '12.5%' }}></Column>
            );
        }
    }
    const createPQ = (start, end) => {
        for (let year = start; year <= end; year++) {
            const columnName = `pq${year}`;
            const columnHeader = year.toString();

            columnsPQ.push(
                <Column key={columnName} header={columnHeader} field={columnName} body={(rowData) => bodyPQ(rowData[columnName])} style={{ width: '12.5%' }}></Column>
            );
        }
    }
    const createWB = (start, end) => {
        for (let year = start; year <= end; year++) {
            const columnName = `wb${year}`;
            const columnName1 = `nwb${year}`;
            const columnName2 = `pq${year}`;
            const columnHeader = year.toString();

            columnsWB.push(
                <Column key={columnName} header={columnHeader} field={columnName} body={(rowData) => bodyWB(rowData[columnName1],rowData[columnName2])} style={{ width: '12.5%' }}></Column>
            );
        }
    }

    const _dataYY = YYMM.slice(0, 4)
    const _dateYY = parseInt(_dataYY)

    const _dateStart = _dateYY - 3
    const _dateEnd = _dateYY

    createNWB(_dateStart, _dateEnd)
    createPQ(_dateStart, _dateEnd)
    createWB(_dateStart, _dateEnd)

    const handleLoad = () => {
        const _currentYYMM = YYMM

        if (_currentYYMM.length === 6) {
            handleFetchData(_currentYYMM)
        }

    }

    const handleFetchData = async (YYMM) => {
        console.log('handleFetchData', YYMM)
        const _currentYY = YYMM.slice(0, 4)
        const _year = parseInt(_currentYY, 10)

        const yearStart = _year - 3
        const yearEnd = _year

        const _paramsYYMM = {
            "YYMM": YYMM
        }
        const _paramsYY = {
            "yearStart": yearStart,
            "yearEnd": yearEnd
        }

        try {
            setLoading(true)
            const _resultYYMM = await wirebreak_daily(_paramsYYMM)
            const _result = await wirebreak_yearly(_paramsYY)
            setResultDT(_result.data)

            console.log(_result.data)

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
                    // headerColumnGroup={tableHeader}
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
                    // headerColumnGroup={tableHeader}
                    >
                        <Column header="BPW" field="BPW" sortable ></Column>
                        <Column header="Factory" field="Factory" sortable ></Column>
                        <Column header="Customer" field="Customer" sortable></Column>
                        <Column header="Construction" field="Construction" sortable></Column>
                        {columnsPQ}
                    </DataTable>

                </div>
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
                // headerColumnGroup={tableHeader}
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
export default WireBreakYearly;
