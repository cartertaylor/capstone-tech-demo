import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import "../../css/main.css";
import { Container, Button, Row, Col } from "react-bootstrap";
import TableMaker from "../../components/TableMaker";

export default function CsvPage() {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length) {
            console.log(acceptedFiles);
            parseFile(acceptedFiles[0]);
        }
    }, []);

    const [parsedCsvData, setParsedCsvData] = useState([null]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: "text/csv",
    });

    

    const parseFile = (file) => {
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setParsedCsvData(results.data);
            },
        });
    };

    // TODO: 
    // Create a function that sends data to back end
    // add file browser for CSV


    return (
        <div className="App">
            <Container className="d-flex justify-content-center" >
                <div
                    {...getRootProps({
                        className: `dropzone
                    ${isDragAccept && "dropzoneAccept"}
            ${isDragReject && "dropzoneReject"}`,
                    })}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <h5>Drop the files here ...</h5>
                    ) : (
                        <h5>
                            Drag CSV file here
                        </h5>
                    )}
                </div>
            </Container>

            {console.log(parsedCsvData)}

            <Container className ="mt-2">
                {parsedCsvData[0] != null ? (
                    <TableMaker givenJsonData={parsedCsvData} />
                ) : (
                    <p></p>
                )}
            </Container>
            <Container className="mb-4 mt-3">
                <Row>
                    <Col>
                        <Button variant="danger" onClick = {() => setParsedCsvData([null])}>Delete</Button>
                    </Col>
                    <Col>
                        <Button>Upload</Button>
                    </Col>
                </Row>
                
            
            </Container>
        </div>
    );
}
