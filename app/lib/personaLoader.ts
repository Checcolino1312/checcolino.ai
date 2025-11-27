import fs from 'fs';
import path from 'path';
import { Persona } from '../types/persona';

/**
 * Parses a markdown file with ## headers into a structured object
 * @param content - The markdown file content
 * @returns Parsed Persona object
 */
function parseMarkdown(content: string): Persona {
  const sections: Record<string, string> = {};

  // Split by ## headers
  const lines = content.split('\n');
  let currentSection = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    // Check if line is a ## header
    if (line.trim().startsWith('## ')) {
      // Save previous section if exists
      if (currentSection && currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n').trim();
      }

      // Start new section
      currentSection = line.trim().substring(3).trim();
      currentContent = [];
    } else if (currentSection && line.trim() !== '' && !line.trim().startsWith('#')) {
      // Add content to current section (skip empty lines and main header)
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentSection && currentContent.length > 0) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  // Map sections to Persona interface
  return {
    name: sections['Name'] || 'Checcolino',
    bio: sections['Bio'] || '',
    background: sections['Background'] || '',
    personality: sections['Personality'] || '',
    talkingStyle: sections['Talking Style'] || '',
    knowledge: sections['Knowledge'] || '',
    additionalContext: sections['Additional Context'] || undefined,
  };
}

/**
 * Loads and parses the francesco.md persona configuration file
 * @returns Persona object
 * @throws Error if file cannot be read or parsed
 */
export async function loadPersona(): Promise<Persona> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'francesco.md');

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`Persona file not found at: ${filePath}`);
    }

    // Read file content
    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse markdown content
    const persona = parseMarkdown(content);

    // Validate required fields
    if (!persona.name) {
      throw new Error('Persona name is required in francesco.md');
    }

    return persona;
  } catch (error) {
    console.error('Error loading persona:', error);

    // Return default persona if loading fails
    return {
      name: 'Francesco',
      bio: 'Un assistente AI personalizzato.',
      background: '',
      personality: '',
      talkingStyle: '',
      knowledge: '',
    };
  }
}

/**
 * Synchronous version of loadPersona for use in non-async contexts
 * @returns Persona object
 */
export function loadPersonaSync(): Persona {
  try {
    const filePath = path.join(process.cwd(), 'data', 'francesco.md');

    if (!fs.existsSync(filePath)) {
      throw new Error(`Persona file not found at: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const persona = parseMarkdown(content);

    if (!persona.name) {
      throw new Error('Persona name is required in francesco.md');
    }

    return persona;
  } catch (error) {
    console.error('Error loading persona:', error);

    return {
      name: 'Francesco',
      bio: 'Un assistente AI personalizzato.',
      background: '',
      personality: '',
      talkingStyle: '',
      knowledge: '',
    };
  }
}
