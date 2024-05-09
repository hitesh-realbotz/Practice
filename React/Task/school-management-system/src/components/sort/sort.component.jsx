import { Button, ButtonsContainer, ResetButton, RowContainer, SortComponent } from "./sort.styles"
import DropdownInput from '../form-dropdown/form-dropdown.component';
import { memo } from "react";

const Sort = memo((props) => {

    const { sortOptions, sortOrderOptions, sortBy, sortOrder, onhandleChange, onhandleBlur, handleAdd, handleReset, sortFor } = props;
    const onHandleChange = (event, name) => {
        onhandleChange(event, name);
    }
    const onHandleBlur = (event, name) => {
        onhandleBlur(event, name);
    }

    return (
        <>
            <SortComponent>
            <RowContainer>
                <DropdownInput
                    label='SortBy'
                    options={sortOptions}
                    handleChange={(event, name) => onHandleChange(event, name)}
                    handleBlur={(event, name) => onHandleBlur(event, name)}
                    errorM={''}
                    value={sortBy}
                    name='sortBy'
                />
                <DropdownInput
                    label='SortOrder'
                    options={sortOrderOptions}
                    handleChange={(event, name) => onHandleChange(event, name)}
                    handleBlur={(event, name) => onHandleBlur(event, name)}
                    errorM={''}
                    value={sortOrder}
                    name='sortOrder'
                />
                <ButtonsContainer>
                    <ResetButton onClick={handleReset}>Reset</ResetButton>
                    <Button onClick={handleAdd}>Add {sortFor}</Button>
                </ButtonsContainer>
            </RowContainer>
            </SortComponent>
        </>
    )
});
export default Sort;