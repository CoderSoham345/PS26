/**
 * Centralized Gemini AI Model Configuration for Surakshit Dhara
 * Default model: gemini-3.8-flash
 */

export const GEMINI_MODEL = 
  (typeof process !== 'undefined' && process.env?.GEMINI_MODEL) || 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_MODEL) || 
  'gemini-3.8-flash';

export const GEMINI_MODEL_DISPLAY_NAME = 'Gemini 3.8 Flash';
