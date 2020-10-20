import React from "react";
import { Header } from "@components";
import { text, withKnobs } from "@storybook/addon-knobs";
import { Provider } from "react-redux";
import { store } from "@/store";
import { userSlice } from '@modules';

export default {
	title: "Хэдер страницы",
	components: Header,
	decorators: [withKnobs],
};

const HeaderComp = () => (
	<Provider store={store}>
		<Header />
	</Provider>
);

export const defaultHeader = () => <HeaderComp />;

defaultHeader.story = {
	name: "Хэдер для неавторизованного пользователя",
};

export const headerLoggedOut = () => {
	store.dispatch(userSlice.actions.add({name: text('Имя пользователя',  'Эдуардро')}))
	return <HeaderComp />;
}

headerLoggedOut.story = {
	name: "Хэдер для авторизованного пользователя",
};
