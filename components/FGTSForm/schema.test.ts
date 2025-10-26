import schema from "./schema";

describe("Yup validation schema", () => {
  it("should validate correct data successfully", async () => {
    const validData = {
      name: "Eduardo",
      phone: "(48) 91234-5678",
      balance: "R$ 1.234,56",
      month: "October",
    };

    await expect(schema.validate(validData)).resolves.toEqual(validData);
  });

  it("should fail if name is missing or too short", async () => {
    await expect(
      schema.validate({
        name: "",
        phone: "1234567890",
        balance: "0",
        month: "Oct",
      })
    ).rejects.toThrow("Campo obrigatório");

    await expect(
      schema.validate({
        name: "Ed",
        phone: "1234567890",
        balance: "0",
        month: "Oct",
      })
    ).rejects.toThrow("Nome muito curto");
  });

  it("should fail if phone is invalid", async () => {
    const invalidPhones = ["123", "abcdefghij", "123456789012"];
    for (const phone of invalidPhones) {
      await expect(
        schema.validate({ name: "Eduardo", phone, balance: "0", month: "Oct" })
      ).rejects.toThrow("Telefone inválido");
    }
  });

  it("should fail if balance is negative or invalid", async () => {
    const invalidBalances = ["-100", "R$ -10,00", "abc"];
    for (const balance of invalidBalances) {
      await expect(
        schema.validate({
          name: "Eduardo",
          phone: "1234567890",
          balance,
          month: "Oct",
        })
      ).rejects.toThrow("Saldo inválido");
    }
  });

  it("should fail if month is missing", async () => {
    await expect(
      schema.validate({ name: "Eduardo", phone: "1234567890", balance: "0" })
    ).rejects.toThrow("Campo obrigatório");
  });
});
