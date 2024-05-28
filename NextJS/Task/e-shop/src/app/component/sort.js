import DropdownInput from "./form-input/dropdown-input";
import { memo } from "react";

const Sort = memo((props) => {

    const { sortOptions, sortOrderOptions, sortBy, sortOrder, onhandleChange, onhandleBlur, handleReset, sortFor } = props;
    const onHandleChange = (event, name) => {
        onhandleChange(event, name);
    }
    const onHandleBlur = (event, name) => {
        onhandleBlur(event, name);
    }


    return (
        <>
            <div className="d-flex align-items-end justify-content-evenly g-5">

                <div className="ms-3">

                    <DropdownInput
                        label='SortBy'
                        options={sortOptions}
                        handleChange={(event, name) => onHandleChange(event, name)}
                        handleBlur={(event, name) => onHandleBlur(event, name)}
                        errorM={''}
                        value={sortBy}
                        name='sortBy'
                    />
                </div>
                <div className="ms-3">
                    <DropdownInput
                        label='SortOrder'
                        options={sortOrderOptions}
                        handleChange={(event, name) => onHandleChange(event, name)}
                        handleBlur={(event, name) => onHandleBlur(event, name)}
                        errorM={''}
                        value={sortOrder}
                        name='sortOrder'
                    />
                </div>
                <button className="btn btn-secondary h-auto mb-3 ms-3" onClick={handleReset}>Reset</button>

            </div>
        </>
    )
});
export default Sort;