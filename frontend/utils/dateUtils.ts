import { DateType } from "react-native-ui-datepicker";

/**
 * Get the start date of the current month in YYYY-MM-DD format
 * @returns {string} Start date of current month
 */
export const getStartOfCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);

    return formatDateToYYYYMMDD(startDate);
};

/**
 * Get the end date of the current month in YYYY-MM-DD format
 * @returns {string} End date of current month
 */
export const getEndOfCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const endDate = new Date(year, month + 1, 0);

    return formatDateToYYYYMMDD(endDate);
};

/**
 * Format Date object to YYYY-MM-DD string
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
const formatDateToYYYYMMDD = (date:Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

/**
 * Get the start date of a specific month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @returns {string} Start date of the specified month
 */
export const getStartOfMonth = (year:number, month:number) => {
    const startDate = new Date(year, month, 1);
    return formatDateToYYYYMMDD(startDate);
};

/**
 * Get the end date of a specific month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @returns {string} End date of the specified month
 */
export const getEndOfMonth = (year:number, month:number) => {
    const endDate = new Date(year, month + 1, 0);
    return formatDateToYYYYMMDD(endDate);
};

/**
 * Get the start and end dates of the current month
 * @returns {Object} { startDate, endDate }
 */
export const getCurrentMonthRange = () => {
    return {
        startDate: getStartOfCurrentMonth(),
        endDate: getEndOfCurrentMonth()
    };
};

/**
 * Get the start and end dates of a specific month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @returns {Object} { startDate, endDate }
 */
export const getMonthRange = (year:number, month:number) => {
    return {
        startDate: getStartOfMonth(year, month),
        endDate: getEndOfMonth(year, month)
    };
};

/**
 * Get current month and year as string
 * @returns {string} e.g., "September 2023"
 */
export const getCurrentMonthYear = () => {
    const date = new Date();
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};

export default {
    getStartOfCurrentMonth,
    getEndOfCurrentMonth,
    getStartOfMonth,
    getEndOfMonth,
    getCurrentMonthRange,
    getMonthRange,
    getCurrentMonthYear
};

export function formatDate(dateStr:string) {

  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short",day: "numeric"});
}

export const getFormatedDate = (date:Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);

    return formatDateToYYYYMMDD(startDate);
};

