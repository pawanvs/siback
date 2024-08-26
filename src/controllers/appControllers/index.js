// Importing the createCRUDController middleware to generate default CRUD controllers for models
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

// Importing routesList, which contains mappings between models and their controllers
const { routesList } = require('@/models/utils');

// Importing globSync to match file patterns and path to work with file paths
const { globSync } = require('glob');
const path = require('path');

// Define the pattern to match directories under the appControllers folder
const pattern = './src/controllers/appControllers/*/**/';

// Retrieve the list of directories within the appControllers folder
const controllerDirectories = globSync(pattern).map((filePath) => {
  return path.basename(filePath);
});



// Function to load and return all controllers for the application
const appControllers = () => {
  const controllers = {}; // Initialize an empty object to hold all controllers
  const hasCustomControllers = []; // List to track controllers that have custom implementations

  // Loop through each controller directory to check if a custom controller exists
  controllerDirectories.forEach((controllerName) => {
    try {
      // Attempt to load the custom controller module
      const customController = require('@/controllers/appControllers/' + controllerName);

      // If a custom controller is found, add it to the controllers object
      if (customController) {
        hasCustomControllers.push(controllerName);
        controllers[controllerName] = customController;
      }
    } catch (err) {
      // Throw an error if there is an issue loading the custom controller
      throw new Error(err.message);
    }
  });


  // Loop through the routesList to create CRUD controllers for models without custom controllers
  routesList.forEach(({ modelName, controllerName }) => {
    // If no custom controller exists for the model, create a default CRUD controller
    if (!hasCustomControllers.includes(controllerName)) {
      controllers[controllerName] = createCRUDController(modelName);
    }
  });

  console.log(controllers["noteController"]);

  return controllers; // Return the controllers object containing all loaded controllers
};

// Export the appControllers function, which returns all controllers
module.exports = appControllers();
