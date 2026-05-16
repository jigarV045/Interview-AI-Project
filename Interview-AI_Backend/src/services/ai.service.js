const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

async function interviewReport({ jobDescription, resume, selfDescription }) {
  const prompt = `Generate an interview report for a candidate with the following details:
    Job Description: ${jobDescription}
    Resume: ${resume}
    Self Description: ${selfDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text);
}

async function generateResumePDFfromHTML(htmlContent) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  return pdfBuffer;
}

const resumePdfSchema = z.object({
  html: z
    .string()
    .describe(
      "The HTML content of the resume PDF which can be converted to pdf using any library like puppeteer",
    ),
});

async function generateResumePDF({ jobDescription, resume, selfDescription }) {
  const prompt = `Generate html content of resume for a candidate with the following details:
    Job Description: ${jobDescription}
    Resume: ${resume}
    Self Description: ${selfDescription}

Follow the EXACT same layout, structure, section order, spacing, and styling in every generation. Only change the content dynamically based on the provided resume data, self description, and job description.

Resume Structure Order:
1. Header (if it is there in given resume) (similar to given resume)
2. Professional Summary (if it is there in given resume)
3. Skills (if it is there in given resume)
4. Experience / Projects (if it is there in given resume)
5. Education (if it is there in given resume)
6. Certifications / Achievements (if it is there in given resume)

Requirements:
- Use Times New Roman font
- Single-column ATS-friendly layout
- Professional and clean design
- Use proper headings and bullet points
- Keep all content within ONE A4 page
- Avoid overflow, overlapping, or broken layouts in Puppeteer PDF generation
- Do not use tables, icons, ratings, charts, or multi-column layouts
- Keep spacing and typography consistent
- Tailor content according to the job description
- Include relevant ATS keywords naturally
- Content should sound human-written and professional
- Avoid generic AI phrases and unnecessary filler
- GitHub, LinkedIn, Portfolio, and Email links should be blue and clickable
- All other text should remain black
- Do not include declaration, references, hobbies, or unnecessary sections

Technical Requirements:
- Return ONLY raw HTML
- Include embedded CSS inside <style> tag
- Ensure layout is print-friendly for Puppeteer PDF generation
- Use clean semantic HTML`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    generateConfig: {
      temperature: 0,
    },
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonResponse = JSON.parse(response.text);
  const pdfBuffer = await generateResumePDFfromHTML(jsonResponse.html);
  return pdfBuffer;
}
module.exports = { interviewReport, generateResumePDF };
