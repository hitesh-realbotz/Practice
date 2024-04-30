import { CONSTANTS } from "../../constants/constants";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { Actions, Table } from "./table.styles";

const TableComponent = (props) => {

    const { tableData, handleEdit, handleDelete, tableFor } = props;
    console.log(props);
    console.log(props.tableData);
    console.log(tableData);
    console.log(Object.keys(tableData[0]));

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
                                <th>Standard</th>
                                <th>Division</th>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Subject</th>
                            </>
                            : <>
                                <th>ProjectName</th>
                                <th>Division</th>

                                <th>Date of Birth</th>
                                <th>Subject</th>
                            </>

                    }

                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    tableFor === CONSTANTS.FOR_STUDENT
                        ?
                        tableData.map((student, index) => (
                            <tr key={index}>
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

                        : ''

                }
                { }
            </tbody>
        </Table>
    );
}
export default TableComponent;