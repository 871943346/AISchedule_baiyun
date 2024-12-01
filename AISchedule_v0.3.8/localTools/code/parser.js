/*
* @Author: Berge
* @Date: 2024-12-01 13:14:00
* @email：871943346@qq.com
* @Description:广东白云学院-青果教务-parser.js
*/

function parseWeeks(weekString, sectionString) {
    if (!weekString) return [];
    const isOddWeek = sectionString.includes('单');
    const isEvenWeek = sectionString.includes('双');
    return weekString.split(',').flatMap(week => {
        if (week.includes('-')) {
            const [start, end] = week.split('-').map(Number);
            if (isNaN(start) || isNaN(end)) return [];
            return Array.from({length: end - start + 1}, (_, i) => start + i);
        }
        if (week.includes('单') || week.includes('双')) {
            const [start, end] = week.split('-').map(Number);
            if (isNaN(start) || isNaN(end)) return [];
            const isOdd = week.includes('单');
            return Array.from({length: Math.ceil((end - start) / 2) + 1}, (_, i) => start + i * 2 - (isOdd ? 0 : 1));
        }
        const singleWeek = Number(week);
        return isNaN(singleWeek) ? [] : [singleWeek];
    }).filter(week => {
        if (isOddWeek && week % 2 === 0) return false;
        if (isEvenWeek && week % 2 !== 0) return false;
        return week >= 1 && week <= 30;
    });
}

function getDayOfWeek(weekString) {
    const dayMap = {
        '一': 1,
        '二': 2,
        '三': 3,
        '四': 4,
        '五': 5,
        '六': 6,
        '日': 7
    };
    const match = weekString.match(/周?([一二三四五六日])/);
    return match ? dayMap[match[1]] : null;
}

function parseSections(weekString) {
    const match = weekString.match(/\[(\d+)-(\d+)节\]/);
    if (match) {
        const start = Number(match[1]);
        const end = Number(match[2]);
        return (start > 0 && end > 0 && start <= 30 && end <= 30) ? Array.from({length: end - start + 1}, (_, i) => start + i) : [1, 12];
    }
    return [1, 12];
}

function scheduleHtmlParser(html) {
    const result = [];
    let lastNonEmptyName = '';
    let lastNonEmptyTeacher = '';
    const rows = $('tr').slice(2, -1).toArray();
    if (rows && rows.length > 0) {
        for (const row of rows) {
            const cells = $(row).find('td');
            if (cells.length === 0) {
                console.log('Skipping row with no course information:', row);
                continue;
            }
            const name = $(cells[1]).text().trim() || lastNonEmptyName;
            const position = $(cells[12]).text().trim() || '';
            const teacher = $(cells[9]).text().trim() || lastNonEmptyTeacher;
            const weeks = parseWeeks($(cells[10]).text().trim() || '', $(cells[11]).text().trim() || '');
            const day = getDayOfWeek($(cells[11]).text().trim() || '');
            const sections = parseSections($(cells[11]).text().trim() || '');
            if (name) lastNonEmptyName = name;
            if (teacher) lastNonEmptyTeacher = teacher;
            result.push({
                name,
                position,
                teacher,
                weeks,
                day,
                sections
            });
        }
    } else {
        console.log('No rows found in the provided HTML');
    }
    return result;
}