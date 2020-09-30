import { validateEmail } from "@/utils/validateEmail";

describe("test validation", () => {
	it("should contain @", () => {
		expect(validateEmail("1#r.ru")).toEqual(false);
		expect(validateEmail("1@r.ru")).toEqual(true);
	});
	it("should has domen", () => {
		expect(validateEmail("user@mail")).toEqual(false);
		expect(validateEmail("user@mail.ru")).toEqual(true);
		expect(validateEmail("user@mail.com")).toEqual(true);
	});
	it("only latin letter", () => {
		expect(validateEmail("имя@почта")).toEqual(false);
		expect(validateEmail("им$#я@почта")).toEqual(false);
		expect(validateEmail("имя@по-чта")).toEqual(false);
	});
});
