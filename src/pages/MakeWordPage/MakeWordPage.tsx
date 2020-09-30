import * as React from "react";
import { WordListContainer } from "@containers";
import { PlayerAvatar } from "@components";
import { colors } from "@styles";
import { authOnlyHOC } from "@utils";

export const MakeWordPage = authOnlyHOC(() => {
	return (
		<>
			<PlayerAvatar
				size={100}
				pic={
					"https://image.freepik.com/free-vector/hand-drawn-style-bear-head-for-illustration-design-element_116205-88.jpg"
				}
				color={colors.red}
			/>
			<WordListContainer />
		</>
	);
});
