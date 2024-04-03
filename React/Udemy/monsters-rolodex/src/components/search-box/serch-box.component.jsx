const SearchBox = ({className, placeholder, onChangeHandler}) => {

return(
    <input type="search" className={`search-box ${className}`} placeholder={placeholder} onChange={onChangeHandler} ></input>
)
}

export default SearchBox;