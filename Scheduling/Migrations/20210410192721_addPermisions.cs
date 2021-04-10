using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class addPermisions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Permisson",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPermissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermisionId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPermissions", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Permissions",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "canManageUsers" },
                    { 2, "isPartTime" }
                });

            migrationBuilder.InsertData(
                table: "UserPermissions",
                columns: new[] { "Id", "PermisionId", "UserId" },
                values: new object[,]
                {
                    { 3, 1, 1321313 },
                    { 4, 2, 13213133 },
                    { 5, 2, 1321313 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "UserPermissions");

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
    }
}
