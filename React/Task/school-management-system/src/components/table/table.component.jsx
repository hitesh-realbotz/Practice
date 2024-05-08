import { useEffect, useState } from "react";
import { CONSTANTS } from "../../constants/constants";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { Actions, Table } from "./table.styles";

const TableComponent = (props) => {

    const { tableData, handleEdit, handleDelete, tableFor } = props;
    const [sortedData, setSortedData] = useState([]);

    const getSortedData = (sortBy) => tableData.slice().sort((a, b) => {
        // Convert field values to lowercase for case-insensitive sorting
        const fieldA = a[sortBy].toLowerCase();
        const fieldB = b[sortBy].toLowerCase();
        // Compare field values
        if (fieldA > fieldB) return -1;
        if (fieldA < fieldB) return 1;
        return 0;
    });

    useEffect(() => {
        setSortedData(getSortedData('division')); 
    }, [tableData]);



    console.log(sortedData);

    const handleSort = (field) => {
        const sort = getSortedData(field);
        setSortedData(sort);
    }

    const onHandleEditStudent = (student) => {
        handleEdit(student);
    }

    const onHandleDeleteStudent = (student) => {
        handleDelete(student);
    }

    return (
        <Table>
            <thead >
                <tr>
                    <th>Sr.No.</th>
                    {
                        tableFor === CONSTANTS.FOR_STUDENT
                            ? <>
                                <th onClick={() => handleSort('standard')}>Standard</th>
                                <th onClick={() => handleSort('division')}>Division</th>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th onClick={() => handleSort('dob')}>Date of Birth</th>
                                <th>Subject</th>
                            </>
                            : <>
                                <th>Title</th>
                                <th>Discription</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Student Name</th>
                            </>
                    }
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    tableFor === CONSTANTS.FOR_STUDENT
                        ?
                        sortedData.map((student, index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{student.standard}</td>
                                <td>{student.division}</td>
                                <td>{student.rollNo}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.dob}</td>
                                <td>{student.subject}</td>
                                <td>
                                    <Actions>
                                        <Button onClick={() => onHandleEditStudent(student)}>Edit</Button>
                                        <Button onClick={() => onHandleDeleteStudent(student)} buttonType={BUTTON_TYPE_CLASSES.delete}>Delete</Button>
                                    </Actions>
                                </td>
                            </tr>
                        ))

                        :
                        tableData.map((project, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>{project.status}</td>
                                <td>{project.startDate}</td>
                                <td>{project.endDate}</td>
                                <td>{project.name}</td>
                                <td>
                                    <Actions>
                                        <Button onClick={() => onHandleEditStudent(project)}>Edit</Button>
                                        <Button onClick={() => onHandleDeleteStudent(project)} buttonType={BUTTON_TYPE_CLASSES.delete}>Delete</Button>
                                    </Actions>
                                </td>
                            </tr>
                        ))

                }
                { }
            </tbody>
        </Table>
    );
}
export default TableComponent;