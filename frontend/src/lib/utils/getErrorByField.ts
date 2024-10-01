interface ErrorObject {
	field: string;
	message: string;
}


export function getErrorByField(errors: ErrorObject[] | null | undefined, fieldName: string): string | null {
	// Check if errors is null or undefined
	if (!errors) {
	  return null;
	}
  
	// Find the first error object that matches the given field name
	const error = errors.find(error => error.field === fieldName);
	
	// Return the message if found, otherwise return null
	return error ? error.message : null;
  }