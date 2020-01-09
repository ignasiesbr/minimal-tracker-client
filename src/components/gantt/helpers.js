
export const sanitizeDay = day => {
    if (day <= 365) return day;
    else return sanitizeDay(day-365)
}

export const getDays = date => {
    const daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    const helper = (month, day, h) => {
        if (month === 0) {
            return day; 
        }
        else {
            return (helper(month-1, day, h+1) + daysPerMonth[h])
        }
    }
    return helper(date.getMonth(), date.getDate(), 0);
}
export const inInterval = (d,interval) => d >= interval[0] && d <= interval[1] ? true : false

export const genDayMonth = day => {

    const daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    const helper = (d, i) => {
        if (d - daysPerMonth[i] <= 0) {
            return d
        }
        else return helper(d - daysPerMonth[i], i + 1);
    }

    const sanitizedDay = sanitizeDay(day);
    return helper(sanitizedDay, 0);
}

export const genMonthDay = day => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    const sanitizeDay = day => {
        if (day <= 365) return day;
        else return sanitizeDay(day-365)
    }
    const helper = (day, i) => {
        if (day - daysPerMonth[i] <= 0 ) {
            return months[i];
        }
        else return helper(day - daysPerMonth[i], i + 1);
    };
    return helper(sanitizeDay(day), 0)
}

//given a day return the day of the first one in the month that belongs
export const getFirstDayOfMonth = day => {
    const daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    const helper = (day, i, acc) => {
        if (day - daysPerMonth[i] <= 0) {
            return acc
        }
        else return helper((day-daysPerMonth[i]), i+1,( acc + daysPerMonth[i]));
    };
    return helper(day, 0, 0);
};
    
export const getLastDayOfMonth = day => {
    const daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    const helper = (day, i, acc) => {
        if (day - daysPerMonth[i] <= 0) {
            return (acc + daysPerMonth[i])
        }
        else return helper(day-daysPerMonth[i], i+1, acc + daysPerMonth[i]);
    };
    return helper(day, 0, 0);
};

export const calculateCols = (start, end) => {
    if (end > start) return end - start;
    else {
        return (365 - start + end);
    };
}

export const fixInterval = (n, start) => {
    if (n - start <= 0) return (n - start + 365);
    else {
        return (n - start);
    };
};