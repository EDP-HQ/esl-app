
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { ToggleButton } from 'primereact/togglebutton';

import { pdfUpload, qcfiles_search, qcfiles_insert, qcfiles_cancelYN, qcfiles_delete } from '../../../api/kcvl'

const DataEmpty = [
    {
        "fileID": 'X',
        "GroupId": null,
        "fileGroup": null, // CT - Cord Type , TWBN, FD, LLE
        "fileYYMM": null,
        "fileYYMMDD": null,
        "fileName": null,
        "fileUploadName": null,
        "fileInfo": null,
        "InputDate": null,
        "InputUser": null,
        "UpdateDate": null,
        "UpdateUser": null,
        "CancelYN": "N"
    }
]

const FDPage = () => {
    const toast = useRef(null);
    const dt = useRef(null);
    const [loading, setLoading] = useState(false)
    const [resultDT, setResultDT] = useState([])
    const [selectedRow, setSelectedRow] = useState()
    const [YYMM, setYYMM] = useState(null);
    const [YYMMDD, setYYMMDD] = useState(null);
    const [error, setError] = useState(false)
    const [file, setFile] = useState(null);
    const [showUploadDialog, setShowUploadDialog] = useState(false)
    const [dataDialog, setDataDialog] = useState(DataEmpty)
    const [submitted, setSubmitted] = useState(false)
    const [value, setValue] = useState(null);
    const [checked, setChecked] = useState(false);
    const [fGroup, setFGroup] = useState('FD'); // CT, TWBN, FD - FD Tools, LLE

    const [dataDeleteDialog, setDataDeleteDialog] = useState(DataEmpty)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [dateDelete, setDateDelete] = useState()
    const [fileDelete, setFileDelete] = useState()


    function getValueOrDefault(data, key, defaultValue) {
        return data['0']?.[key] || data[key] || defaultValue;
    }

    const handleLoad = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const currentDay = currentDate.getDate().toString().padStart(2, '0');

        // const adjustMonth = '11'
        const formattedYYMM = `${currentYear}${currentMonth}`;
        const formattedYYMMDD = `${currentYear}${currentMonth}${currentDay}`;
        setYYMM(formattedYYMM)
        setYYMMDD(formattedYYMMDD)

        // loading 1st data
        handleFetchData(formattedYYMM)
    }

    const handleFetchData = async (todate) => {
        setLoading(true)
        try {
            if (todate && todate.length === 6) {
                //  console.log ('1- handleFetchData' , todate)
                const _paramsDT = {
                    "ToDate": todate,
                    "fileGroup": fGroup,
                    "CancelYN": ''
                }
                const _result = await qcfiles_search(_paramsDT)


                if (_result.status === 200) {
                    setResultDT(_result.data)
                }
            } else {
                // setResultDT([])
            }
        } catch (error) {
            console.error('handleFetchData ', error);
            toast.current.show({ severity: 'error', summary: 'Warning', detail: { error }, life: 3000 });
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        // console.log('handleKeyPress', e);
        if (e.key === 'Enter') {
            // actionSearch()
        }
    }

    const handleInputChange = (e, name) => {
        const val = (e.target && e.target.value.trim()) || ''
        let _dataDialogTemp = { ...dataDialog }
        _dataDialogTemp[`${name}`] = val
        setDataDialog(_dataDialogTemp)
    }

    const handleFileUploadChange = (e) => {
        let _dataDialogTemp = { ...dataDialog }

        // console.log ('_dataDialogTemp : load', _dataDialogTemp)

        const _fileName = e.name
        const _fileInfo = JSON.stringify({
            "file": e.name,
            "size": e.size,
            "lastModified": e.lastModified,
            "lastModifiedDate": e.lastModifiedDate

        })
        // console.log(_fileName)
        // console.log(_fileInfo)

        _dataDialogTemp[`fileName`] = _fileName
        _dataDialogTemp[`fileInfo`] = _fileInfo

        // console.log ('_dataDialogTemp : update', _dataDialogTemp)

        setDataDialog(_dataDialogTemp)
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        handleFileUploadChange(selectedFile)

        // Clear the input field on change
        if (error) {
            setError(null);
        }
    };

    const handleCancelYN = async (fileID, fileName, CancelYN) => {

        try {
            const _paramYN = {
                "fileID": fileID,
                "CancelYN": CancelYN,
                "InputUser": 'KCVL'
            }

            // console.log ('params', _paramYN)

            const _result = await qcfiles_cancelYN(_paramYN)
            // console.log('result', _result)
            if (_result.status === 200) {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'File ' + fileName + ' Updated', life: 1000 });
                actionSearch()
            } else {

            }
        } catch (error) {
            console.error('handleCancelYN ', error);
            toast.current.show({ severity: 'error', summary: 'Warning', detail: { error }, life: 3000 });
        } finally {

        }
    }

    const handleAllYN = async (CancelYN) => {

        const _row = selectedRow

        _row.map(item => {

            handleCancelYN(item.fileID, item.fileName, CancelYN)

        })
        // console.log('selected',selectedRow)

    }

    const handleDeleteSave = async () => {
        // console.log('handleDeleteSave', dataDeleteDialog)
        const _fileID = dataDeleteDialog.fileID
        const _fileUploadName = dataDeleteDialog.fileUploadName
        const fileName = dataDeleteDialog.fileUploadName
        try {
            const _paramDELETE = {
                "fileID": _fileID,
                "fileUploadName": _fileUploadName
            }

            // console.log( 'params', _paramDELETE)
            const _result = await qcfiles_delete(_paramDELETE)
            // console.log('result', _result)
            if (_result.status === 200) {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'File ' + fileName + ' Updated', life: 1000 });
                actionSearch()
            } else {

            }
            setShowDeleteDialog(false)
            setDataDeleteDialog(DataEmpty)

        } catch (error) {
            console.error('handleDeleteSave ', error);
            toast.current.show({ severity: 'error', summary: 'Warning', detail: { error }, life: 3000 });
        } finally {

        }
    }

    const actionUpload = () => {

        DataEmpty.fileID = 'X'
        DataEmpty.GroupId = 'KCVL'
        DataEmpty.fileGroup = fGroup
        DataEmpty.fileYYMM = YYMM
        DataEmpty.fileYYMMDD = YYMMDD
        setDataDialog(DataEmpty)
        setSubmitted(false)
        setShowUploadDialog(true)
    }

    // const actionHandleUpload = async () => {
    //     try {

    //         if (!file) {
    //             throw new Error('No file selected');
    //         }

    //         const result = await pdfUpload(file);

    //         if (result.success) {
    //             console.log(result.message); // { success: true, message: 'File uploaded successfully' }
    //             // Handle success or failure based on result
    //             actionClearUpload()
    //             toast.current.show({ severity: 'success', summary: 'Successful', detail: 'File uploaded successfully', life: 3000 });
    //         } else {
    //             actionClearUpload()
    //             console.error(result.message);
    //             toast.current.show({ severity: 'error', summary: 'Warning', detail: error.message, life: 3000 });
    //         }

    //     } catch (error) {
    //         console.error('Error:', error.message);
    //         actionClearUpload()
    //         toast.current.show({ severity: 'error', summary: 'Warning', detail: error.message, life: 3000 });
    //     }
    // };

    const actionClearUpload = () => {
        // Clear the input field
        const fileInput = document.getElementById('filename');
        if (fileInput) {
            fileInput.value = '';
        }

        // Clear the file state in your React component if needed
        setFile(null);
    }

    const actionSaveUploadDialog = async () => {
        setSubmitted(true);

        let _fileYYMM = getValueOrDefault(dataDialog, 'fileYYMM', '')
        let _fileYYMMDD = getValueOrDefault(dataDialog, 'fileYYMMDD', '')

        if (_fileYYMM != '' && _fileYYMMDD != '') {
            // check file pdf first
            if (!file) {
                toast.current.show({ severity: 'error', summary: 'Warning', detail: 'Please select file to upload', life: 3000 });
                return
            }

            try {
                // console.log('actionSaveUploadDialog', file)
                const result = await pdfUpload(file);

                if (result.success) {
                    // console.log(result.message.data.uploadfile)
                    const _fileUploadName = result.message.data.uploadfile
                    // handleFileUploadSuccess(result.message.data.uploadfile)
                    const _paramsSave = {
                        "GroupId": dataDialog.GroupId,
                        "fileGroup": dataDialog.fileGroup,
                        "fileYYMM": dataDialog.fileYYMM,
                        "fileYYMMDD": dataDialog.fileYYMMDD,
                        "fileName": dataDialog.fileName,
                        "fileUploadName": _fileUploadName,
                        "fileInfo": dataDialog.fileInfo,
                        "InputUser": "KCVL"
                    }
                    // console.log('_paramsSave', _paramsSave)
                    const resultSave = await qcfiles_insert(_paramsSave);
                    // console.log('resultSave', resultSave)
                    if (resultSave.status === 200) {
                        actionClearUpload()
                        setShowUploadDialog(false);
                        setDataDialog(DataEmpty)
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'File uploaded successfully', life: 3000 });
                    } else {
                        actionClearUpload()
                        setShowUploadDialog(false);
                        setDataDialog(DataEmpty)
                        toast.current.show({ severity: 'error', summary: 'Warning', detail: 'Upload file errors. Please try again', life: 3000 });
                    }
                } else {
                    actionClearUpload()
                    setShowUploadDialog(false);
                    setDataDialog(DataEmpty)
                    toast.current.show({ severity: 'error', summary: 'Warning', detail: 'Upload file errors. Please try again', life: 3000 });
                    return
                }

            } catch (error) {
                actionClearUpload()
                setShowUploadDialog(false);
                setDataDialog(DataEmpty)
                console.error('Error:', error.message);
                toast.current.show({ severity: 'error', summary: 'Warning', detail: error.message, life: 3000 });
            }

        } else {
            if (!_fileYYMM && !_fileYYMMDD) {
                toast.current.show({ severity: 'error', summary: 'Warning', detail: 'Date & Month Empty', life: 3000 });
                return
            }
        }
        actionSearch()
    }

    const actionDeleteDialog = () => {

        handleDeleteSave()
    }

    const actionCloseUploadDialog = () => {
        actionClearUpload()
        setShowUploadDialog(false);
        setDataDialog(DataEmpty)
    }

    const actionSearch = () => {
        let myDate = YYMM.replace('/', '');
        setYYMM(myDate)
        handleFetchData(myDate)
    }
    const actionCloseDeleteDialog = () => {
        setShowDeleteDialog(false)
        setDataDeleteDialog(DataEmpty)
    }



    const actionRowButton = (rowData) => {
        return (
            <React.Fragment>
                {/* <Button text icon="pi pi-pencil" severity="primary" onClick={() => actionEdit(rowData)} /> */}
                <Button text icon="pi pi-trash" severity="danger" onClick={() => actionDelete(rowData)} />
            </React.Fragment>
        );
    };

    const actionDelete = (rowData) => {
        const _tempDate = rowData.fileYYMMDD
        const _fileName = rowData.fileName
        const _formatDate = _tempDate.substring(6, 8) + '/' + _tempDate.substring(4, 6) + '/' + _tempDate.substring(0, 4)
        setFileDelete(_fileName)
        setDateDelete(_formatDate)

        setDataDeleteDialog(rowData)
        setShowDeleteDialog(true)
    }

    const colDate = (isDate) => {
        const _isDate = isDate
        const dateObject = new Date(_isDate)

        // // const temp= "2024-01-15T08:53:40.697Z"
        const [string1, string2] = _isDate.split("T");

        const [year, month, day] = string1.split("-");
        const stringFormat = `${year}/${month}/${day}`;

        const _string2 = string2.substring(0, 8)

        // const _date2 = _date1.

        // const formattedDate = `${year}/${month}/${day} ${hours}:${minutes} ${ampm}`;
        return (<div className="text-center">{stringFormat}<br />{_string2}</div>)
    }

    const colFileName = (rowData) => {
        const _fileName = rowData.fileName
        const _fileInfo = rowData.fileInfo
        const _fileUploadName = rowData.fileUploadName
        const myArrayObject = JSON.parse(_fileInfo);
        const filesize = myArrayObject.size;
        const lastModified = myArrayObject.lastModifiedDate;

        const fileSizeMB = filesize / (1024 * 1024);

        const lastModifiedDate = new Date(lastModified);
        // Get the components (year, month, day)
        const year = lastModifiedDate.getFullYear();
        const month = (lastModifiedDate.getMonth() + 1).toString().padStart(2, '0');
        const day = lastModifiedDate.getDate().toString().padStart(2, '0');

        // Create the date string in the format yyyy/mm/dd
        const formattedDate = `${year}/${month}/${day}`;


        return (<div><strong>{_fileName}</strong>{'     '}<a href={'/upload/' + _fileUploadName} target='_blank' title='Preview'><i className="pi pi-file-pdf"></i></a><br /><small>Size: {fileSizeMB.toFixed(5)} MB / File Date: {formattedDate}</small></div>)
    }

    const colPreview = (rowData) => {
        const _fileUploadName = rowData.fileUploadName

        return (
            <div className='text-center content-center'>
                <a href={'/upload/' + _fileUploadName} target='_blank'><i className="pi pi-file-pdf"></i></a>
            </div>
        )
    }

    const colIsYesNo = (rowData) => {
        const _fileID = rowData.fileID
        const _fileName = rowData.fileName
        const _CancelYN = rowData.CancelYN

        if (_CancelYN === 'N') {
            // setChecked(true)
            return (
                <div className='text-center content-center'>
                    <Button icon="pi pi-eye" size="medium" severity="info" title='Yes' onClick={() => handleCancelYN(_fileID, _fileName, 'Y')} />
                </div>
            )
        } else {
            return (
                <div className='text-center content-center'>
                    <Button text icon="pi pi-eye-slash" severity="secondary" title='No' onClick={() => handleCancelYN(_fileID, _fileName, 'N')} />
                </div>
            )
        }
    }

    const dialogUploadFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined severity="secondary" onClick={actionCloseUploadDialog} />
            <Button label="Upload" icon="pi pi-check" severity="primary" onClick={actionSaveUploadDialog} />
            {/* <Button label="Upload" onClick={actionHandleUpload} /> */}
            {/* <Button label="Clear" onClick={actionClearUpload} />  */}
        </React.Fragment>
    );

    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={actionCloseDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={actionDeleteDialog} />
        </React.Fragment>
    );



    useEffect(() => {
        handleLoad();
    }, [])

    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />
                <div className="card">
                    <h5>FD Tools</h5>

                    <div className="grid">
                        <div className='col-12 md:col-6 xl:col-6  justify-content-left'>Month {'   '}
                            <InputMask value={YYMM} onChange={(e) => { setYYMM(e.target.value); }} mask="9999/99" placeholder="Year/Month" onKeyUp={handleKeyPress} />
                            <Button label="Search" icon="pi pi-search" outlined onClick={actionSearch} className='mr-2' />
                        </div>
                        <div className='col-12 md:col-6 xl:col-6  text-right'>
                            <Button label="Upload Files" icon="pi pi-upload" severity="primary" onClick={actionUpload} className="mr-1"></Button>
                            <Button label="Show" icon="pi pi-eye" severity="info" outlined disabled={!selectedRow || !selectedRow.length} onClick={() => handleAllYN('N')} />
                            <Button label="Unshow" icon="pi pi-eye-slash" severity="secondary" outlined disabled={!selectedRow || !selectedRow.length} onClick={() => handleAllYN('Y')} />

                        </div>
                    </div>

                    {/* ################### UI FOR DATA TABLE ################## */}
                    <div className="mt-2">
                        <DataTable
                            loading={loading}
                            ref={dt}
                            dataKey="fileID"
                            value={resultDT}
                            // headerColumnGroup={tableHeaderAPI}
                            // footerColumnGroup={tableFooter}
                            selection={selectedRow}
                            onSelectionChange={(e) => setSelectedRow(e.value)}
                            resizableColumns
                            showGridlines
                            stripedRows
                            size={'small'}
                            emptyMessage="No upload file found."
                            className="datatable-responsive"
                            tableStyle={{ minWidth: '50rem' }}
                            paginator rows={15} rowsPerPageOptions={[15, 30, 60, 90]}
                        >
                            {/* <Column header="ID" field="fileID" sortable></Column> */}
                            <Column selectionMode="multiple" exportable={false} style={{ width: '10px' }}></Column>
                            <Column body={(rowData) => colDate(rowData.InputDate)} sortable header="Upload Date" field="InputDate" style={{ width: '8%' }}></Column>
                            {/* <Column body={colPreview} header="Preview" field="fileUploadName" style={{ width: '7%' }}></Column> */}
                            {/* <Column header="YYMM" field="fileYYMM" style={{ width: '10%' }}></Column> */}
                            <Column body={colFileName} header="File Information" sortable field="fileName"></Column>
                            <Column body={colIsYesNo} header="Show" field="CancelYN" sortable style={{ width: '7%' }}></Column>
                            <Column body={actionRowButton} exportable={false} style={{ width: '7%' }}></Column>

                        </DataTable>
                    </div>

                    {/* ################### UI FOR UPLOAD DIALOG  ################## */}
                    <Dialog header="Upload Files" visible={showUploadDialog} onHide={actionCloseUploadDialog} footer={dialogUploadFooter} modal maximizable style={{ width: '60vw' }} breakpoints={{ '960px': '60vw', '641px': '100vw' }}>
                        <div className="formgrid grid">
                            <div className="field col-6">
                                <div className="flex flex-column">
                                    <label htmlFor="mlbDate">Date : </label>
                                    <InputMask id="fileYYMM" mask="9999/99/99" placeholder="yyyy/mm/dd" value={dataDialog.fileYYMMDD} required className={classNames({ 'p-invalid': !dataDialog.fileYYMMDD || dataDialog.fileYYMMDD.length < 8 })} onChange={(e) => handleInputChange(e, 'fileYYMMDD')} />
                                </div>
                            </div>
                            <div className="field col-6">
                                <div className="flex flex-column">
                                    <label htmlFor="mlbDate">Month : </label>
                                    <InputMask id="fileYYMM" mask="9999/99" placeholder="yyyy/mm" value={dataDialog.fileYYMM} required className={classNames({ 'p-invalid': !dataDialog.fileYYMM || dataDialog.fileYYMM.length < 6 })} onChange={(e) => handleInputChange(e, 'fileYYMM')} />
                                </div>
                            </div>
                            <div className="field col-12">
                                <div className="flex flex-column">
                                    <label htmlFor="mlbDate">File : </label>
                                    {/* <InputMask id="fileYYMM" mask="9999/99" placeholder="yyyy/mm" value={dataDialog.fileYYMM} required className={classNames({ 'p-invalid': !dataDialog.fileYYMM || dataDialog.fileYYMM.length < 6 })} onChange={(e) => handleInputChange(e, 'fileYYMM')} /> */}
                                    <input id="filename" name="filename" type="file" accept="application/pdf" onChange={handleFileChange} className="p-inputtext p-component" />
                                </div>
                            </div>
                        </div>
                    </Dialog>
                    {/* ################# SINGLE DELETE DIALOG ################# */}
                    <Dialog visible={showDeleteDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDialogFooter} onHide={actionCloseDeleteDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />

                            {dataDeleteDialog && <span>File: <strong>{fileDelete}</strong> (<strong>{dateDelete}</strong>)<br /><br />Are you sure you want to delete file permanently ? </span>}
                        </div>
                    </Dialog>



                </div>
            </div>
        </div>
    );
};

export default FDPage;
