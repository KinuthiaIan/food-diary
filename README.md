# Dee-Food-Diary-API-App
Nutritionix API Demo
This web application allows you to retrieve nutrition information for a given food query using the Nutritionix API. You can enter your query, click a button to fetch data, and view the results in a table format.

Getting Started
To use this application, follow these steps:

Clone the repository or download the source code to your local machine.

Open the index.html file in a web browser. This will load the application's user interface.

Usage
Enter your food query in the input field. For example, you can type something like "for breakfast I ate 2 eggs, bacon, and French toast."

Click the "Fetch Nutrition Data" button to submit your query to the Nutritionix API.

The application will display the nutrition information in a table below the input field. The table will include details such as the food image, quantity, unit, food name, calories, weight, and food group.

If the API returns no data for your query, the application will display a message indicating that no data was found.

Dependencies
This application uses the following technologies and libraries:

HTML: The structure of the web page.
CSS: Styling to make the user interface visually appealing.
JavaScript: Logic to handle user input, make API requests, and display data.
Nutritionix API: The application relies on the Nutritionix API to fetch nutrition data based on the user's query.
Configuration
Before using this application, you need to set up your Nutritionix API credentials:

Open the script.js file.

Locate the following lines of code:
const response = await fetchNutritionData(query);
 const url = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const timezone = "US/Eastern";

    const response = await fetch(url, { 
        method: "POST",
headers: {
"x-app-id": "b4cb39e4",
            "x-app-key": "1656db884715f400547a9ed900ad0132",
            "x-remote-user-id": "0",
            "Content-Type": "application/json"
},

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
The application was created as a demonstration of how to use the Nutritionix API to retrieve nutrition information.
Author;
Diana Gakuya
Email;deegakuya@gmail.com
