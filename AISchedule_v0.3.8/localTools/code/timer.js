/*
* @Author: Berge
* @Date: 2024-12-01 13:14:00
* @email：871943346@qq.com
* @Description:广东白云学院-青果教务-timer.js
*/

function getStartDate() {
    let nowDate = new Date();
    let currentMonth = nowDate.getMonth();
    if (currentMonth > 6) {
        return new Date(nowDate.getFullYear(), 8, 1).getTime().toString();
    } else {
        return new Date(nowDate.getFullYear(), 2, 1).getTime().toString();
    }
}

/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
                                 providerRes,
                                 parserRes
                             } = {}) {
    const someAsyncFunc = () => new Promise(resolve => {
        setTimeout(() => resolve(), 1)
    })
    await someAsyncFunc()
    return {
        totalWeek: 20,
        startSemester: getStartDate(),
        startWithSunday: false,
        showWeekend: false,
        forenoon: 4,
        afternoon: 4,
        night: 4,
        sections: sections = [
            {
                section: 1,
                startTime: "08:20",
                endTime: "09:05"
            },
            {
                section: 2,
                startTime: "09:05",
                endTime: "09:50"
            },
            {
                section: 3,
                startTime: "10:15",
                endTime: "11:00"
            },
            {
                section: 4,
                startTime: "11:00",
                endTime: "11:45"
            },
            {
                section: 5,
                startTime: "13:50",
                endTime: "14:35"
            },
            {
                section: 6,
                startTime: "14:35",
                endTime: "15:20"
            },
            {
                section: 7,
                startTime: "15:40",
                endTime: "16:25"
            },
            {
                section: 8,
                startTime: "16:25",
                endTime: "17:10"
            },
            {
                section: 9,
                startTime: "17:45",
                endTime: "18:30"
            },
            {
                section: 10,
                startTime: "18:30",
                endTime: "19:15"
            },
            {
                section: 11,
                startTime: "19:30",
                endTime: "20:15"
            },
            {
                section: 12,
                startTime: "20:15",
                endTime: "21:00"
            },
        ],
    }
}