describe("Lägga till vin", () => {
  beforeEach(() => {
    cy.task("reseed");
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
    cy.visit("/wines/new");

    cy.intercept("POST", "/api/wines").as("createWine");

    cy.get("[data-testid=name]").type("Testvin 123");
    cy.get("[data-testid=country]").type("Sverige");
    cy.get("[data-testid=grape]").type("Cabernet");
    cy.get("[data-testid=type]").select("Rött");
    cy.get("[data-testid=notes]").type("Mörk frukt, pepprig, bra struktur.");
    cy.get("[data-testid=rating]").select("5");

    cy.get("[data-testid=submit]").click();

    cy.wait("@createWine").its("response.statusCode").should("eq", 201);

    cy.location("pathname", { timeout: 10000 }).should("eq", "/wines");

    cy.get("[data-testid=wine-row]", { timeout: 10000 }).should(
      "have.length",
      4
    );
    cy.contains("Testvin 123").should("exist");
    cy.contains("★★★★★").should("exist");
  });

  it("visar fel och sparar inte om ett obligatoriskt fält saknas", () => {
    cy.visit("/wines/new");

    cy.intercept("POST", "/api/wines").as("createWine");

    cy.get("[data-testid=name]").type("Ofullständigt Vin");
    cy.get("[data-testid=country]").type("Sverige");
    cy.get("[data-testid=grape]").type("Cabernet");

    cy.get("[data-testid=submit]").click();

    cy.get("[data-testid=feedback]")
      .should("have.class", "error")
      .and("contain", "Fyll i alla fält");

    cy.location("pathname").should("eq", "/wines/new");

    cy.get("@createWine.all").should("have.length", 0);
  });
});
