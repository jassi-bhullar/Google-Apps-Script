function createBulkPDFs()
{
  const docFile = DriveApp.getFileById("1Mj9oBNsic6p2tuX8Tuspf54_iL-A7QghK0sQP8OWwwQ");
  const tempFolder = DriveApp.getFolderById("10aolvywr6mOmDkVwjiyJ6FcgYsYm4wXq");
  const pdfFolder = DriveApp.getFolderById("11jinwnDGBGvQ0oJbJjecy50SmR8fCsNA");
  const currentSheet = SpreadsheetApp.openById("1oQ9K8o2t7v_M9j3KBGtu1V6bXo80JqtDdE1oDL_yb0o").getSheetByName("Sheet1");

  const data = currentSheet.getRange(2, 2, currentSheet.getLastRow() - 1,currentSheet.getLastColumn() - 1).getDisplayValues();

  data.forEach(row => {
    createPDF(row[0], row[1], row[8], row[9], row[10], row[2], row[3], row[4], row[5], row[6], row[7], "REPORT CARD " + row[0], docFile, tempFolder, pdfFolder);
  });
}

function createPDF(name, fathername, total, percentage, grade, eng, hindi, pun, math, sst, sci, pdfName, docFile, tempFolder, pdfFolder)
{
  const tempFile = docFile.makeCopy(tempFolder);
  const tempDocFile = DocumentApp.openById(tempFile.getId());
  const body = tempDocFile.getBody();

  body.replaceText("{name}", name);
  body.replaceText("{fathername}", fathername);
  body.replaceText("{fathername}", fathername);
  body.replaceText("{total}", total);
  body.replaceText("{percentage}", percentage);
  body.replaceText("{grade}", grade);
  
  body.replaceText("{eng}", eng);
  body.replaceText("{hindi}", hindi);
  body.replaceText("{pun}", pun);
  body.replaceText("{math}", math);
  body.replaceText("{sst}", sst);
  body.replaceText("{sci}", sci);

  tempDocFile.saveAndClose();

  const pdfContentBlob = tempFile.getAs(MimeType.PDF);
  pdfFolder.createFile(pdfContentBlob).setName(pdfName);
  tempFolder.removeFile(tempFile);
}
