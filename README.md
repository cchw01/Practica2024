# Description

- This web app was made as a substitute or a small prototype for seeing, judging, buying and checking in online. The principal motive for this was for saving time when going at the airport and doing everything in lines full of people.
## How the app works?
- The app has two modules one is administrative and one is for clients that are interested in buying a ticket and proceeding to checkin
### The administrative module:
- Home Page (accesible for both admin and client) -> Search for your desired flight
- Flights Page -> manage the existing flights system
- Discounts Page -> manage the discounts for said flights
- Tickets -> See list of all tickets bought and created
- Aircraft -> Manage list of all aircraft available in the company
- Airport -> Manage list of all airports in relation with the flights
### The User module:
- Home page
- Flights -> See all available flights from present moment
- Checkin -> Effectuate the check in after buying the ticket
- Contact Page
### When trying to buy a ticket user will be redirected to register and login page for administrative purposes.

# How to use it as a newbie?
  - Enter the site, look for flights you might be interested in, make an account, login, buy the ticket and when going to the flight effectuate the check in for that flight.

# Requirements: Visual studio code, Microsoft Visual Studio, Node , Angular , SQL Server, SQL Server Management Studio 20.
## How to run:
### Backend :
- Open solution file Backend.sln
- NuGet Package Manager Install Microsoft.EntityFrameworkCore.SqlServer and Tools
- Go to Tools -> Nuget Package Manager -> Package Manager Console and run dotnet ef database update
### Frontend :
- Have angular and node installed and run ng serve inside visual studio terminal
## Go to port 4200 for the web app inside a web browser.
### App Diagram
  ![image](https://github.com/user-attachments/assets/de560441-419b-4e8b-ad87-38d0e8494cee)
