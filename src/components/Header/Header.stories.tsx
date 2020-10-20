import React from "react";
import { Header } from "@components";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Provider } from 'react-redux';
import { store } from '@/store';

export default {
	title: "Хэдер страницы",
	components: Header,
	decorators: [withKnobs],
};


const HeaderComp = () => <Provider store={store}><Header/></Provider>

export const defaultHeader = () => <HeaderComp/>;

// defaultHeader.story = {
// 	name: "Хэдер для авторизованного пользователя",
// };
//
// export const headerLoggedOut = () => (
// 	<Header user="" onLogOut={action("logOut")} />
// );
//
// headerLoggedOut.story = {
// 	name: "Хэдер для неавторизованного пользователя",
// };
