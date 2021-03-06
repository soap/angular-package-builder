import { minify } from 'html-minifier';

/**
 * HTML Transformer
 */
export class HTMLTransformer {

    /**
     * Minify HTML
     *
     * @param   htmlContent HTML content
     * @returns             Minified HTML content
     */
    public static minify( htmlContent: string ): string {

        // Minify HTML, skip if empty
        if ( htmlContent.trim() === '' ) {
            return '';
        } else {
            try {

                return minify( htmlContent, htmlMinifierConfiguration )

                    // Remove any left-over line-breaks including indentation (leaving one space just to be sure)
                    // Example: Minify breaking attribute values such as very long SVG paths
                    // Inspired by: https://github.com/angular/material2/blob/master/tools/package-tools/inline-resources.ts#L55
                    .replace( /[\n\r]\s*/gm, ' ' )

                    // Escape single quotemarks, because they're getting used as the overall quotemarks
                    .replace( /'/g, "\'" );

            } catch( error ) {
                // Static message, as the actual error message does not contain any useful information
                throw new Error( 'HTML Parser: Parse error, the HTML seems to be invalid.' );
            }
        }

    }

}

/**
 * HTML Minifier Configuration
 */
export const htmlMinifierConfiguration: { [ options: string ]: string | boolean } = {
    caseSensitive: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: false,
    decodeEntities: true,
    html5: true,
    keepClosingSlash: false,
    maxLineLength: false,
    preserveLineBreaks: false,
    preventAttributesEscaping: false,
    processConditionalComments: false,
    quoteCharacter: '"',
    removeAttributeQuotes: false,
    removeComments: true,
    removeEmptyAttributes: true,
    removeEmptyElements: false,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeTagWhitespace: false,
    sortAttributes: true,
    sortClassName: true,
    trimCustomFragments: false,
    useShortDoctype: true
};
