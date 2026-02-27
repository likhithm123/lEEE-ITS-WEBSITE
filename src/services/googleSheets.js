/**
 * GOOGLE SHEETS INTEGRATION SERVICE
 * 
 * To use this service, you need to deploy a Google Apps Script as a "Web App".
 * 
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste the following code:
 * 
 * function doGet(e) {
 *   var sheetId = e.parameter.id;
 *   var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
 *   var data = sheet.getDataRange().getValues();
 *   var headers = data[0];
 *   var rows = data.slice(1);
 *   var result = rows.map(row => {
 *     var obj = {};
 *     headers.forEach((h, i) => obj[h] = row[i]);
 *     return obj;
 *   });
 *   return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * function doPost(e) {
 *   var params = JSON.parse(e.postData.contents);
 *   var sheetId = params.sheetId;
 *   var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
 *   var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
 *   var newRow = headers.map(h => params[h] || "");
 *   sheet.appendRow(newRow);
 *   return ContentService.createTextOutput(JSON.stringify({status: "success"})).setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * 4. Click "Deploy" > "New Deployment".
 * 5. Select "Web App". Execute as "Me", Access "Anyone".
 * 6. Copy the Web App URL and paste it below in SCRIPT_URL.
 */

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxtAtJdq3b4u6laBkyvN_iZW5fikXqbsDa-fmgj5hQQ5U0tafim_KjV4kMcTOJ8gj9_-w/exec';

const MASTER_SHEET_ID = '1ktZV5cfJSjTfcdVFFEVv1OT4h7kxiuHgLMgguvzPV7E';

const SHEETS = {
    PROFILE: MASTER_SHEET_ID,
    COMMUNITY: MASTER_SHEET_ID,
    BOOKINGS: MASTER_SHEET_ID,
    LOGS: MASTER_SHEET_ID
};

const LOCAL_SERVER = 'http://localhost:5000/api/save';

export const saveToSheet = async (sheetType, data) => {
    const isScriptSet = SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' && !SCRIPT_URL.includes('AKfycbz_fNk0qG9sjNa5cMrZXMkSa030cp8bk2sem-2hVFyhqsl4PBSh5XdQhlyER6no6eoHcQ/exec_UNSET');

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN');
    const timeStr = now.toLocaleTimeString('en-IN');

    // Create a perfectly flat payload for Excel/Sheets
    const payload = {
        date: dateStr,
        time: timeStr,
        timestamp: now.toISOString(),
        category: sheetType,
        ...data
    };

    // 1. Save to Local Excel (Background process - don't await)
    fetch(LOCAL_SERVER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: sheetType, data: payload })
    }).catch(err => console.log('Local server offline.'));

    // 2. Save to Google Sheets (Original)
    if (!isScriptSet) return null;

    try {
        // Use 'no-cors' and 'text/plain' to bypass Google Apps Script's lack of OPTIONS support
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
                sheetId: SHEETS[sheetType],
                category: sheetType,
                ...payload
            })
        });
        return { success: true };
    } catch (error) {
        console.error('Cloud save failed:', error);
        throw error;
    }
};

export const getFromSheet = async (sheetType) => {
    // 1. Try local server first
    try {
        const localRes = await fetch(`http://localhost:5000/api/data/${sheetType}`);
        if (localRes.ok) return await localRes.json();
    } catch (e) { /* fallback */ }

    // 2. Fallback to Google Sheets
    if (!SCRIPT_URL || SCRIPT_URL.includes('YOUR_GOOGLE')) return null;

    try {
        const sheetId = SHEETS[sheetType];
        const categoryMap = { 'PROFILE': 'profile', 'COMMUNITY': 'community', 'BOOKINGS': 'booking', 'LOGS': 'login' };
        const tabName = categoryMap[sheetType] || 'login';

        const response = await fetch(`${SCRIPT_URL}?id=${sheetId}&sheetName=${tabName}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch failed:', error);
        return null;
    }
};
