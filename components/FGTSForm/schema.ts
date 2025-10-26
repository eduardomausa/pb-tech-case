import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Campo obrigatório")
    .min(3, "Nome muito curto"),
  phone: yup
    .string()
    .required("Campo obrigatório")
    .test("is-br-phone", "Telefone inválido", (val) => {
      if (!val) return false;
      const digits = val.replace(/\D/g, "");
      return digits.length === 10 || digits.length === 11;
    }),
  balance: yup
    .string()
    .required("Campo obrigatório")
    .test("is-positive-currency", "Saldo inválido", (val) => {
      if (!val) return false;
      const normalized = val.replace(/[R$\s.]/g, "").replace(",", ".");
      const parsed = parseFloat(normalized);
      return !Number.isNaN(parsed) && parsed >= 0;
    }),
  month: yup.string().required("Campo obrigatório"),
});

export default schema;
