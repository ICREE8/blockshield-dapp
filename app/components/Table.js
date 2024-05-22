import React from 'react';
import { Table } from 'react-bootstrap';

const DataTable = ({ data }) => (
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.value}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default DataTable;
