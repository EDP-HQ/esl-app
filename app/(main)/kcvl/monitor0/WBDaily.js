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
import { InputText } from 'primereact/inputtext';
import { InputMask } from "primereact/inputmask";
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast';
import { Chart } from 'primereact/chart';

import { wirebreak_daily } from "../../../api/kcvl"

const WBDaily = ({ YYMM }) => {
    const toast = useRef(null);
    const [loading, setLoading] = useState(false)
    const [resultDT, setResultDT] = useState([]);
    const [resultDTfilter, setResultDTfilter] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    const dt1 = useRef(null);
    const dt2 = useRef(null);
    const dt3 = useRef(null);

    const columnsNWB = [];
    const columnsPQ = [];
    const columnsWB = [];

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

    const _datelist = generateYYMMDDLabel(YYMM)


    const handleLoad = (isYYMM) => {
        // console.log('handleLoad', isYYMM)

        if (isYYMM !== null && typeof isYYMM === 'string') {
            let lengthOfString = isYYMM.length;
            if (lengthOfString === 6) {
                fetchData(isYYMM)
            } else {
                // console.log ('nothing')
            }
        } else {
            // console.log ('nothing')
        }
    }

    const fetchData = async (isYYMM) => {
        try {
            setLoading(true);
            const _params = {
                "YYMM": isYYMM
            };

            const _result = await wirebreak_daily(_params);
            // console.log('handleFetchData > _result', _result.data)

            setResultDT(_result.data);
            setResultDTfilter(_result.data);

        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Warning', detail: error.message || 'An unexpected error occurred', life: 3000 });
            setResultDT([]);
            setResultDTfilter([]);
        } finally {
            setLoading(false);
        }
    };

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
                {_datelist.map((day, index) => (
                    <Column key={index + 100} header={day} />
                ))}
            </Row>
        </ColumnGroup>
    );

    useEffect(() => {
        handleLoad(YYMM)
    }, [YYMM]);

    return (
        <div className="grid mt-0">
            <Toast ref={toast} />
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
                    {_datelist.map((day, index) => (
                        <Column key={index} header={day} field={`nwb${day}`} body={(rowData) => bodyNWB(rowData[`nwb${day}`])} style={{ width: '2.5%' }}></Column>
                    ))}
                </DataTable>
            </div>
        </div>

    )
}

export default WBDaily;