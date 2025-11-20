"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface GeminiResponse {
	success: boolean;
	text?: string;
	model?: string;
	error?: string;
	details?: string;
}

/**
 * Generate content using Gemini AI
 */
export async function generateGeminiContent(
	prompt: string,
	model: string = "gemini-pro",
): Promise<GeminiResponse> {
	try {
		if (!prompt || prompt.trim().length === 0) {
			return {
				success: false,
				error: "Prompt is required",
			};
		}

		if (!process.env.GEMINI_API_KEY) {
			return {
				success: false,
				error: "Gemini API key is not configured",
			};
		}

		const genModel = genAI.getGenerativeModel({ model });
		const result = await genModel.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		return {
			success: true,
			text,
			model,
		};
	} catch (error: unknown) {
		console.error("Gemini API Error:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred";
		return {
			success: false,
			error: "Failed to generate content",
			details: errorMessage,
		};
	}
}

/**
 * Get available Gemini models
 */
export async function getAvailableModels(): Promise<string[]> {
	return ["gemini-pro", "gemini-1.5-pro", "gemini-1.5-flash"];
}
