using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class ComputedPropsDeleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Permissions_ComputedProps_ComputedPropsId",
                table: "Permissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Teams_ComputedProps_ComputedPropsId",
                table: "Teams");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_ComputedProps_ComputedPropsId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "ComputedProps");

            migrationBuilder.DropIndex(
                name: "IX_Teams_ComputedPropsId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Permissions_ComputedPropsId",
                table: "Permissions");

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DropColumn(
                name: "ComputedPropsId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "ComputedPropsId",
                table: "Permissions");

            migrationBuilder.RenameColumn(
                name: "ComputedPropsId",
                table: "Users",
                newName: "TeamId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_ComputedPropsId",
                table: "Users",
                newName: "IX_Users_TeamId");

            migrationBuilder.RenameColumn(
                name: "PermisionId",
                table: "UserPermissions",
                newName: "PermissionId");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Permissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "PermissionUser",
                columns: table => new
                {
                    PermissionsId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionUser", x => new { x.PermissionsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_PermissionUser_Permissions_PermissionsId",
                        column: x => x.PermissionsId,
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PermissionUser_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "VacationApprovals");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "PartTime");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 4,
                column: "Name",
                value: "FullTime");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 5,
                column: "Name",
                value: "UserManagement");

            migrationBuilder.UpdateData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 5,
                column: "PermissionId",
                value: 5);

            migrationBuilder.CreateIndex(
                name: "IX_PermissionUser_UsersId",
                table: "PermissionUser",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "PermissionUser");

            migrationBuilder.RenameColumn(
                name: "TeamId",
                table: "Users",
                newName: "ComputedPropsId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_TeamId",
                table: "Users",
                newName: "IX_Users_ComputedPropsId");

            migrationBuilder.RenameColumn(
                name: "PermissionId",
                table: "UserPermissions",
                newName: "PermisionId");

            migrationBuilder.AddColumn<int>(
                name: "ComputedPropsId",
                table: "Teams",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Permissions",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "ComputedPropsId",
                table: "Permissions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ComputedProps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComputedProps", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Access to vacation approvals");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Part-time");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 4,
                column: "Name",
                value: "Full-time");

            migrationBuilder.UpdateData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 5,
                column: "Name",
                value: "Access to team management");

            migrationBuilder.InsertData(
                table: "Permissions",
                columns: new[] { "Id", "ComputedPropsId", "Name" },
                values: new object[] { 6, null, "Access to global management" });

            migrationBuilder.UpdateData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 5,
                column: "PermisionId",
                value: 6);

            migrationBuilder.CreateIndex(
                name: "IX_Teams_ComputedPropsId",
                table: "Teams",
                column: "ComputedPropsId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_ComputedPropsId",
                table: "Permissions",
                column: "ComputedPropsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Permissions_ComputedProps_ComputedPropsId",
                table: "Permissions",
                column: "ComputedPropsId",
                principalTable: "ComputedProps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_ComputedProps_ComputedPropsId",
                table: "Teams",
                column: "ComputedPropsId",
                principalTable: "ComputedProps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_ComputedProps_ComputedPropsId",
                table: "Users",
                column: "ComputedPropsId",
                principalTable: "ComputedProps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
