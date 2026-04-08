describe("Betyg / recension", () => {
  beforeEach(() => {
    cy.task("reseed");
    cy.intercept("POST", "/api/wines").as("createWine");
  });

  const setRating = (n: 1 | 2 | 3 | 4 | 5) => {
    cy.get("body").then(($body) => {
      const starButton = $body.find('[data-testid^="star-"]');
      if (starButton.length) {
        cy.get(`[data-testid=star-${n}]`).click();
      } else {
        cy.get("[data-testid=rating]").select(String(n));
      }
    });
  };

  const fillRequired = () => {
    cy.get("[data-testid=name]").type("Recensionsvin");
    cy.get("[data-testid=country]").type("Sverige");
    cy.get("[data-testid=grape]").type("Cabernet");
    cy.get("[data-testid=type]").select("Rött");
    cy.get("[data-testid=notes]").type("Mörk frukt, pepprig, bra struktur.");
  };

  it("sparar betyg 5 och visar ★★★★★ i listan", () => {
    cy.visit("/wines/new");
    fillRequired();
    setRating(5);

    cy.get("[data-testid=submit]").click();
    cy.wait("@createWine").its("response.statusCode").should("eq", 201);

    cy.location("pathname", { timeout: 10000 }).should("eq", "/wines");
    cy.contains("Recensionsvin").should("exist");
    cy.contains("★★★★★").should("exist");
  });

  it("sparar betyg 3 och visar ★★★☆☆ i listan", () => {
    cy.visit("/wines/new");
    fillRequired();
    setRating(3);

    cy.get("[data-testid=submit]").click();
    cy.wait("@createWine").its("response.statusCode").should("eq", 201);

    cy.location("pathname").should("eq", "/wines");
    cy.contains("Recensionsvin").should("exist");
    cy.contains("★★★☆☆").should("exist");
  });
});
