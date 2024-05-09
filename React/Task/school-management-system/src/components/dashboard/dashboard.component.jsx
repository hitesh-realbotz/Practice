import { useSelector } from "react-redux";
import { selectTotalStudentsCount } from "../../store/students/student.selector";
import { selectProjectsState } from "../../store/projects/project.selector";
import { DashBoardTab, FieldBox, FieldHeader, FieldMessage, Fields, Title } from "./dashboard.styles";
import Spinner from "../spinner/spinner.component";
import { selectIsLoading } from "../../store/user/user.selector";

const DashBoard = () => {
    const studentsCount = useSelector(selectTotalStudentsCount);
    const projectsState = useSelector(selectProjectsState);
    const isLoading = useSelector(selectIsLoading);
    console.log('PROJ ', projectsState);
    return (
        <> {
            isLoading ?
                <>
                    < Spinner />
                </>
                :
                <DashBoardTab>

                    <div>
                        <Title>
                            <h2>Welcome to the School Management System</h2>
                        </Title>
                        <Fields>
                            <FieldBox>
                                <FieldHeader>Students</FieldHeader>
                                <FieldMessage>{studentsCount}</FieldMessage>
                            </FieldBox>
                            <FieldBox>
                                <FieldHeader>Total Projects</FieldHeader>
                                <FieldMessage>{projectsState.totalProjects}</FieldMessage>
                            </FieldBox>
                            <FieldBox>
                                <FieldHeader>Projects - Ongoing</FieldHeader>
                                <FieldMessage>{projectsState.totalOngoingProjects}</FieldMessage>
                            </FieldBox>
                            <FieldBox>
                                <FieldHeader>Projects - Complete</FieldHeader>
                                <FieldMessage>{projectsState.totalCompleteProjects}</FieldMessage>
                            </FieldBox>
                            <FieldBox>
                                <FieldHeader>Projects - Hold</FieldHeader>
                                <FieldMessage>{projectsState.totalHoldProjects}</FieldMessage>
                            </FieldBox>

                        </Fields>
                    </div>

                </DashBoardTab>
        }
        </>
    );
}
export default DashBoard;