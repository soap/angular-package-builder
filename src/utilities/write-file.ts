import { outputFile } from 'fs-extra';

/**
 * Write content into a file, serializing JSON content automatically
 *
 * @param   filePath    Path to the file
 * @param   fileContent Content of the file
 * @returns             Promise, resolves when done
 */
export function writeFile( filePath: string, fileContent: string | Object ): Promise<void> {
	return new Promise<void>( ( resolve: () => void, reject: ( error: Error ) => void ) => {

		// Automatically stringify objects
		const preparedFileContent: string = typeof fileContent === 'string'
			? fileContent
			: `${ JSON.stringify( fileContent, null, '	' ) }\n`; // Indentation using tabs, empty line at the end

		// Write file asynchronously, create the file and directory structure if necessary
		outputFile( filePath, preparedFileContent, 'utf-8', ( writeFileError: NodeJS.ErrnoException | null ) => {

			// Handle errors
			if ( writeFileError ) {
				reject( new Error( `An error occured while reading the file "${ filePath }". [Code "${ writeFileError.code }", Number "${ writeFileError.errno }"]` ) );
				return;
			}

			resolve();

		} );

	} );
}
