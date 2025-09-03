describe("Editering av vin", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  it("kan ta bort ett vin", () => {
    cy.visit("/wines");

    cy.get("[data-testid=wine-row]").should("have.length", 3);

    cy.contains("Barolo Bricco")
      .parents("[data-testid=wine-row]")
      .find("button")
      .click();

    cy.contains("Barolo Bricco").should("not.exist");
    cy.get("[data-testid=wine-row]").should("have.length", 2);
  });
});
