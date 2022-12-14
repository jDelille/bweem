import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
	navBG: '#f1f2f3',
	primaryBG: '#ECECEE',
	secondaryBG: '#E4E4E7',
	font: '#303841',
	boxShadow: 'lightgray 0px 1px 1px 0px',
	border: '1px solid lightgray',
	togglePill: '#DEDFE2',
	modalHeader: '#DEDFE2',
	modalHeaderColor: '#333333',
	errorBG: '#301a1f',
	stringColor: '#303841',
	accent: '#2f89fc',
};

export const darkTheme = {
	navBG: '#121216',
	primaryBG: '#1A1F24',
	secondaryBG: '#0d1117',
	font: '#eaeaea',
	boxShadow: 'rgb(19, 19, 19) 0px 1px 1px 0px',
	border: '1px solid #717F90',
	togglePill: '#007AFF',
	modalHeader: '#161b22',
	modalHeaderColor: '#c9d1d9',
	errorBG: '#301a1f',
	stringColor: '#717F90',
	accent: '#cce5ff',
};

export const GlobalStyles = createGlobalStyle`
.primary
{
	background-color: ${(props) => props.theme.primaryBG};
	color: ${(props) => props.theme.font};
}
.game-box {
 // border-right: ${(props) => props.theme.border};
}
.secondary {
	background-color: ${(props) => props.theme.secondaryBG};
	color: ${(props) => props.theme.font};

}

.accent {
	color: ${(props) => props.theme.accent};
}

.fret {
	border: ${(props) => props.theme.border};
}

.active {
	background-color: ${(props) => props.theme.primaryBG};
}

.user {
	border-bottom: ${(props) => props.theme.border};
}

.answer {
	border: ${(props) => props.theme.border};

}

.fret::before {
	background-color: ${(props) => props.theme.stringColor};
}
.arrow-color {
	color: ${(props) => props.theme.primaryBG};
}
.pill {
	background-color: ${(props) => props.theme.togglePill};

}
.warning {
	background-color: ${(props) => props.theme.errorBG};


}
.modal-header-delete {
	background-color: ${(props) => props.theme.modalHeader};
	color: ${(props) => props.theme.modalHeaderColor};
}
.modal-body {
	color: ${(props) => props.theme.modalHeaderColor};
}
ul li a {
  color: ${(props) => props.theme.font};
}
.links li a.active {
		background-color: ${(props) => props.theme.primaryBG};
}
.third {
	 background-color: ${(props) => props.theme.secondaryBG};
  color: ${(props) => props.theme.font};
}
.dropdown-links li a,
.dropdown-links button {
		color: ${(props) => props.theme.font};
}`;
