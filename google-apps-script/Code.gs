const TIMEZONE = "Asia/Kolkata";

const HEADER_ROW = [[
  "Name",
  "Phone",
  "Email",
  "City",
  "Course",
  "Budget",
  "Interest",
  "Contact Preference",
  "Page URL",
  "Submitted At",
  "Submission Stage"
]];

// 11 columns
const COLUMN_WIDTHS = [180, 140, 240, 160, 180, 140, 180, 190, 340, 190, 170];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const sheet = getTodaySheet();

    const rowData = buildRowData(data);
    const phone = rowData.phone;
    const stage = rowData.submissionStage || "final_submit";

    if (!phone) {
      return jsonResponse({ ok: false, message: "Phone is required" });
    }

    const existingRow = findRowByPhone(sheet, phone); // row number or 0

    if (stage === "phone_capture") {
      if (existingRow > 0) {
        // Keep existing data, update stage + submitted time
        sheet.getRange(existingRow, 10).setValue(rowData.submittedAt);     // Submitted At
        sheet.getRange(existingRow, 11).setValue("phone_capture");         // Submission Stage
      } else {
        // Insert minimal lead at phone step
        sheet.appendRow([
          "",                       // Name
          phone,                    // Phone
          "",                       // Email
          "",                       // City
          String(rowData.course),   // Course (if available)
          String(rowData.budget),   // Budget (if available)
          String(rowData.interest), // Interest (if available)
          String(rowData.contactPref),
          String(rowData.pageUrl),
          rowData.submittedAt,
          "phone_capture"
        ]);
      }

      return jsonResponse({ ok: true, mode: "phone_capture" });
    }

    // final_submit (default behavior)
    if (existingRow > 0) {
      // Update same row matched by phone
      sheet.getRange(existingRow, 1, 1, 11).setValues([[
        rowData.name,
        phone,
        rowData.email,
        rowData.city,
        rowData.course,
        rowData.budget,
        rowData.interest,
        rowData.contactPref,
        rowData.pageUrl,
        rowData.submittedAt,
        "final_submit"
      ]]);
      return jsonResponse({ ok: true, mode: "updated_existing_row" });
    }

    // No existing phone row -> append new full row
    sheet.appendRow([
      rowData.name,
      phone,
      rowData.email,
      rowData.city,
      rowData.course,
      rowData.budget,
      rowData.interest,
      rowData.contactPref,
      rowData.pageUrl,
      rowData.submittedAt,
      "final_submit"
    ]);

    return jsonResponse({ ok: true, mode: "inserted_new_row" });
  } catch (err) {
    return jsonResponse({ ok: false, message: String(err) });
  }
}

function buildRowData(data) {
  return {
    name: String(data.name || "").trim(),
    phone: String(data.phone || "").replace(/\D/g, ""),
    email: String(data.email || "").trim(),
    city: String(data.city || "").trim(),
    course: String(data.course || "").trim(),
    budget: String(data.budget || "").trim(),
    interest: String(data.interest || "").trim(),
    contactPref: String(data.contactPref || "").trim(),
    pageUrl: String(data.page_url || "").trim(),
    submittedAt: new Date().toISOString(),
    submissionStage: String(data.submission_stage || "").trim()
  };
}

function getTodaySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tz = Session.getScriptTimeZone() || TIMEZONE;
  const today = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd");
  const sheetName = `Leads_${today}`;

  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  applyHeaderAndStyle(sheet);
  return sheet;
}

function applyHeaderAndStyle(sheet) {
  const colCount = HEADER_ROW[0].length;
  const headerRange = sheet.getRange(1, 1, 1, colCount);

  headerRange.setValues(HEADER_ROW);

  // Header style: size 12, bold, center, colored
  headerRange
    .setFontSize(12)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setWrap(true)
    .setBackground("#0F766E")
    .setFontColor("#FFFFFF");

  // Set widths
  COLUMN_WIDTHS.forEach((width, idx) => {
    sheet.setColumnWidth(idx + 1, width);
  });

  sheet.setFrozenRows(1);
}

function findRowByPhone(sheet, phone) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  // Phone is column 2, starting at row 2
  const values = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    const rowPhone = String(values[i][0] || "").replace(/\D/g, "");
    if (rowPhone === phone) return i + 2; // convert index -> sheet row
  }
  return 0;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
