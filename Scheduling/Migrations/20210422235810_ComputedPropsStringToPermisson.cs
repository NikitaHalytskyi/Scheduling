using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduling.Migrations
{
    public partial class ComputedPropsStringToPermisson : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ComputedPropsId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ComputedPropsId",
                table: "Teams",
                type: "int",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Users_ComputedPropsId",
                table: "Users",
                column: "ComputedPropsId");

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

            migrationBuilder.DropIndex(
                name: "IX_Users_ComputedPropsId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Teams_ComputedPropsId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Permissions_ComputedPropsId",
                table: "Permissions");

            migrationBuilder.DropColumn(
                name: "ComputedPropsId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ComputedPropsId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "ComputedPropsId",
                table: "Permissions");
        }
    }
}
