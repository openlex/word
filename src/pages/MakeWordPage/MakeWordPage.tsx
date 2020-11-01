import * as React from "react";
import { WordList } from "@/modules/Words";
import { PlayerAvatar } from "@/components";
import { colors } from "@/styles";
import { DynamicModuleLoader } from "redux-dynamic-modules";
import { getUserModule, authOnlyHOC } from "@/modules/User";

export const MakeWordPage = authOnlyHOC(() => {
	return (
		<DynamicModuleLoader modules={[getUserModule()]}>
			<PlayerAvatar
				size={100}
				pic={
					"https://image.freepik.com/free-vector/hand-drawn-style-bear-head-for-illustration-design-element_116205-88.jpg"
				}
				color={colors.red}
			/>
			<WordList />
		</DynamicModuleLoader>
	);
});
