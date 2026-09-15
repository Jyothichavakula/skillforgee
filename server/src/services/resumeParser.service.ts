import {
  PDFParse,
} from "pdf-parse";

import mammoth from "mammoth";

export const extractResumeText = async (
  buffer: Buffer,
  fileType: "PDF" | "DOCX"
): Promise<string> => {
  let text = "";

  if (fileType === "PDF") {
    const parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    text = result.text;

    await parser.destroy();
  }

  if (fileType === "DOCX") {
    const result =
      await mammoth.extractRawText({
        buffer,
      });

    text = result.value;
  }

  const cleanedText = text
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!cleanedText) {
    throw new Error(
      "Could not extract text from the resume"
    );
  }

  if (cleanedText.length > 30000) {
    throw new Error(
      "Resume text is too long to analyze"
    );
  }

  return cleanedText;
};