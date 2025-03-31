// Interface for a parsed glyph
export interface ParsedGlyph {
  title: string;
  type: string;
  pattern: string;
  system: string;
  params?: Record<string, any>;
}

// Pattern types for different GLYPH patterns
export enum GlyphPatternType {
  INITIALIZATION = 'initialization',
  ACTIVATION = 'activation',
  QUERY = 'query',
  TRANSFORMATION = 'transformation',
  RITUAL = 'ritual'
}

/**
 * The GLYPH parser class to convert ritual-like commands into structured data
 */
export class GlyphParser {
  /**
   * Parse a GLYPH string into a structured object
   * @param glyphString The ritual command string to parse
   * @returns A parsed glyph object
   */
  public parse(glyphString: string): ParsedGlyph {
    // Trim any whitespace and standardize
    const normalizedString = glyphString.trim();
    
    // Determine the pattern type
    const patternType = this.determinePatternType(normalizedString);
    
    // Extract the title (usually the second word in the command)
    const words = normalizedString.split(' ');
    const title = words.length > 1 ? words[1] : 'Unknown';
    
    // Determine which system this glyph belongs to
    const system = this.determineSystem(normalizedString);
    
    // Extract any parameters
    const params = this.extractParams(normalizedString);
    
    return {
      title,
      type: patternType,
      pattern: normalizedString,
      system,
      params
    };
  }
  
  /**
   * Determine the pattern type based on command keywords
   */
  private determinePatternType(pattern: string): string {
    if (pattern.startsWith('Initialize')) {
      return GlyphPatternType.INITIALIZATION;
    } else if (pattern.startsWith('Activate')) {
      return GlyphPatternType.ACTIVATION;
    } else if (pattern.startsWith('Query') || pattern.includes('?')) {
      return GlyphPatternType.QUERY;
    } else if (pattern.startsWith('Transform') || pattern.includes('into')) {
      return GlyphPatternType.TRANSFORMATION;
    } else if (pattern.startsWith('Perform') || pattern.startsWith('Execute') || pattern.startsWith('Begin')) {
      return GlyphPatternType.RITUAL;
    }
    
    // Default to ritual if no specific pattern is matched
    return GlyphPatternType.RITUAL;
  }
  
  /**
   * Determine which system this glyph belongs to based on keywords
   */
  private determineSystem(pattern: string): string {
    if (pattern.includes('Bloom') || pattern.includes('Petal')) {
      return 'MirrorBloom';
    } else if (pattern.includes('Singularis') || pattern.includes('Prime')) {
      return 'SingularisPrime';
    } else if (pattern.includes('Transatron') || pattern.includes('Relay') || pattern.includes('entanglement')) {
      return 'Transatron';
    } else if (pattern.includes('Glyph') || pattern.includes('Parser')) {
      return 'GlyphEngine';
    } else if (pattern.includes('Codex')) {
      return 'CodexManager';
    }
    
    // Default system
    return 'MirrorBloom';
  }
  
  /**
   * Extract parameters from the command string
   */
  private extractParams(pattern: string): Record<string, any> {
    const params: Record<string, any> = {};
    
    // Extract values in quotation marks
    const quotedValues = pattern.match(/"([^"]*)"|'([^']*)'/g);
    if (quotedValues) {
      quotedValues.forEach((value, index) => {
        // Remove quotes
        const cleanValue = value.replace(/["']/g, '');
        params[`param${index + 1}`] = cleanValue;
      });
    }
    
    // Extract key-value pairs (format: key=value)
    const keyValuePairs = pattern.match(/(\w+)=([^,\s]+)/g);
    if (keyValuePairs) {
      keyValuePairs.forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = value;
      });
    }
    
    // Extract numeric values
    const numbers = pattern.match(/\b\d+(\.\d+)?\b/g);
    if (numbers) {
      if (!params.numeric) {
        params.numeric = [];
      }
      numbers.forEach(num => {
        params.numeric.push(parseFloat(num));
      });
    }
    
    return params;
  }
  
  /**
   * Compile a ParsedGlyph back into a GLYPH string
   */
  public compile(parsedGlyph: ParsedGlyph): string {
    const { type, title, system, params } = parsedGlyph;
    
    let compiledString = '';
    
    // Start with the appropriate verb based on type
    switch (type) {
      case GlyphPatternType.INITIALIZATION:
        compiledString = `Initialize ${title}`;
        break;
      case GlyphPatternType.ACTIVATION:
        compiledString = `Activate ${title}`;
        break;
      case GlyphPatternType.QUERY:
        compiledString = `Query ${title}`;
        break;
      case GlyphPatternType.TRANSFORMATION:
        compiledString = `Transform ${title}`;
        break;
      case GlyphPatternType.RITUAL:
        compiledString = `Execute ${title}`;
        break;
      default:
        compiledString = `Perform ${title}`;
    }
    
    // Add system information if available
    if (system) {
      compiledString += ` in ${system}`;
    }
    
    // Add parameters if available
    if (params && Object.keys(params).length > 0) {
      compiledString += ' with';
      
      Object.entries(params).forEach(([key, value], index) => {
        if (index > 0) compiledString += ',';
        
        if (key.startsWith('param')) {
          // For generic params, just add the value
          compiledString += ` "${value}"`;
        } else if (key === 'numeric') {
          // For numeric arrays
          (value as number[]).forEach((num, i) => {
            if (i > 0) compiledString += ' and';
            compiledString += ` ${num}`;
          });
        } else {
          // For named parameters
          compiledString += ` ${key}=${value}`;
        }
      });
    }
    
    return compiledString;
  }
}

// Export a singleton instance
export const glyphParser = new GlyphParser();
