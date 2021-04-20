using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class AddVacationRequests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VacationRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FinishDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacationRequests", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "VacationRequests",
                columns: new[] { "Id", "Comment", "FinishDate", "StartDate", "Status", "UserId" },
                values: new object[] { 1, "I want to see a bober.", new DateTime(2021, 5, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 4, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Declined. Declined by PM. Declined by TL.", 13213133 });

            migrationBuilder.InsertData(
                table: "VacationRequests",
                columns: new[] { "Id", "Comment", "FinishDate", "StartDate", "Status", "UserId" },
                values: new object[] { 2, "I really want to see a bober.", new DateTime(2021, 4, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 4, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "Declined. Declined by PM. Declined by TL.", 13213133 });

            migrationBuilder.InsertData(
                table: "VacationRequests",
                columns: new[] { "Id", "Comment", "FinishDate", "StartDate", "Status", "UserId" },
                values: new object[] { 3, "Please, it`s my dream to see a bober.", new DateTime(2021, 4, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2021, 4, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pending consideration...", 13213133 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VacationRequests");
        }
    }
}
