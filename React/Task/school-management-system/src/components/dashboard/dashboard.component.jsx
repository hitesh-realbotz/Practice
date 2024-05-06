import { useSelector } from "react-redux";
import { selectTotalStudentsCount } from "../../store/students/student.selector";
import { selectTotalProjectsCount } from "../../store/projects/project.selector";
import { DashBoardTab, FieldBox, FieldHeader, FieldMessage } from "./dashboard.styles";

const DashBoard = () => {
    const studentsCount = useSelector(selectTotalStudentsCount);
    const projectsCount = useSelector(selectTotalProjectsCount);

    return (
        <>
            <DashBoardTab>
                <FieldBox>
                    <FieldHeader>Students</FieldHeader>
                    <FieldMessage>{studentsCount}</FieldMessage>
                </FieldBox>
                <FieldBox>
                    <FieldHeader>Projects</FieldHeader>
                    <FieldMessage>{projectsCount}</FieldMessage>
                </FieldBox>
                <FieldBox>
                    <FieldHeader>Students</FieldHeader>
                    <FieldMessage>{studentsCount}</FieldMessage>
                </FieldBox>
                <FieldBox>
                    <FieldHeader>Projects</FieldHeader>
                    <FieldMessage>{projectsCount}</FieldMessage>
                </FieldBox>
                <FieldBox>
                    <FieldHeader>Students</FieldHeader>
                    <FieldMessage>{studentsCount}</FieldMessage>
                </FieldBox>
                <FieldBox>
                    <FieldHeader>Projects</FieldHeader>
                    <FieldMessage>{projectsCount}</FieldMessage>
                </FieldBox>
                <FieldBox>
                    <FieldHeader>Students</FieldHeader>
                    <FieldMessage>{studentsCount}</FieldMessage>
                </FieldBox>
                <FieldBox>
                    <FieldHeader>Projects</FieldHeader>
                    <FieldMessage>{projectsCount}</FieldMessage>
                </FieldBox>
                <FieldBox>
                    <FieldHeader>Students</FieldHeader>
                    <FieldMessage>{studentsCount}</FieldMessage>
                </FieldBox>
                <FieldBox>
                    <FieldHeader>Projects</FieldHeader>
                    <FieldMessage>{projectsCount}</FieldMessage>
                </FieldBox>
                
            </DashBoardTab>
        </>
    );
}
export default DashBoard;