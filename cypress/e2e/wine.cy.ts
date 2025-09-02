describe("Wine Journal", () => {
  beforeEach(() => {
    cy.request("POST", "/api/test/reset");
    cy.visit("/");
  });

  it("ska visa tre seedade viner som standard", () => {
    cy.get("[data-testid=wine-row]").should("have.length", 3);
    cy.contains("Barolo Bricco").should("exist");
    cy.contains("Sancerre Blanc").should("exist");
    cy.contains("Cava Brut Nature").should("exist");
  });

  it("ska kunna lägga till ett nytt vin", () => {
    cy.get("[data-testid=name]").type("Testvin 123");
    cy.get("[data-testid=country]").type("Sverige");
    cy.get("[data-testid=grape]").type("Cabernet");
    cy.get("[data-testid=type]").select("Rött");
    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=feedback]").should("have.class", "success");
    cy.get("[data-testid=wine-row]").should("have.length", 4);
    cy.contains("Testvin 123").should("exist");
  });

  it("ska ge fel vid tomt formulär", () => {
    cy.get("[data-testid=submit]").click();
    cy.get("[data-testid=feedback]").should("have.class", "error");
  });

  it("ska hindra dubbletter", () => {
    cy.get("[data-testid=name]").type("Barolo Bricco");
    cy.get("[data-testid=country]").type("Italien");
    cy.get("[data-testid=grape]").type("Nebbiolo");
    cy.get("[data-testid=type]").select("Rött");
    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=feedback]")
      .should("have.class", "error")
      .and("contain", "redan");
  });

  it("ska kunna ta bort ett vin", () => {
    cy.contains("Barolo Bricco")
      .parents("[data-testid=wine-row]")
      .find("button")
      .click();

    cy.contains("Barolo Bricco").should("not.exist");
    cy.get("[data-testid=wine-row]").should("have.length", 2);
  });
});
