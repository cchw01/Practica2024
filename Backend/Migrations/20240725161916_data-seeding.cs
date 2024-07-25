using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class dataseeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aircrafts",
                columns: table => new
                {
                    AircraftId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Maker = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumberOfSeats = table.Column<int>(type: "int", nullable: false),
                    AutonomyInHours = table.Column<int>(type: "int", nullable: false),
                    MaxCargo = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aircrafts", x => x.AircraftId);
                });

            migrationBuilder.CreateTable(
                name: "Airports",
                columns: table => new
                {
                    AirportId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AirportName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Airports", x => x.AirportId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    FlightNumber = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepartingAirportId = table.Column<int>(type: "int", nullable: false),
                    DestinationAirportId = table.Column<int>(type: "int", nullable: false),
                    AircraftId = table.Column<int>(type: "int", nullable: false),
                    DepartingTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FlightTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FlightCost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.FlightNumber);
                    table.ForeignKey(
                        name: "FK_Flights_Aircrafts_AircraftId",
                        column: x => x.AircraftId,
                        principalTable: "Aircrafts",
                        principalColumn: "AircraftId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Flights_Airports_DepartingAirportId",
                        column: x => x.DepartingAirportId,
                        principalTable: "Airports",
                        principalColumn: "AirportId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Flights_Airports_DestinationAirportId",
                        column: x => x.DestinationAirportId,
                        principalTable: "Airports",
                        principalColumn: "AirportId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    DiscountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DiscountName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiscountDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FlightId = table.Column<int>(type: "int", nullable: false),
                    DiscountPercentage = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.DiscountId);
                    table.ForeignKey(
                        name: "FK_Discounts_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "FlightNumber",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    TicketId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FlightId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Luggage = table.Column<bool>(type: "bit", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.TicketId);
                    table.ForeignKey(
                        name: "FK_Tickets_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "FlightNumber",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CheckIns",
                columns: table => new
                {
                    CheckInId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketId = table.Column<int>(type: "int", nullable: false),
                    PassengerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdDocumentType = table.Column<int>(type: "int", nullable: false),
                    DocumentData = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CheckInStatus = table.Column<bool>(type: "bit", nullable: false),
                    PassengerEmail = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckIns", x => x.CheckInId);
                    table.ForeignKey(
                        name: "FK_CheckIns_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "TicketId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Aircrafts",
                columns: new[] { "AircraftId", "AutonomyInHours", "Maker", "MaxCargo", "Model", "NumberOfSeats", "RegistrationNumber" },
                values: new object[,]
                {
                    { 1, 7, "Boeing", 20700.0, "737-800", 189, "YR-BGH" },
                    { 2, 7, "Airbus", 22000.0, "A320", 160, "LZ-BHF" },
                    { 3, 7, "Boeing", 20700.0, "737 MAX 8", 200, "EI-GTA" },
                    { 4, 7, "Airbus", 25000.0, "A321neo", 236, "D-AVZO" },
                    { 5, 14, "Boeing", 22400.0, "777-300ER", 396, "G-STBD" },
                    { 6, 15, "Airbus", 30000.0, "A350-900", 325, "F-WXWB" },
                    { 7, 14, "Boeing", 28000.0, "787-9", 290, "SP-LSC" },
                    { 8, 10, "Airbus", 33000.0, "A330-300", 277, "EI-EDY" },
                    { 9, 15, "Boeing", 34000.0, "747-400", 416, "HZ-AI3" },
                    { 10, 16, "Airbus", 37500.0, "A380", 516, "A6-EDA" }
                });

            migrationBuilder.InsertData(
                table: "Airports",
                columns: new[] { "AirportId", "AirportName", "Location" },
                values: new object[,]
                {
                    { 1, "OTP", "Bucharest, Romania" },
                    { 2, "BCN", "Barcelona, Spain" },
                    { 3, "CDG", "Paris, France" },
                    { 4, "FRA", "Frankfurt, Germany" },
                    { 5, "LHR", "London, United Kingdom" },
                    { 6, "FCO", "Rome, Italy" },
                    { 7, "AMS", "Amsterdam, Netherlands" },
                    { 8, "VIE", "Vienna, Austria" },
                    { 9, "ATH", "Athens, Greece" },
                    { 10, "WAW", "Warsaw, Poland" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "EmailAddress", "Name", "Password", "Role" },
                values: new object[,]
                {
                    { 1, "admin@wateryairlines.com", "John Doe", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", "admin" },
                    { 2, "user@wateryairlines.com", "Jane Smith", "04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb", "passenger" }
                });

            migrationBuilder.InsertData(
                table: "Flights",
                columns: new[] { "FlightNumber", "AircraftId", "DepartingAirportId", "DepartingTime", "DestinationAirportId", "FlightCost", "FlightTime" },
                values: new object[,]
                {
                    { 1, 1, 1, new DateTime(2024, 8, 10, 6, 0, 0, 0, DateTimeKind.Unspecified), 2, 200, new DateTime(2024, 8, 10, 8, 30, 0, 0, DateTimeKind.Unspecified) },
                    { 2, 2, 3, new DateTime(2024, 10, 15, 9, 0, 0, 0, DateTimeKind.Unspecified), 4, 100, new DateTime(2024, 10, 15, 10, 15, 0, 0, DateTimeKind.Unspecified) },
                    { 3, 3, 5, new DateTime(2024, 12, 21, 16, 0, 0, 0, DateTimeKind.Unspecified), 6, 300, new DateTime(2024, 12, 21, 20, 45, 0, 0, DateTimeKind.Unspecified) },
                    { 4, 4, 1, new DateTime(2024, 8, 10, 12, 30, 0, 0, DateTimeKind.Unspecified), 2, 200, new DateTime(2024, 8, 10, 15, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, 5, 9, new DateTime(2025, 3, 5, 13, 45, 0, 0, DateTimeKind.Unspecified), 10, 250, new DateTime(2025, 3, 5, 17, 15, 0, 0, DateTimeKind.Unspecified) },
                    { 6, 6, 2, new DateTime(2024, 9, 25, 7, 0, 0, 0, DateTimeKind.Unspecified), 1, 175, new DateTime(2024, 9, 25, 9, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, 7, 4, new DateTime(2024, 8, 29, 19, 0, 0, 0, DateTimeKind.Unspecified), 3, 115, new DateTime(2024, 8, 29, 20, 45, 0, 0, DateTimeKind.Unspecified) },
                    { 8, 8, 6, new DateTime(2024, 11, 16, 20, 30, 0, 0, DateTimeKind.Unspecified), 5, 320, new DateTime(2024, 11, 17, 1, 45, 0, 0, DateTimeKind.Unspecified) },
                    { 9, 9, 8, new DateTime(2025, 2, 14, 6, 15, 0, 0, DateTimeKind.Unspecified), 7, 180, new DateTime(2025, 2, 14, 8, 35, 0, 0, DateTimeKind.Unspecified) },
                    { 10, 10, 10, new DateTime(2025, 4, 28, 21, 0, 0, 0, DateTimeKind.Unspecified), 9, 275, new DateTime(2025, 4, 29, 0, 50, 0, 0, DateTimeKind.Unspecified) },
                    { 11, 1, 1, new DateTime(2024, 9, 28, 8, 30, 0, 0, DateTimeKind.Unspecified), 10, 160, new DateTime(2024, 9, 28, 10, 45, 0, 0, DateTimeKind.Unspecified) },
                    { 12, 2, 2, new DateTime(2024, 10, 3, 14, 15, 0, 0, DateTimeKind.Unspecified), 9, 90, new DateTime(2024, 10, 3, 15, 15, 0, 0, DateTimeKind.Unspecified) },
                    { 13, 3, 3, new DateTime(2024, 12, 8, 9, 0, 0, 0, DateTimeKind.Unspecified), 8, 285, new DateTime(2024, 12, 8, 12, 45, 0, 0, DateTimeKind.Unspecified) },
                    { 14, 4, 4, new DateTime(2025, 1, 22, 16, 45, 0, 0, DateTimeKind.Unspecified), 7, 210, new DateTime(2025, 1, 22, 19, 20, 0, 0, DateTimeKind.Unspecified) },
                    { 15, 5, 5, new DateTime(2025, 3, 30, 11, 0, 0, 0, DateTimeKind.Unspecified), 6, 260, new DateTime(2025, 3, 30, 15, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 16, 6, 6, new DateTime(2024, 9, 30, 5, 30, 0, 0, DateTimeKind.Unspecified), 5, 190, new DateTime(2024, 9, 30, 8, 15, 0, 0, DateTimeKind.Unspecified) },
                    { 17, 7, 7, new DateTime(2024, 11, 12, 10, 0, 0, 0, DateTimeKind.Unspecified), 4, 120, new DateTime(2024, 11, 12, 11, 30, 0, 0, DateTimeKind.Unspecified) },
                    { 18, 8, 8, new DateTime(2025, 2, 1, 15, 15, 0, 0, DateTimeKind.Unspecified), 3, 240, new DateTime(2025, 2, 1, 18, 25, 0, 0, DateTimeKind.Unspecified) },
                    { 19, 9, 9, new DateTime(2025, 4, 17, 22, 30, 0, 0, DateTimeKind.Unspecified), 2, 175, new DateTime(2025, 4, 17, 23, 55, 0, 0, DateTimeKind.Unspecified) },
                    { 20, 10, 10, new DateTime(2025, 5, 12, 18, 0, 0, 0, DateTimeKind.Unspecified), 1, 290, new DateTime(2025, 5, 12, 21, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Discounts",
                columns: new[] { "DiscountId", "DiscountDescription", "DiscountName", "DiscountPercentage", "EndDate", "FlightId", "StartDate" },
                values: new object[,]
                {
                    { 1, "Catch the summer rays! Book now and get 20% off!", "Summer Sun", 20, new DateTime(2024, 8, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, new DateTime(2024, 7, 16, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "Festival season is here! Enjoy 15% off your flight!", "Summer Festival", 15, new DateTime(2025, 6, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, new DateTime(2025, 6, 8, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, "Enjoy the beauty of autumn with 10% off!", "Autumn Colors", 10, new DateTime(2025, 6, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, new DateTime(2025, 5, 25, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, "Discover winter magic with 20% off!", "Winter Wonderland", 20, new DateTime(2024, 12, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, new DateTime(2024, 12, 14, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, "Ring in the new year with travel! Enjoy 25% off!", "New Year New Travels", 25, new DateTime(2025, 1, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, new DateTime(2025, 1, 3, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, "Celebrate spring with a special 15% off on flights!", "Spring Blossom", 15, new DateTime(2025, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, new DateTime(2025, 2, 26, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, "Hop into savings this Easter with 10% off!", "Easter Getaway", 10, new DateTime(2025, 4, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, new DateTime(2025, 3, 18, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 8, "Escape the spooky season with 15% off!", "Halloween Escape", 15, new DateTime(2024, 10, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, new DateTime(2024, 10, 8, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Tickets",
                columns: new[] { "TicketId", "FlightId", "Luggage", "Price", "UserId" },
                values: new object[,]
                {
                    { 1, 1, true, 135f, 2 },
                    { 2, 2, false, 85f, 2 },
                    { 3, 3, true, 255f, 2 },
                    { 4, 4, false, 150f, 2 },
                    { 5, 5, true, 212.5f, 2 }
                });

            migrationBuilder.InsertData(
                table: "CheckIns",
                columns: new[] { "CheckInId", "CheckInStatus", "DocumentData", "IdDocumentType", "PassengerEmail", "PassengerName", "TicketId" },
                values: new object[,]
                {
                    { 1, true, "DL12345678", 2, "user@wateryairlines.com", "Jane Smith", 2 },
                    { 2, true, "IC987654321", 0, "user@wateryairlines.com", "Jane Smith", 3 },
                    { 3, true, "Passport223344", 1, "user@wateryairlines.com", "Jane Smith", 4 },
                    { 4, true, "DL22334455", 2, "user@wateryairlines.com", "Jane Smith", 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CheckIns_TicketId",
                table: "CheckIns",
                column: "TicketId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Discounts_FlightId",
                table: "Discounts",
                column: "FlightId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flights_AircraftId",
                table: "Flights",
                column: "AircraftId");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_DepartingAirportId",
                table: "Flights",
                column: "DepartingAirportId");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_DestinationAirportId",
                table: "Flights",
                column: "DestinationAirportId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_FlightId",
                table: "Tickets",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_UserId",
                table: "Tickets",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CheckIns");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Flights");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Aircrafts");

            migrationBuilder.DropTable(
                name: "Airports");
        }
    }
}
