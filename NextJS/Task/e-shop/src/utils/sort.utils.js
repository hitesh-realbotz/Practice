import { SORT_ORDER_ASC } from "@/config/constants";

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
export const getSortedData = (sortBy, sortOrder, data) => data.slice().sort((a, b) => {
    // If both values are numeric, compare them as numbers
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    if (sortOrder === SORT_ORDER_ASC) {
        return sortByOrder(valueA, valueB);
    } else {
        return sortByOrder(valueB, valueA);
    }
});