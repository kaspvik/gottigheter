describe("Lägga till och ta bort vin", () => {
  beforeEach(() => {
    cy.task("reseed");
    cy.visit("/");
  });

  const fillForm = (
    overrides: Partial<
      Record<"name" | "country" | "grape" | "type", string>
    > = {}
  ) => {
    const data = {
      name: "Testvin 123",
      country: "Sverige",
      grape: "Cabernet",
      type: "Rött",
      ...overrides,
    };
    if (data.name !== undefined)
      cy.get("[data-testid=name]").clear().type(data.name);
    if (data.country !== undefined)
      cy.get("[data-testid=country]").clear().type(data.country);
    if (data.grape !== undefined)
      cy.get("[data-testid=grape]").clear().type(data.grape);
    if (data.type !== undefined) cy.get("[data-testid=type]").select(data.type);
  };

  it("kan lägga till ett nytt vin", () => {
    cy.get("[data-testid=wine-row]").should("have.length", 3);

    fillForm();
    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=feedback]").should("have.class", "success");
    cy.get("[data-testid=wine-row]").should("have.length", 4);
    cy.contains("Testvin 123").should("exist");
  });

  it("ger fel om ett obligatoriskt fält saknas", () => {
    fillForm({ type: "" });
    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=feedback]")
      .should("have.class", "error")
      .and("contain", "Fyll i alla fält");
  });

  it("kan ta bort ett vin", () => {
    cy.contains("Barolo Bricco")
      .parents("[data-testid=wine-row]")
      .find("button")
      .click();

    cy.contains("Barolo Bricco").should("not.exist");
    cy.get("[data-testid=wine-row]").should("have.length", 2);
  });
});
