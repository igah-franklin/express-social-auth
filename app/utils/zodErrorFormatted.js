const formatZodErrors = (zodError, extraMessage) => {
    const errorMessages = {};

    zodError.errors.forEach((error) => {
        const field = error.path[0]; // Get the field name
        errorMessages[field] = error.message; // Map the field to its error message
    });

    // Build the response message based on the errors
    if (Object.keys(errorMessages).length === 1) {
        const [field] = Object.keys(errorMessages);
        return errorMessages[field]; // Single field error
    }

    if (Object.keys(errorMessages).length > 1) {
        return extraMessage
    }
};



module.exports = { formatZodErrors }