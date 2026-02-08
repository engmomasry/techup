function generateFileName(TCName, extension = 'pdf') {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '_'); // Format as HH_MM_SS

  // Save the generated file path in a constant
  const filePath = `results/${TCName}_${formattedDate}-${formattedTime}.${extension}`;

  return filePath; // Return the file path
}

module.exports = { generateFileName };