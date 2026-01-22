export type LogFormat = 'ascii' | 'hex' | 'dec';

export class BufferUtils{
    public static Log(text:string, buffer: Uint8Array, position: number, format: LogFormat = 'ascii') {
        const lines: string[] = [];
        lines.push(text);
        let currentLine: string[] = [];
        let lineStartOffset = 0;
        
        for (let i = 0; i < buffer.length; i++) {
            // Start a new line - add offset prefix
            if (i % 16 === 0) {
                lineStartOffset = i;
            }
            
            // Add position marker before the current position byte
            if (i === position) {
                // Finalize current line if it has content
                if (currentLine.length > 0) {
                    lines.push(lineStartOffset.toString().padStart(4, '0') + ': ' + currentLine.join(''));
                    currentLine = [];
                }
                
                // Add marker line with offset prefix spacing
                const bytesBeforeInLine = i % 16;
                const offsetWidth = 6; // 4 digits + ": "
                const spaces = bytesBeforeInLine * 3 + (bytesBeforeInLine > 8 ? 1 : 0);
                lines.push(' '.repeat(offsetWidth) + ' '.repeat(spaces) + '=>');
                
                // Update lineStartOffset for the new line starting at position
                lineStartOffset = i - (i % 16);
            }
            
            const byte = buffer[i];
            const ascii = byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.';
            const hex = byte.toString(16).padStart(2, '0');
            const dec = byte.toString(10).padStart(3, ' ');
            
            // Format byte based on selected format
            let formattedByte: string;
            switch (format) {
                case 'ascii':
                    formattedByte = ascii;
                    break;
                case 'hex':
                    formattedByte = `${hex}`;
                    break;
                case 'dec':
                    formattedByte = `${dec}`;
                    break;
            }
            
            // Add byte with spacing
            currentLine.push(formattedByte);
            currentLine.push(' ');
            
            // Add extra space after 8th byte
            if ((i + 1) % 16 === 8) {
                currentLine.push(' ');
            }
            
            // New line after 16 bytes
            if ((i + 1) % 16 === 0) {
                lines.push(lineStartOffset.toString().padStart(4, '0') + ': ' + currentLine.join(''));
                currentLine = [];
            }
        }
        
        // Add remaining bytes if any (only if position is not at the end)
        if (position < buffer.length && currentLine.length > 0) {
            lines.push(lineStartOffset.toString().padStart(4, '0') + ': ' + currentLine.join(''));
        }
        
        // Add position and length information
        lines.push('');
        lines.push(`Position: ${position}, Length: ${buffer.length}`);
        
        console.log(lines.join('\n'));
    }
}