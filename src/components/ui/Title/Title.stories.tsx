import React from "react";
import { Title } from "@components";
import { number, text, withKnobs } from "@storybook/addon-knobs";

export default {
	title: "ui/Заголовки",
	component: Title,
	decorators: [withKnobs],
};

export const DefaultTitle = () => {
	return (
		<Title level={number("уровень", 1)}>
			{text("Заголовок", "Загловок")}
		</Title>
	);
};

export const Title1 = () => {
	return (
		<Title level={1}>
			{text("Загловок первого уровня", "Загловок первого уровня")}
		</Title>
	);
};

export const Title2 = () => {
	return (
		<Title level={2}>
			{text("Загловок второго уровня", "Загловок второго уровня")}
		</Title>
	);
};

export const Title3 = () => {
	return (
		<Title level={3}>
			{text("Загловок третьего уровня", "Загловок третьего уровня")}
		</Title>
	);
};

export const Title4 = () => {
	return (
		<Title level={4}>
			{text("Загловок четвертого уровня", "Загловок четвертого уровня")}
		</Title>
	);
};
