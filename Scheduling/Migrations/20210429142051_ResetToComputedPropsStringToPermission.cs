using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class ResetToComputedPropsStringToPermission : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPermissions_Permissions_PermissionId",
                table: "UserPermissions");

            migrationBuilder.DropForeignKey(
                name: "FK_UserPermissions_Users_UserId",
                table: "UserPermissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserPermissions",
                table: "UserPermissions");

            migrationBuilder.DropIndex(
                name: "IX_UserPermissions_PermissionId",
                table: "UserPermissions");

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

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "UserPermissions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

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

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserPermissions",
                table: "UserPermissions",
                column: "Id");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserPermissions",
                table: "UserPermissions");

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

            migrationBuilder.DeleteData(
                table: "UserPermissions",
                keyColumn: "Id",
                keyValue: 5);

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

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "UserPermissions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Permissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserPermissions",
                table: "UserPermissions",
                columns: new[] { "UserId", "PermissionId" });

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

            migrationBuilder.InsertData(
                table: "UserPermissions",
                columns: new[] { "PermissionId", "UserId", "Id" },
                values: new object[] { 5, 1321313, 5 });

            migrationBuilder.CreateIndex(
                name: "IX_UserPermissions_PermissionId",
                table: "UserPermissions",
                column: "PermissionId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPermissions_Permissions_PermissionId",
                table: "UserPermissions",
                column: "PermissionId",
                principalTable: "Permissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPermissions_Users_UserId",
                table: "UserPermissions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
