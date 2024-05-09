import { memo, useEffect, useState } from "react";
import { CONSTANTS } from "../../constants/constants";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { Actions, Table } from "./table.styles";
import { faArrowDownAZ, faArrowDownZA, faArrowDown19, faArrowDown91 } from '@fortawesome/free-solid-svg-icons';
import Icon from "../icon/icon.component";

const TableComponent = memo((props) => {

    const sortByOrder = (value1, value2) => {
        const isNumeric = !isNaN(value1) && !isNaN(value2);
        if (isNumeric) {
            return value1 - value2;
        } else {
            //isDate
            if (!isNaN(Date.parse(value1)) && !isNaN(Date.parse(value2))) {
                return Date.parse(value1) - Date.parse(value2);
            }
            value1 = value1.toLowerCase();
            value2 = value2.toLowerCase();
            // Compare field values
            if (value1 < value2) return -1;
            if (value1 > value2) return 1;
            return 0;
        }
    }
    const getSortedData = (sortBy, sortOrder) => tableData.slice().sort((a, b) => {
        // If both values are numeric, compare them as numbers
        const valueA = a[sortBy];
        const valueB = b[sortBy];
        if (sortOrder === CONSTANTS.SORT_ORDER_ASC) {
            return sortByOrder(valueA, valueB);
        } else {
            return sortByOrder(valueB, valueA);
        }
    });

    const { tableData, handleEdit, handleDelete, tableFor, sortByProp, sortOrderProp } = props;
    // const [sortedData, setSortedData] = useState(getSortedData(sortByProp, sortOrderProp));
    const [sortedData, setSortedData] = useState([]);


    useEffect(() => {
        setSortedData(getSortedData(sortByProp, sortOrderProp));
    }, [tableData, sortByProp, sortOrderProp]);


    const handleSort = (field, sortOrder) => {
        setSortedData(getSortedData(field, sortOrder));
    }

    const onHandleEditStudent = (student) => {
        handleEdit(student);
    }

    const onHandleDeleteStudent = (student) => {
        handleDelete(student);
    }
    const isSortHeading = (heading) => {
        if (heading === sortByProp) {
            return (heading === CONSTANTS.SORT_BY_STANDARD || heading === CONSTANTS.SORT_BY_DOB 
                    || heading === CONSTANTS.SORT_BY_START_DATE || heading === CONSTANTS.SORT_BY_END_DATE)
                        ? <Icon icon={sortOrderProp === CONSTANTS.SORT_ORDER_ASC ? faArrowDown19 : faArrowDown91} fade={true}/>
                        : <Icon icon={sortOrderProp === CONSTANTS.SORT_ORDER_ASC ? faArrowDownAZ : faArrowDownZA} fade={true}/>;
        }
        return '';
    }

    return (
        <>
            <Table>
                <thead >
                    <tr>
                        <th>Sr.No.</th>
                        {
                            tableFor === CONSTANTS.FOR_STUDENT
                                ? <>
                                    <th>Standard {isSortHeading(CONSTANTS.SORT_BY_STANDARD)}</th>
                                    <th >Division {isSortHeading(CONSTANTS.SORT_BY_DIVISION)}</th>
                                    <th>Roll No</th>
                                    <th>Name {isSortHeading(CONSTANTS.SORT_BY_NAME)}</th>
                                    <th>Email {isSortHeading(CONSTANTS.SORT_BY_EMAIL)}</th>
                                    <th>Date of Birth {isSortHeading(CONSTANTS.SORT_BY_DOB)} </th>
                                    <th>Subject {isSortHeading(CONSTANTS.SORT_BY_SUBJECT)}</th>
                                </>
                                : <>
                                    <th>Title {isSortHeading(CONSTANTS.SORT_BY_TITLE)}</th>
                                    <th>Discription</th>
                                    <th>Status {isSortHeading(CONSTANTS.SORT_BY_STATUS)}</th>
                                    <th>Start Date {isSortHeading(CONSTANTS.SORT_BY_START_DATE)}</th>
                                    <th>End Date {isSortHeading(CONSTANTS.SORT_BY_END_DATE)}</th>
                                    <th>Student Name {isSortHeading(CONSTANTS.SORT_BY_NAME)}</th>
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
                            sortedData.map((project, index) => (
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
        </>

    );
});
export default TableComponent;