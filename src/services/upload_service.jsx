export async function fetchUploadFiles(data) {
  try {
    const response = await fetch("http://localhost:5180/api/upload/manual", {
      method: "POST",
      body: data,
    });
    return response;
  } catch (error) {
    console.error(
      `Error occurred while sending file copy for ${filePath} to the API:`,
      error
    );
  }
}
