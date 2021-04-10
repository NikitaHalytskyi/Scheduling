using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class updateDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Permisson",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1321313,
                column: "Permisson",
                value: "canManageUsers;isPartTime");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 13213133,
                column: "Permisson",
                value: "canManageUsers;isPartTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Permisson",
                table: "Users");
        }
    }
}
