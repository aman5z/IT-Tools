function doPost(e) {
  try {
    const data = e.parameter;
    const folder = DriveApp.getFolderById("1rgi0M0glLySObvzjVV5B1-NCPkpdul9p"); // <-- Put your folder ID here

    const blob = Utilities.newBlob(
      Utilities.base64Decode(data.file),
      data.mimeType,
      data.name
    );

    const file = folder.createFile(blob);

    // Make the file shareable (optional)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return ContentService
      .createTextOutput(file.getUrl())
      .setMimeType(ContentService.MimeType.TEXT);
  }
  catch (err) {
    return ContentService
      .createTextOutput("Error: " + err)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
