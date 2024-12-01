/*
* @Author: Berge
* @Date: 2024-12-01 13:14:00
* @email：871943346@qq.com
* @Description:广东白云学院-青果教务-provide.js
*/

async function scheduleHtmlProvider() {
    await loadTool('AIScheduleTools');
    try {
        let frameSet = document.querySelector("html > frameset");
        if (!frameSet) throw new Error("没有找到 frameset 元素");
        let frameBody = frameSet.querySelector("frame:nth-child(3)");
        if (!frameBody) throw new Error("没有找到指定的 frame 元素");
        let frameMain = frameBody.contentWindow.document.querySelector("#frmMain");
        if (!frameMain) throw new Error("没有找到 frmMain");
        let formElement = frameMain.contentWindow.document.querySelector("body > form");
        if (!formElement) throw new Error("没有找到 form 元素");
        let tdElement = formElement.querySelector("table > tbody > tr:nth-child(3) > td");
        if (!tdElement) throw new Error("没有找到指定的 table 元素");
        let iframeRpt = tdElement.querySelector("#frmRpt");
        if (!iframeRpt) throw new Error("没有找到 frmRpt iframe");
        let tableElement = iframeRpt.contentWindow.document.querySelector("body > table[cellspacing='1']");
        if (!tableElement) throw new Error("没有找到课程表的 table 元素");
        return (tableElement.outerHTML);
        let jsonString = JSON.stringify(tableElement.outerHTML);
        return JSON.stringify(jsonString);
    } catch (e) {
        console.error("错误:", e.message);
        await AIScheduleAlert({
            titleText: '提示',
            contentText: '请登录进入教务网络管理系统-教学安排-教学安排表-格式二-点击检索，点击导入课表\nBy-Berge',
            confirmText: '确认',
        })
        return 'do not continue';
    }
}
