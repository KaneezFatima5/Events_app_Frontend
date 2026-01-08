import {format, isAfter, isBefore, parseISO} from 'date-fns';

export const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime= (date) => {
    return format(new Date(date), 'MMM dd, yyyy . h:mm a');
};
export const formatTime = (date) => {
    return format(new Date(date), 'h:mm a');
};
export const isUpcoming = (startDate) => {
    return isAfter(new Date(startDate), new Date());
};
export const isPast =(endDate)=>{
    return isBefore(new Date(endDate), new Date());
};
export const toISOString = (date)=>{
    return new Date(date).toISOString();
};