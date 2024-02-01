/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState, useRef, useEffect } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { InputText } from 'primereact/inputtext';
import { InputMask } from "primereact/inputmask";
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast';
import { Chart } from 'primereact/chart';

import { wirebreak_daily } from "../../../api/kcvl"


const WBGraf = ({ YYMM }) => {
    const toast = useRef(null);
    const [loading, setLoading] = useState(false)
    const [resultDT, setResultDT] = useState([]);
    const [resultDTfilter, setResultDTfilter] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    const dt1 = useRef(null);
    const dt2 = useRef(null);
    const dt3 = useRef(null);

    const [chartData, setChartData] = useState({});
    const [chartData1, setChartData1] = useState({});
    const [chartOptions1, setChartOptions1] = useState({});
    const [chartData2, setChartData2] = useState({});
    const [chartOptions2, setChartOptions2] = useState({});
    const [chartData3, setChartData3] = useState({});
    const [chartOptions3, setChartOptions3] = useState({});
    const [chartData4, setChartData4] = useState({});
    const [chartOptions4, setChartOptions4] = useState({});

    const [chartArray, setChartArray] = useState([])

    const columnsNWB = [];
    const columnsPQ = [];
    const columnsWB = [];
    const label1 = []

    const color1 = [
        '--blue-500',
        '--green-500',
        '--pink-500',
        '--cyan-500',
        '--indigo-500',
        '--purple-500',
        '--orange-500',
        '--red-500',
        '--bluegray-500',
        '--gray-500',
        '--teal-500',
        '--yellow-500',
        "--primary-500"
    ]

    const getRandomColor = (color) => {
        const randomIndex = Math.floor(Math.random() * color.length);
        return color[randomIndex];
    };

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

    const generateYYMMDDdata = (item, label) => {
        const _dataYYMMDD = {};

        label.forEach((day) => {
            const propertyName = `wb${day}`;
            _dataYYMMDD[day] = item[propertyName];
        });
        return _dataYYMMDD;
    }


    const handleGraf = (dataDT) => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        // console.log (YYMM)
        let labelYYMMDD = ''
        let lineCustomerContruction = ''

        const rowCustomer = []
        const rowConstruction = []
        const rowLine = []
        const dataLine = []

        if (YYMM && YYMM.length === 6) {
            labelYYMMDD = generateYYMMDDLabel(YYMM)
        }

        // console.log('labelYYMMDD', labelYYMMDD)


        dataDT.map((item, index) => {
            // console.log('item', item)
            // console.log('index', index)

            let _BPW = item.BPW
            let _Factory = item.Factory
            let _Customer = item.Customer
            let _Construction = item.Construction

            let _rowLine = {
                "Customer": _Customer,
                "Construction": _Construction
            }
            rowLine.push(_rowLine)

            let _dataYYMMDD = generateYYMMDDdata(item, labelYYMMDD)
            dataLine.push(_dataYYMMDD)

        });

        // console.log('labelYYMMDD', labelYYMMDD)
        // console.log('rowLine', rowLine)
        // console.log('dataLine', dataLine)
        // console.log('color', color1)

        const dataGraf1 = {
            labels: labelYYMMDD,
            datasets: rowLine.map((row, index) => ({
                label: row.Customer + '(' + row.Construction + ')',
                fill: false,
                borderColor: documentStyle.getPropertyValue(color1[index]),
                backgroundColor: documentStyle.getPropertyValue(color1[index]),
                tension: 0.4,
                data: labelYYMMDD.map((day) => dataLine[index][day]),
            })),
        }

        const options1 = {

            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
        setChartData1(dataGraf1);
        setChartOptions1(options1);


        handleMultiGraf(labelYYMMDD, rowLine, dataLine, color1)
    }

    const handleMultiGraf = (labelYYMMDD, rowLine, dataLine, color1) => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const chartDataArray = [];

        for (let i = 0; i < rowLine.length; i++) {
            const randomIndex = Math.floor(Math.random() * color1.length);

            const dataGraf = {
                labels: labelYYMMDD,
                datasets: [
                    {
                        label: rowLine[i].Customer + ' (' + rowLine[i].Construction + ')',
                        // fill: false,
                        borderColor: documentStyle.getPropertyValue(color1[i]),
                        backgroundColor: documentStyle.getPropertyValue(color1[i]),
                        // yAxisID: 'y',
                        tension: 0.4,
                        data: labelYYMMDD.map((day) => dataLine[i][day]),
                    },
                ],
            };
            chartDataArray.push(dataGraf);
        }

        setChartArray(chartDataArray)

        const options2 = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
        const options3 = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        const options4 = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
        setChartOptions2(options2)
        setChartOptions3(options3)
        setChartOptions4(options4)
    }

    const handleLoad = (isYYMM) => {
        // console.log('handleLoad', isYYMM)

        if (isYYMM !== null && typeof isYYMM === 'string') {
            // console.log ('tak kosong')
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
            handleGraf(_result.data)
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Warning', detail: error.message || 'An unexpected error occurred', life: 3000 });
            setResultDT([]);
            setResultDTfilter([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        handleLoad(YYMM)
    }, [YYMM]);




    return (
        <div className="grid mt-0">
            <Toast ref={toast} />
            {/* {isYYMM} {lengthOfString} */}
            <div className="col-12">
                {/* <div className="card">  </div> */}
                {/* <Chart type="line" data={chartData1} options={chartOptions1} /> */}
                {/* <Chart type="bar" data={chartData1} options={chartOptions4} /> */}

                <h6>단선율 (wire-breakage)(Tỷ lệ đứt dây)</h6>
                <div className="grid">
                    {chartArray.length > 0 ? (
                        chartArray.map((chartData, index) => (
                            <div className='col-4' key={index}>
                                <Chart type="bar" data={chartData} options={chartOptions3} />
                            </div>
                        ))
                    ) : (
                        <div> -- No Data Found. -- </div>
                    )}
                    {/* {chartArray.map((chartData, index) => (
                            <div className='col-4'>
                                <Chart key={index} type="line" data={chartData} options={chartOptions2} />
                            </div>
                        ))} */}

                    {/* {chartArray.map((chartData, index) => (
                        <div className='col-4'>
                            <Chart key={index} type="bar" data={chartData} options={chartOptions3} />
                        </div>
                    ))} */}
                </div>



            </div>
        </div>
    )

}

export default WBGraf;