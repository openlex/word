import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import serializer from "jest-emotion";

const fetch = require("jest-fetch-mock");

jest.setMock("node-fetch", fetch);
Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(serializer);
