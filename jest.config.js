module.exports = {
	clearMocks: true,
	coverageDirectory: "coverage",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jestSettings.js"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
	},
	moduleNameMapper: {
		"\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js",
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@mocks(.*)$": "<rootDir>/__mocks__$1",
		"^.+\\.(css|scss)$": "identity-obj-proxy",
	},
	transformIgnorePatterns: ["/node_modules/"],
};
