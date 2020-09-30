import { EFormError, validateForm } from "./validateForm";

describe("test validation", () => {
	it("Required name", () => {
		expect(validateForm({ email: "op@mail.ru", name: "" })).toStrictEqual({
			name: EFormError.REQUIRED,
		});
	});
});
