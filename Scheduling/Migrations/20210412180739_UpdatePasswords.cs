using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class UpdatePasswords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1321313,
                column: "Password",
                value: "5dj3bhWCfxuHmONkBdvFrA==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 13213133,
                column: "Password",
                value: "u9DAYiHl+liIqRMvuuciBA==");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1321313,
                column: "Password",
                value: "yZFts5ive5Fl+fWw5FoH7A==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 13213133,
                column: "Password",
                value: "gdR8Hyv4h8sV5WBeqgbZ3A==");
        }
    }
}
